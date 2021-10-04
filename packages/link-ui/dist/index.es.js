import { createStyles } from '@udecode/plate-styled-components';
import _styled, { css as css$1 } from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Editor, Element } from 'slate';
import { useStoreEditorState, useEventEditorId, getPlatePluginType } from '@udecode/plate-core';
import { validateUrl, ELEMENT_LINK, upsertLinkAtSelection, removeLink } from '@dreifuss-wysiwyg-editor/link';
import { ModalContext } from '@dreifuss-wysiwyg-editor/common';

const getLinkElementStyles = props => createStyles({
  prefixClassNames: 'LinkElement',
  ...props
}, {
  root: css$1(["color:#0078d4;text-decoration:initial;:hover,:visited:hover{color:#004578;text-decoration:underline;}:visited{color:#0078d4;}"])
});

var _StyledA = _styled("a").withConfig({
  displayName: "LinkElement___StyledA",
  componentId: "sc-1r516qt-0"
})(["", ""], p => p._css);

const LinkElement = props => {
  const {
    attributes,
    children,
    element,
    nodeProps
  } = props;
  const {
    root
  } = getLinkElementStyles(props);
  return (
    /*#__PURE__*/
    // TODO: check this
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jsx(_StyledA, { ...attributes,
      href: element.url,
      className: root.className,
      ...nodeProps,
      _css: root.css,
      children: children
    })
  );
};

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = ".link-toolbar .input-group {\n  border: 1px solid #e5e5ea;\n}\n\n.link-toolbar .input-group input {\n  border: 0px;\n  padding: 7px 11px;\n}\n\n.link-toolbar .form-group:not(:last-child) {\n  margin-bottom: 20px;\n}\n\n.link-toolbar .toolbar button {\n  margin-bottom: 0;\n  margin:auto 5px;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  outline: 0 !important;\n  white-space: nowrap;\n  border: none;\n  user-select: none;\n  padding: 8px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  border-radius: 6px;\n}\n\n\n.link-toolbar .toolbar button.insert {\n  color: white;\n  background-color:#0078d4;\n}\n\n.link-toolbar .toolbar button.cancel {\n  color: red;\n  background-color: #f7f7fa;\n}\n\n\n\n.link-toolbar .toolbar button.disabled {\n  color: #c5c6c7;\n  background-color: #f7f7fa;\n}\n\n";
n(css,{});

const ToolbarLink = () => {
  const editor = useStoreEditorState(useEventEditorId('focus'));
  const [selection, setSelection] = useState(null);
  const [title, setTitle] = useState('');
  const [url, setURL] = useState('');
  let prefixType;

  (function (prefixType) {
    prefixType["http"] = "http://";
    prefixType["https"] = "https://";
    prefixType["mailto"] = "mailto://";
    prefixType["other"] = "other";
  })(prefixType || (prefixType = {}));

  const [prefix, setPrefix] = useState(prefixType.http);
  const [isValidURL, setIsValidURL] = useState(false);
  const [isInsertBtnDisabled, setIsInsertBtnDisabled] = useState(false);
  const {
    toggleMenu
  } = useContext(ModalContext);
  useEffect(() => {
    if (url) {
      validateUrl(url).then(value => setIsValidURL(value));

      if (url.startsWith(prefixType.https)) {
        setPrefix(prefixType.https);
        setURL(url.replace(prefixType.https, ''));
      } else if (url.startsWith(prefixType.http)) {
        setPrefix(prefixType.http);
        setURL(url.replace(prefixType.http, ''));
      } else if (url.startsWith(prefixType.mailto)) {
        setPrefix(prefixType.mailto);
        setURL(url.replace(prefixType.mailto, ''));
      }
    }
  }, [url]);
  useEffect(() => {
    if (!url || !title || !isValidURL) {
      setIsInsertBtnDisabled(true);
    } else {
      setIsInsertBtnDisabled(false);
    }
  }, [title, url, isValidURL]);
  useEffect(() => {
    var _editor$selection;

    if (!editor) return;
    const nodes = Array.from(Editor.nodes(editor, {
      at: (_editor$selection = editor.selection) !== null && _editor$selection !== void 0 ? _editor$selection : undefined,
      match: node => Element.isElement(node) && node.type === getPlatePluginType(editor, ELEMENT_LINK)
    }));
    const tuple = nodes[0];

    if (tuple) {
      const [node] = tuple;

      if (Element.isElement(node)) {
        var _ref, _node$children$;

        setTitle((_ref = node.title || (node === null || node === void 0 ? void 0 : (_node$children$ = node.children[0]) === null || _node$children$ === void 0 ? void 0 : _node$children$.text)) !== null && _ref !== void 0 ? _ref : '');
        const nodeUrl = node.url;
        if (!nodeUrl) return;

        if (nodeUrl.startsWith(prefixType.https)) {
          setPrefix(prefixType.https);
        } else if (nodeUrl.startsWith(prefixType.http)) {
          setPrefix(prefixType.http);
        } else if (nodeUrl.startsWith(prefixType.mailto)) {
          setPrefix(prefixType.mailto);
        } else {
          setPrefix(prefixType.other);
        }

        setURL(nodeUrl);
      }
    } else if (editor.selection) {
      const text = Editor.string(editor, editor.selection);
      setTitle(text !== null && text !== void 0 ? text : '');
    }
  }, [selection]);
  useEffect(() => {
    if (editor !== null && editor !== void 0 && editor.selection) {
      setSelection(editor.selection);
    }
  }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
  return /*#__PURE__*/jsxs("form", {
    className: "link-toolbar",
    children: [/*#__PURE__*/jsxs("div", {
      className: "form-group",
      children: [/*#__PURE__*/jsx("label", {
        children: "Link"
      }), /*#__PURE__*/jsxs("div", {
        className: "input-group",
        children: [/*#__PURE__*/jsxs("select", {
          style: {
            backgroundColor: 'white',
            border: 'none',
            boxShadow: 'none'
          },
          value: prefix,
          onChange: e => setPrefix(e.target.value),
          children: [/*#__PURE__*/jsx("option", {
            value: prefixType.http,
            children: prefixType.http
          }), /*#__PURE__*/jsx("option", {
            value: prefixType.https,
            children: prefixType.https
          }), /*#__PURE__*/jsx("option", {
            value: prefixType.mailto,
            children: prefixType.mailto
          }), /*#__PURE__*/jsx("option", {
            value: prefixType.other,
            children: prefixType.other
          })]
        }), /*#__PURE__*/jsx("input", {
          name: "url",
          value: url,
          onChange: e => setURL(e.target.value)
        })]
      }), /*#__PURE__*/jsx("p", {
        children: url && !isValidURL ? 'Invalid Link' : undefined
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: "form-group",
      children: [/*#__PURE__*/jsx("label", {
        children: "Selected Text"
      }), /*#__PURE__*/jsx("div", {
        className: "input-group",
        children: /*#__PURE__*/jsx("input", {
          name: "text",
          value: title,
          onChange: e => setTitle(e.target.value)
        })
      })]
    }), /*#__PURE__*/jsxs("div", {
      className: "toolbar",
      role: "toolbar",
      children: [/*#__PURE__*/jsx("button", {
        className: `${isInsertBtnDisabled ? 'disabled' : 'insert'}`,
        disabled: isInsertBtnDisabled,
        onClick: e => {
          if (!editor) return;
          e.preventDefault();
          upsertLinkAtSelection(editor, {
            url: prefix !== prefixType.other ? prefix + url : url,
            wrap: true,
            selection
          });
          toggleMenu();
        },
        children: "Insert"
      }), /*#__PURE__*/jsx("button", {
        className: `${url ? 'cancel' : 'disabled'}`,
        onClick: e => {
          if (!editor) return;
          e.preventDefault();
          removeLink(editor);
          toggleMenu();
        },
        children: "Remove"
      })]
    })]
  });
};

export { LinkElement, ToolbarLink, getLinkElementStyles };
//# sourceMappingURL=index.es.js.map
