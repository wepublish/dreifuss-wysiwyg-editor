import { useState, useRef, useEffect } from 'react';
import { Editor } from 'slate';
import { useStoreEditorState, useEventEditorId } from '@udecode/plate-core';
import { FontColor } from '@dreifuss-wysiwyg-editor/common';
import { upsertFontColor } from '@dreifuss-wysiwyg-editor/font-color';
import { jsxs, jsx } from 'react/jsx-runtime';

const FontColorToolbar = props => {
  const editor = useStoreEditorState(useEventEditorId('focus'));
  const [color, setColor] = useState('#fff');
  const [isSelectingColoredNode, setSelectingColoredNode] = useState(false);
  const textInput = useRef(null);
  useEffect(() => {
    if (!(editor !== null && editor !== void 0 && editor.selection)) return;
    const nodes = Array.from(Editor.nodes(editor, {
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
  return /*#__PURE__*/jsxs("div", {
    onClick: () => {
      var _textInput$current;

      return (_textInput$current = textInput.current) === null || _textInput$current === void 0 ? void 0 : _textInput$current.click();
    },
    children: [(props === null || props === void 0 ? void 0 : props.icon) || /*#__PURE__*/jsx(FontColor, {
      active: !!isSelectingColoredNode
    }), /*#__PURE__*/jsx("input", {
      type: "color",
      ref: textInput,
      value: color,
      onChange: e => {
        if (!editor) return;
        const color = e.target.value;
        if (color) setColor(color);
        upsertFontColor(editor, color);
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
}) => /*#__PURE__*/jsx("span", { ...attributes,
  style: {
    color: leaf === null || leaf === void 0 ? void 0 : leaf.color
  },
  children: children
});

export { FontColorToolbar, RenderFontColorLeaf };
//# sourceMappingURL=index.es.js.map
