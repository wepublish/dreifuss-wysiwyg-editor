'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var slate = require('slate');
var plateCore = require('@udecode/plate-core');
var common = require('@dreifuss-wysiwyg-editor/common');
var fontColor = require('@dreifuss-wysiwyg-editor/font-color');
var jsxRuntime = require('react/jsx-runtime');

const FontColorToolbar = props => {
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  const [color, setColor] = react.useState('#fff');
  const [isSelectingColoredNode, setSelectingColoredNode] = react.useState(false);
  const textInput = react.useRef(null);
  react.useEffect(() => {
    if (!(editor !== null && editor !== void 0 && editor.selection)) return;
    const nodes = Array.from(slate.Editor.nodes(editor, {
      at: editor.selection,
      // @ts-ignore
      match: node => !!node.color
    }));

    if (nodes !== null && nodes !== void 0 && nodes.length) {
      setColor(nodes[0][0].color);
      setSelectingColoredNode(true);
    } else {
      setSelectingColoredNode(false);
    }
  }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    onClick: () => {
      var _textInput$current;

      return (_textInput$current = textInput.current) === null || _textInput$current === void 0 ? void 0 : _textInput$current.click();
    },
    children: [(props === null || props === void 0 ? void 0 : props.icon) || /*#__PURE__*/jsxRuntime.jsx(common.FontColor, {
      active: !!isSelectingColoredNode
    }), /*#__PURE__*/jsxRuntime.jsx("input", {
      type: "color",
      ref: textInput,
      value: color,
      onChange: e => {
        if (!editor) return;
        const color = e.target.value;
        if (color) setColor(color);
        fontColor.upsertFontColor(editor, color);
      },
      style: {
        width: 0,
        visibility: 'hidden'
      }
    })]
  });
};

const RenderFontColorLeaf = ({
  attributes,
  children,
  leaf
}) => /*#__PURE__*/jsxRuntime.jsx("span", { ...attributes,
  style: {
    color: leaf === null || leaf === void 0 ? void 0 : leaf.color
  },
  children: children
});

exports.FontColorToolbar = FontColorToolbar;
exports.RenderFontColorLeaf = RenderFontColorLeaf;
//# sourceMappingURL=index.js.map
