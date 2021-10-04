import { getPlatePluginOptions, getRenderElement, getPlatePluginTypes, getRenderLeaf } from '@udecode/plate-core';
import { getNodeDeserializer, isCollapsed, setNodes } from '@udecode/plate-common';
import { Editor, Transforms } from 'slate';

const ELEMENT_FONT_COLOR = 'color';
const DEFAULTS_FONT_COLOR = {
  getNodeProps: ({
    element
  }) => ({
    color: element === null || element === void 0 ? void 0 : element.color
  })
};

const getFontColorLeafDeserialize = () => editor => {
  const options = getPlatePluginOptions(editor, ELEMENT_FONT_COLOR);
  return {
    leaf: getNodeDeserializer({
      type: options.type,
      getNode: el => ({
        type: options.type,
        color: el.getAttribute('color')
      }),
      rules: [{
        nodeNames: 'span'
      }],
      ...options.deserialize
    })
  };
};

/**
 * Enables support for font color.
 */

const createFontColorPlugin = () => ({
  pluginKeys: ELEMENT_FONT_COLOR,
  renderElement: getRenderElement(ELEMENT_FONT_COLOR),
  deserialize: getFontColorLeafDeserialize(),
  inlineTypes: getPlatePluginTypes(ELEMENT_FONT_COLOR),
  renderLeaf: getRenderLeaf(ELEMENT_FONT_COLOR)
});

function upsertFontColor(editor, color) {
  if (!editor) {
    console.error('error in @dreifuss-wysiwyg-editor/fontcolor');
    return;
  }

  if (color) {
    if (!editor.selection) return;

    if (isCollapsed(editor === null || editor === void 0 ? void 0 : editor.selection)) {
      const linkLeaf = Editor.leaf(editor, editor.selection);
      const [, inlinePath] = linkLeaf;
      Transforms.select(editor, inlinePath);
    }

    setNodes(editor, {
      color
    }, {
      match: () => true,
      split: true
    });
  }
}

export { DEFAULTS_FONT_COLOR, ELEMENT_FONT_COLOR, createFontColorPlugin, getFontColorLeafDeserialize, upsertFontColor };
//# sourceMappingURL=index.es.js.map
