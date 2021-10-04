import { createStyles } from '@udecode/plate-styled-components';
import _styled, { css as css$1 } from 'styled-components';
import * as React from 'react';
import { useRef, useState, useContext, useEffect } from 'react';
import { setNodes, getParent, insertNodes } from '@udecode/plate-common';
import { useEditorRef, useStoreEditorRef, useEventEditorId, useStoreEditorSelection } from '@udecode/plate-core';
import { ReactEditor } from 'slate-react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Transforms } from 'slate';
import { ModalContext } from '@dreifuss-wysiwyg-editor/common';

const getMediaEmbedElementStyles = props => createStyles({
  prefixClassNames: 'MediaEmbedElement',
  ...props
}, {
  root: {
    "position": "relative"
  },
  iframeWrapper: [{
    "position": "relative"
  }, {
    "padding": "75% 0 0 0"
  }],
  iframe: [{
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "height": "100%"
  }],
  input: [{
    "width": "100%"
  }, css$1(["padding:0.5em;font-size:0.85em;border:2px solid #ddd;background:#fafafa;margin-top:5px;"])]
});

const MediaEmbedUrlInput = ({
  url,
  onChange,
  ...props
}) => {
  const [value, setValue] = React.useState(url);

  const validateUrl = newUrl => {
    // if not starting with http, assume pasting of full iframe embed code
    if (newUrl.substring(0, 4) !== 'http') {
      var _newUrl$match, _src$match;

      const regexMatchSrc = /src=".*?"/;
      const regexGroupQuotes = /"([^"]*)"/;
      const src = (_newUrl$match = newUrl.match(regexMatchSrc)) === null || _newUrl$match === void 0 ? void 0 : _newUrl$match[0];
      const returnString = src === null || src === void 0 ? void 0 : (_src$match = src.match(regexGroupQuotes)) === null || _src$match === void 0 ? void 0 : _src$match[1];

      if (returnString) {
        newUrl = returnString;
      }
    }

    return newUrl;
  };

  return /*#__PURE__*/jsx("input", {
    value: value,
    onClick: e => e.stopPropagation(),
    onChange: e => {
      const newUrl = e.target.value;
      validateUrl(newUrl);
      setValue(newUrl);
      onChange(newUrl);
    },
    ...props
  });
};

var _StyledDiv = _styled("div").withConfig({
  displayName: "MediaEmbedElement___StyledDiv",
  componentId: "sc-1ebiulg-0"
})(["", ""], p => p._css);

var _StyledDiv2 = _styled("div").withConfig({
  displayName: "MediaEmbedElement___StyledDiv2",
  componentId: "sc-1ebiulg-1"
})(["", ""], p => p._css2);

var _StyledIframe = _styled("iframe").withConfig({
  displayName: "MediaEmbedElement___StyledIframe",
  componentId: "sc-1ebiulg-2"
})(["", ""], p => p._css3);

var _StyledMediaEmbedUrlInput = _styled(MediaEmbedUrlInput).withConfig({
  displayName: "MediaEmbedElement___StyledMediaEmbedUrlInput",
  componentId: "sc-1ebiulg-3"
})(["", ""], p => p._css4);

const MediaEmbedElement = props => {
  var _styles$iframeWrapper, _styles$iframeWrapper2, _styles$iframe, _styles$iframe2, _styles$input, _styles$input2;

  const {
    attributes,
    children,
    element,
    nodeProps
  } = props;
  const editor = useEditorRef();
  const {
    url
  } = element;
  const styles = getMediaEmbedElementStyles(props);
  return /*#__PURE__*/jsxs(_StyledDiv, { ...attributes,
    className: styles.root.className,
    _css: styles.root.css,
    children: [/*#__PURE__*/jsxs("div", {
      contentEditable: false,
      children: [/*#__PURE__*/jsx(_StyledDiv2, {
        className: (_styles$iframeWrapper = styles.iframeWrapper) === null || _styles$iframeWrapper === void 0 ? void 0 : _styles$iframeWrapper.className,
        _css2: (_styles$iframeWrapper2 = styles.iframeWrapper) === null || _styles$iframeWrapper2 === void 0 ? void 0 : _styles$iframeWrapper2.css,
        children: /*#__PURE__*/jsx(_StyledIframe, {
          className: (_styles$iframe = styles.iframe) === null || _styles$iframe === void 0 ? void 0 : _styles$iframe.className,
          title: "embed",
          src: `${url}?title=0&byline=0&portrait=0`,
          frameBorder: "0",
          ...nodeProps,
          _css3: (_styles$iframe2 = styles.iframe) === null || _styles$iframe2 === void 0 ? void 0 : _styles$iframe2.css
        })
      }), /*#__PURE__*/jsx(_StyledMediaEmbedUrlInput, {
        "data-testid": "MediaEmbedUrlInput",
        className: (_styles$input = styles.input) === null || _styles$input === void 0 ? void 0 : _styles$input.className,
        url: url,
        onChange: val => {
          const path = ReactEditor.findPath(editor, element);
          setNodes(editor, {
            url: val
          }, {
            at: path
          });
        },
        _css4: (_styles$input2 = styles.input) === null || _styles$input2 === void 0 ? void 0 : _styles$input2.css
      })]
    }), children]
  });
};

const ELEMENT_MEDIA_EMBED = 'media_embed';

const insertMediaEmbed = (editor, {
  url = '',
  pluginKey = ELEMENT_MEDIA_EMBED
}) => {
  if (!editor.selection) return;
  const selectionParentEntry = getParent(editor, editor.selection);
  if (!selectionParentEntry) return;
  const [, path] = selectionParentEntry;
  insertNodes(editor, {
    type: pluginKey,
    url,
    children: [{
      text: ''
    }]
  }, {
    at: path
  });
};

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = ".media-embed-toolbar .input-group {\n  border: 1px solid #e5e5ea;\n}\n\n.media-embed-toolbar .input-group input {\n  border: 0px;\n  padding: 7px 0px;\n  width: 100%;\n}\n\n.media-embed-toolbar .form-group:first-child .input-group{\n  margin-top: 10px;\n}\n\n.media-embed-toolbar .form-group:not(:last-child) {\n  margin-bottom: 20px;\n}\n\n.media-embed-toolbar .toolbar button:first-of-type {\nmargin-left: 0px;\n}\n\n.media-embed-toolbar .toolbar button {\n  margin-bottom: 0;\n  margin:auto 5px;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  outline: 0 !important;\n  white-space: nowrap;\n  border: none;\n  user-select: none;\n  padding: 8px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  border-radius: 6px;\n}\n\n\n.media-embed-toolbar .toolbar button.insert {\n  color: white;\n  background-color:#0078d4;\n}\n\n.media-embed-toolbar .toolbar button.cancel {\n  color: red;\n  background-color: #f7f7fa;\n}\n\n\n\n.media-embed-toolbar .toolbar button.disabled {\n  color: #c5c6c7;\n  background-color: #f7f7fa;\n}\n\n";
n(css,{});

const transformUrl = newUrl => {
  // if not starting with http, assume pasting of full iframe embed code
  if (newUrl.substring(0, 4) !== 'http') {
    var _newUrl$match, _src$match;

    const regexMatchSrc = /src=".*?"/;
    const regexGroupQuotes = /"([^"]*)"/;
    const src = (_newUrl$match = newUrl.match(regexMatchSrc)) === null || _newUrl$match === void 0 ? void 0 : _newUrl$match[0];
    const returnString = src === null || src === void 0 ? void 0 : (_src$match = src.match(regexGroupQuotes)) === null || _src$match === void 0 ? void 0 : _src$match[1];

    if (returnString) {
      newUrl = returnString;
    }
  }

  return newUrl;
};

const MediaEmbedToolbar = () => {
  const editor = useStoreEditorRef(useEventEditorId('focus'));
  const selection = useStoreEditorSelection(useEventEditorId('focus'));
  const latestSelection = useRef();
  const [url, setURL] = useState('');
  const {
    toggleMenu
  } = useContext(ModalContext);
  useEffect(() => {
    if (selection) {
      latestSelection.current = selection;
    }
  }, [selection]);
  return /*#__PURE__*/jsxs("form", {
    className: "media-embed-toolbar",
    children: [/*#__PURE__*/jsxs("div", {
      className: "form-group",
      children: [/*#__PURE__*/jsx("label", {
        children: "Media Embed"
      }), /*#__PURE__*/jsx("div", {
        className: "input-group",
        children: /*#__PURE__*/jsx(MediaEmbedUrlInput, {
          onChange: newUrl => setURL(transformUrl(newUrl)),
          url: url
        })
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: "toolbar",
      role: "toolbar",
      children: [/*#__PURE__*/jsx("button", {
        className: `${!url ? 'disabled' : 'insert'}`,
        disabled: !url,
        onClick: e => {
          if (!editor) return;
          e.preventDefault();
          Transforms.select(editor, latestSelection.current);
          ReactEditor.focus(editor);
          insertMediaEmbed(editor, {
            url
          });
          toggleMenu();
        },
        children: "Insert"
      }), /*#__PURE__*/jsx("button", {
        className: `${url ? 'cancel' : 'disabled'}`,
        onClick: e => {
          e.preventDefault();
          toggleMenu();
        },
        children: "Remove"
      })]
    })]
  });
};

export { MediaEmbedElement, MediaEmbedToolbar, MediaEmbedUrlInput, getMediaEmbedElementStyles };
//# sourceMappingURL=index.es.js.map
