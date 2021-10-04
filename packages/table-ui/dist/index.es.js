import { createStyles } from '@udecode/plate-styled-components';
import _styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { someNode, getPreventDefaultHandler } from '@udecode/plate-common';
import { useStoreEditorState, useEventEditorId, getPlatePluginType } from '@udecode/plate-core';
import { ELEMENT_TABLE, ELEMENT_TD, upsertBorderColor, upsertBgColor } from '@dreifuss-wysiwyg-editor/table';
import { ToolbarButton } from '@udecode/plate-toolbar';
import { Editor, Element } from 'slate';
import { BorderColorIcon, BackgroundColorIcon } from '@dreifuss-wysiwyg-editor/common';

const getTableElementStyles = props => createStyles({
  prefixClassNames: 'TableElement',
  ...props
}, {
  root: {
    "width": "100%",
    "marginTop": "0.625rem",
    "marginBottom": "0.625rem",
    "marginLeft": "0px",
    "marginRight": "0px",
    "borderCollapse": "collapse"
  }
});

var _StyledTable = _styled("table").withConfig({
  displayName: "TableElement___StyledTable",
  componentId: "km8vtc-0"
})(["", ""], p => p._css);

const TableElement = props => {
  const {
    attributes,
    children,
    nodeProps
  } = props;
  const {
    root
  } = getTableElementStyles(props);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // TODO: fix css attr
    jsx(_StyledTable, { ...attributes,
      className: root.className,
      ...nodeProps,
      _css: root.css,
      children: /*#__PURE__*/jsx("tbody", {
        children: children
      })
    })
  );
};

const ToolbarTable = ({
  transform,
  header,
  ...props
}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'));
  const type = getPlatePluginType(editor, ELEMENT_TABLE);
  return /*#__PURE__*/jsx(ToolbarButton, {
    active: !!(editor !== null && editor !== void 0 && editor.selection) && someNode(editor, {
      match: {
        type
      }
    }),
    onMouseDown: !!type && editor ? getPreventDefaultHandler(transform, editor, {
      header
    }) : undefined,
    ...props
  });
};

const DEFAULT_TD_BORDER_COLOR = '#000';
const TableBorderColorToolbar = props => {
  var _props$icon;

  const editor = useStoreEditorState(useEventEditorId('focus'));
  const [borderColor, setBorderColor] = useState(DEFAULT_TD_BORDER_COLOR);
  const textInput = useRef(null);
  useEffect(() => {
    if (!(editor !== null && editor !== void 0 && editor.selection)) return;
    const nodes = Array.from(Editor.nodes(editor, {
      at: editor.selection,
      match: node => Element.isElement(node) && node.type === getPlatePluginType(editor, ELEMENT_TD)
    }));

    if (nodes !== null && nodes !== void 0 && nodes.length) {
      setBorderColor(nodes[0][0].borderColor || DEFAULT_TD_BORDER_COLOR);
    }
  }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
  return /*#__PURE__*/jsxs("div", {
    onClick: () => {
      var _textInput$current;

      return (_textInput$current = textInput.current) === null || _textInput$current === void 0 ? void 0 : _textInput$current.click();
    },
    children: [(_props$icon = props.icon) !== null && _props$icon !== void 0 ? _props$icon : /*#__PURE__*/jsx(BorderColorIcon, {}), /*#__PURE__*/jsx("input", {
      type: "color",
      ref: textInput,
      value: borderColor,
      onChange: e => {
        if (!editor) return;
        const color = e.target.value;
        if (color) setBorderColor(color);
        upsertBorderColor(editor, color);
      },
      style: {
        width: 0,
        visibility: 'hidden'
      }
    })]
  });
};

const DEFAULT_TD_BG_COLOR = '#fff';
const TableBgColorToolbar = props => {
  var _props$icon;

  const editor = useStoreEditorState(useEventEditorId('focus'));
  const [bgColor, setBgColor] = useState(DEFAULT_TD_BG_COLOR);
  const textInput = useRef(null);
  useEffect(() => {
    if (!(editor !== null && editor !== void 0 && editor.selection)) return;
    const nodes = Array.from(Editor.nodes(editor, {
      at: editor.selection,
      match: node => Element.isElement(node) && node.type === getPlatePluginType(editor, ELEMENT_TD)
    }));

    if (nodes !== null && nodes !== void 0 && nodes.length) {
      setBgColor(nodes[0][0].backgroundColor || DEFAULT_TD_BG_COLOR);
    }
  }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
  return /*#__PURE__*/jsxs("div", {
    onClick: () => {
      var _textInput$current;

      return (_textInput$current = textInput.current) === null || _textInput$current === void 0 ? void 0 : _textInput$current.click();
    },
    children: [(_props$icon = props.icon) !== null && _props$icon !== void 0 ? _props$icon : /*#__PURE__*/jsx(BackgroundColorIcon, {}), /*#__PURE__*/jsx("input", {
      type: "color",
      ref: textInput,
      value: bgColor,
      onChange: e => {
        if (!editor) return;
        const color = e.target.value;
        if (color) setBgColor(color);
        upsertBgColor(editor, color);
      },
      style: {
        width: 0,
        visibility: 'hidden'
      }
    })]
  });
};

const TableDataElement = props => {
  const {
    backgroundColor = 'rgb(255, 255, 255)',
    borderColor = 'rgb(0, 0, 0, 0.5)'
  } = props === null || props === void 0 ? void 0 : props.element;
  return /*#__PURE__*/jsx("td", { ...props.attributes,
    className: props.className,
    style: {
      border: '1px solid rgb(193, 199, 208)',
      padding: '8px',
      minWidth: '48px',
      selectors: {
        '> *': {
          margin: 0
        }
      },
      borderColor: borderColor,
      backgroundColor: backgroundColor
    },
    children: props.children
  });
};

export { TableBgColorToolbar, TableBorderColorToolbar, TableDataElement, TableElement, ToolbarTable, getTableElementStyles };
//# sourceMappingURL=index.es.js.map
