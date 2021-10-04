'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateStyledComponents = require('@udecode/plate-styled-components');
var _styled = require('styled-components');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var plateCommon = require('@udecode/plate-common');
var plateCore = require('@udecode/plate-core');
var table = require('@dreifuss-wysiwyg-editor/table');
var plateToolbar = require('@udecode/plate-toolbar');
var slate = require('slate');
var common = require('@dreifuss-wysiwyg-editor/common');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _styled__default = /*#__PURE__*/_interopDefaultLegacy(_styled);

const getTableElementStyles = props => plateStyledComponents.createStyles({
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

var _StyledTable = _styled__default['default']("table").withConfig({
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
    jsxRuntime.jsx(_StyledTable, { ...attributes,
      className: root.className,
      ...nodeProps,
      _css: root.css,
      children: /*#__PURE__*/jsxRuntime.jsx("tbody", {
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
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  const type = plateCore.getPlatePluginType(editor, table.ELEMENT_TABLE);
  return /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarButton, {
    active: !!(editor !== null && editor !== void 0 && editor.selection) && plateCommon.someNode(editor, {
      match: {
        type
      }
    }),
    onMouseDown: !!type && editor ? plateCommon.getPreventDefaultHandler(transform, editor, {
      header
    }) : undefined,
    ...props
  });
};

const DEFAULT_TD_BORDER_COLOR = '#000';
const TableBorderColorToolbar = props => {
  var _props$icon;

  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  const [borderColor, setBorderColor] = react.useState(DEFAULT_TD_BORDER_COLOR);
  const textInput = react.useRef(null);
  react.useEffect(() => {
    if (!(editor !== null && editor !== void 0 && editor.selection)) return;
    const nodes = Array.from(slate.Editor.nodes(editor, {
      at: editor.selection,
      match: node => slate.Element.isElement(node) && node.type === plateCore.getPlatePluginType(editor, table.ELEMENT_TD)
    }));

    if (nodes !== null && nodes !== void 0 && nodes.length) {
      setBorderColor(nodes[0][0].borderColor || DEFAULT_TD_BORDER_COLOR);
    }
  }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    onClick: () => {
      var _textInput$current;

      return (_textInput$current = textInput.current) === null || _textInput$current === void 0 ? void 0 : _textInput$current.click();
    },
    children: [(_props$icon = props.icon) !== null && _props$icon !== void 0 ? _props$icon : /*#__PURE__*/jsxRuntime.jsx(common.BorderColorIcon, {}), /*#__PURE__*/jsxRuntime.jsx("input", {
      type: "color",
      ref: textInput,
      value: borderColor,
      onChange: e => {
        if (!editor) return;
        const color = e.target.value;
        if (color) setBorderColor(color);
        table.upsertBorderColor(editor, color);
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

  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  const [bgColor, setBgColor] = react.useState(DEFAULT_TD_BG_COLOR);
  const textInput = react.useRef(null);
  react.useEffect(() => {
    if (!(editor !== null && editor !== void 0 && editor.selection)) return;
    const nodes = Array.from(slate.Editor.nodes(editor, {
      at: editor.selection,
      match: node => slate.Element.isElement(node) && node.type === plateCore.getPlatePluginType(editor, table.ELEMENT_TD)
    }));

    if (nodes !== null && nodes !== void 0 && nodes.length) {
      setBgColor(nodes[0][0].backgroundColor || DEFAULT_TD_BG_COLOR);
    }
  }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    onClick: () => {
      var _textInput$current;

      return (_textInput$current = textInput.current) === null || _textInput$current === void 0 ? void 0 : _textInput$current.click();
    },
    children: [(_props$icon = props.icon) !== null && _props$icon !== void 0 ? _props$icon : /*#__PURE__*/jsxRuntime.jsx(common.BackgroundColorIcon, {}), /*#__PURE__*/jsxRuntime.jsx("input", {
      type: "color",
      ref: textInput,
      value: bgColor,
      onChange: e => {
        if (!editor) return;
        const color = e.target.value;
        if (color) setBgColor(color);
        table.upsertBgColor(editor, color);
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
  return /*#__PURE__*/jsxRuntime.jsx("td", { ...props.attributes,
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

exports.TableBgColorToolbar = TableBgColorToolbar;
exports.TableBorderColorToolbar = TableBorderColorToolbar;
exports.TableDataElement = TableDataElement;
exports.TableElement = TableElement;
exports.ToolbarTable = ToolbarTable;
exports.getTableElementStyles = getTableElementStyles;
//# sourceMappingURL=index.js.map
