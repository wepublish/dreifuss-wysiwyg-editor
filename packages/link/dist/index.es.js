import { getPlatePluginOptions, getPlatePluginType, getRenderElement, getPlatePluginTypes } from '@udecode/plate-core';
import { getNodeDeserializer, wrapNodes, isCollapsed, insertNodes, unwrapNodes, isUrl, getRangeBefore, getText, someNode, getRangeFromBlockStart } from '@udecode/plate-common';
import { withRemoveEmptyNodes } from '@udecode/plate-normalizers';
import { Editor, Transforms } from 'slate';
import { getPluginHotkey, verifyHotkey, getClipboardText } from '@dreifuss-wysiwyg-editor/common';

const ELEMENT_LINK = 'link';
const DEFAULTS_LINK = {
  getNodeProps: ({
    element
  }) => ({
    url: element === null || element === void 0 ? void 0 : element.url
  })
};

const getLinkDeserialize = () => editor => {
  const options = getPlatePluginOptions(editor, ELEMENT_LINK);
  return {
    element: getNodeDeserializer({
      type: options.type,
      getNode: el => ({
        type: options.type,
        url: el.getAttribute('href')
      }),
      rules: [{
        nodeNames: 'A'
      }],
      ...options.deserialize
    })
  };
};

/**
 * Wrap selected nodes with a link and collapse at the end.
 */

const wrapLink = (editor, {
  at,
  url
}) => {
  wrapNodes(editor, {
    type: getPlatePluginType(editor, ELEMENT_LINK),
    url,
    children: []
  }, {
    at,
    split: true
  });
};

/**
 * Unwrap link at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the link at the location.
 */

const upsertLinkAtSelection = (editor, {
  url,
  wrap,
  selection
}) => {
  if (!selection) return;
  const type = getPlatePluginType(editor, ELEMENT_LINK);

  if (!wrap && isCollapsed(selection)) {
    return insertNodes(editor, {
      type,
      url,
      children: [{
        text: url
      }]
    });
  } // if our cursor is inside an existing link, but don't have the text selected, select it now


  if (wrap && isCollapsed(selection)) {
    const linkLeaf = Editor.leaf(editor, selection);
    const [, inlinePath] = linkLeaf;
    Transforms.select(editor, inlinePath);
  }

  unwrapNodes(editor, {
    at: selection,
    match: {
      type
    }
  });
  wrapLink(editor, {
    at: selection,
    url
  });
  Transforms.collapse(editor, {
    edge: 'end'
  });
};
function removeLink(editor) {
  if (!editor.selection) return null;
  const type = getPlatePluginType(editor, ELEMENT_LINK);
  unwrapNodes(editor, {
    at: editor.selection,
    match: {
      type
    }
  });
}

const upsertLink = (editor, {
  url,
  at
}) => {
  unwrapNodes(editor, {
    at,
    match: {
      type: getPlatePluginType(editor, ELEMENT_LINK)
    }
  });
  const newSelection = editor.selection;
  wrapLink(editor, {
    at: { ...at,
      focus: newSelection.focus
    },
    url
  });
};

const upsertLinkIfValid = (editor, {
  isUrl
}) => {
  const rangeFromBlockStart = getRangeFromBlockStart(editor);
  const textFromBlockStart = getText(editor, rangeFromBlockStart);

  if (rangeFromBlockStart && isUrl(textFromBlockStart)) {
    upsertLink(editor, {
      url: textFromBlockStart,
      at: rangeFromBlockStart
    });
    return true;
  }
};
/**
 * Insert space after a url to wrap a link.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a link element will edit its children text but not its url.
 *
 */


const withLink = ({
  isUrl: isUrl$1 = isUrl,
  rangeBeforeOptions = {
    matchString: ' ',
    skipInvalid: true,
    afterMatch: true,
    multiPaths: true
  }
} = {}) => editor => {
  const {
    insertData,
    insertText
  } = editor;
  const type = getPlatePluginType(editor, ELEMENT_LINK);

  editor.insertText = text => {
    if (text === ' ' && isCollapsed(editor.selection)) {
      const selection = editor.selection;

      if (upsertLinkIfValid(editor, {
        isUrl: isUrl$1
      })) {
        return insertText(text);
      }

      const beforeWordRange = getRangeBefore(editor, selection, rangeBeforeOptions);

      if (beforeWordRange) {
        const beforeWordText = getText(editor, beforeWordRange);

        if (isUrl$1(beforeWordText)) {
          upsertLink(editor, {
            url: beforeWordText,
            at: beforeWordRange
          });
        }
      }
    }

    insertText(text);
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text) {
      if (someNode(editor, {
        match: {
          type
        }
      })) {
        return insertText(text);
      }

      if (isUrl$1(text)) {
        return upsertLinkAtSelection(editor, {
          url: text
        });
      }
    }

    insertData(data);
  }; // editor.insertBreak = () => {
  //   if (upsertLinkIfValid(editor, { link, isUrl })) {
  //     console.info('fix cursor');
  //   }
  //
  //   insertBreak();
  // };


  editor = withRemoveEmptyNodes({
    type
  })(editor);
  return editor;
};

async function validateUrl(url) {
  if (!url) return false;
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i');
  return pattern.test(url);
}

const onKeyDown = editor => async event => {
  if (!editor) return;
  const hotKey = getPluginHotkey(editor, ELEMENT_LINK);
  if (!hotKey) return;

  if (verifyHotkey(event, hotKey)) {
    const url = await getClipboardText();
    if (!url) return;
    validateUrl(url).then(isValid => {
      if (isValid) {
        upsertLinkAtSelection(editor, {
          url,
          selection: editor.selection,
          wrap: true
        });
      }
    });
  }
};

/**
 * Enables support for hyperlinks.
 */

const createLinkPlugin = options => ({
  pluginKeys: ELEMENT_LINK,
  renderElement: getRenderElement(ELEMENT_LINK),
  deserialize: getLinkDeserialize(),
  inlineTypes: getPlatePluginTypes(ELEMENT_LINK),
  withOverrides: withLink(options),
  onKeyDown
});

export { DEFAULTS_LINK, ELEMENT_LINK, createLinkPlugin, getLinkDeserialize, onKeyDown, removeLink, upsertLinkAtSelection, validateUrl, withLink, wrapLink };
//# sourceMappingURL=index.es.js.map
