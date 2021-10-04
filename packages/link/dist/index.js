'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCore = require('@udecode/plate-core');
var plateCommon = require('@udecode/plate-common');
var plateNormalizers = require('@udecode/plate-normalizers');
var slate = require('slate');
var common = require('@dreifuss-wysiwyg-editor/common');

const ELEMENT_LINK = 'link';
const DEFAULTS_LINK = {
  getNodeProps: ({
    element
  }) => ({
    url: element === null || element === void 0 ? void 0 : element.url
  })
};

const getLinkDeserialize = () => editor => {
  const options = plateCore.getPlatePluginOptions(editor, ELEMENT_LINK);
  return {
    element: plateCommon.getNodeDeserializer({
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
  plateCommon.wrapNodes(editor, {
    type: plateCore.getPlatePluginType(editor, ELEMENT_LINK),
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
  const type = plateCore.getPlatePluginType(editor, ELEMENT_LINK);

  if (!wrap && plateCommon.isCollapsed(selection)) {
    return plateCommon.insertNodes(editor, {
      type,
      url,
      children: [{
        text: url
      }]
    });
  } // if our cursor is inside an existing link, but don't have the text selected, select it now


  if (wrap && plateCommon.isCollapsed(selection)) {
    const linkLeaf = slate.Editor.leaf(editor, selection);
    const [, inlinePath] = linkLeaf;
    slate.Transforms.select(editor, inlinePath);
  }

  plateCommon.unwrapNodes(editor, {
    at: selection,
    match: {
      type
    }
  });
  wrapLink(editor, {
    at: selection,
    url
  });
  slate.Transforms.collapse(editor, {
    edge: 'end'
  });
};
function removeLink(editor) {
  if (!editor.selection) return null;
  const type = plateCore.getPlatePluginType(editor, ELEMENT_LINK);
  plateCommon.unwrapNodes(editor, {
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
  plateCommon.unwrapNodes(editor, {
    at,
    match: {
      type: plateCore.getPlatePluginType(editor, ELEMENT_LINK)
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
  const rangeFromBlockStart = plateCommon.getRangeFromBlockStart(editor);
  const textFromBlockStart = plateCommon.getText(editor, rangeFromBlockStart);

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
  isUrl = plateCommon.isUrl,
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
  const type = plateCore.getPlatePluginType(editor, ELEMENT_LINK);

  editor.insertText = text => {
    if (text === ' ' && plateCommon.isCollapsed(editor.selection)) {
      const selection = editor.selection;

      if (upsertLinkIfValid(editor, {
        isUrl
      })) {
        return insertText(text);
      }

      const beforeWordRange = plateCommon.getRangeBefore(editor, selection, rangeBeforeOptions);

      if (beforeWordRange) {
        const beforeWordText = plateCommon.getText(editor, beforeWordRange);

        if (isUrl(beforeWordText)) {
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
      if (plateCommon.someNode(editor, {
        match: {
          type
        }
      })) {
        return insertText(text);
      }

      if (isUrl(text)) {
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


  editor = plateNormalizers.withRemoveEmptyNodes({
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
  const hotKey = common.getPluginHotkey(editor, ELEMENT_LINK);
  if (!hotKey) return;

  if (common.verifyHotkey(event, hotKey)) {
    const url = await common.getClipboardText();
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
  renderElement: plateCore.getRenderElement(ELEMENT_LINK),
  deserialize: getLinkDeserialize(),
  inlineTypes: plateCore.getPlatePluginTypes(ELEMENT_LINK),
  withOverrides: withLink(options),
  onKeyDown
});

exports.DEFAULTS_LINK = DEFAULTS_LINK;
exports.ELEMENT_LINK = ELEMENT_LINK;
exports.createLinkPlugin = createLinkPlugin;
exports.getLinkDeserialize = getLinkDeserialize;
exports.onKeyDown = onKeyDown;
exports.removeLink = removeLink;
exports.upsertLinkAtSelection = upsertLinkAtSelection;
exports.validateUrl = validateUrl;
exports.withLink = withLink;
exports.wrapLink = wrapLink;
//# sourceMappingURL=index.js.map
