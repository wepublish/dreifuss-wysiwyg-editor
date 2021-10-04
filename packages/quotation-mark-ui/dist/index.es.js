import { useContext, useState, useEffect } from 'react';
import { useStoreEditorState, useEventEditorId } from '@udecode/plate-core';
import { insertQuotationMarks } from '@dreifuss-wysiwyg-editor/quotation-mark';
import { ModalContext } from '@dreifuss-wysiwyg-editor/common';
import { jsxs, jsx } from 'react/jsx-runtime';

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = ".quotation-mark-menu button {\n  margin-bottom: 0;\n  margin:auto 5px;\n  font-weight: normal;\n  text-align: center;\n  vertical-align: middle;\n  cursor: pointer;\n  outline: 0 !important;\n  white-space: nowrap;\n  border: none;\n  user-select: none;\n  padding: 8px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  border-radius: 6px;\n}\n";
n(css,{});

function QuotationMarksMenu() {
  const editor = useStoreEditorState(useEventEditorId('focus'));
  const {
    toggleMenu
  } = useContext(ModalContext);
  const [selection, setSelection] = useState(null);
  useEffect(() => {
    if (!editor) return;
    setSelection(editor.selection);
  }, [editor === null || editor === void 0 ? void 0 : editor.selection]);

  function handleSelectingQuotationMark(e, mark) {
    e.preventDefault();
    if (!editor) return;
    insertQuotationMarks(editor, selection, mark);
    toggleMenu();
  }

  return /*#__PURE__*/jsxs("div", {
    className: "quotation-mark-menu",
    children: [/*#__PURE__*/jsx("button", {
      onClick: e => handleSelectingQuotationMark(e, '«»'),
      className: "button",
      children: '« »'
    }), /*#__PURE__*/jsx("button", {
      onClick: e => handleSelectingQuotationMark(e, '‹›'),
      className: "button",
      children: '‹ ›'
    }), /*#__PURE__*/jsx("button", {
      onClick: e => handleSelectingQuotationMark(e, '’’'),
      className: "button",
      children: '’ ’'
    }), /*#__PURE__*/jsx("button", {
      onClick: e => handleSelectingQuotationMark(e, '""'),
      className: "button",
      children: '" "'
    })]
  });
}

export { QuotationMarksMenu };
//# sourceMappingURL=index.es.js.map
