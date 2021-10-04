'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCore = require('@udecode/plate-core');
var plateCommon = require('@udecode/plate-common');
var slate = require('slate');

const ELEMENT_FONT_COLOR = 'color';
const DEFAULTS_FONT_COLOR = {
  getNodeProps: ({
    element
  }) => ({
    color: element === null || element === void 0 ? void 0 : element.color
  })
};

const getFontColorLeafDeserialize = () => editor => {
  const options = plateCore.getPlatePluginOptions(editor, ELEMENT_FONT_COLOR);
  return {
    leaf: plateCommon.getNodeDeserializer({
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
  renderElement: plateCore.getRenderElement(ELEMENT_FONT_COLOR),
  deserialize: getFontColorLeafDeserialize(),
  inlineTypes: plateCore.getPlatePluginTypes(ELEMENT_FONT_COLOR),
  renderLeaf: plateCore.getRenderLeaf(ELEMENT_FONT_COLOR)
});

function upsertFontColor(editor, color) {
  if (!editor) {
    console.error('error in @dreifuss-wysiwyg-editor/fontcolor');
    return;
  }

  if (color) {
    if (!editor.selection) return;

    if (plateCommon.isCollapsed(editor === null || editor === void 0 ? void 0 : editor.selection)) {
      const linkLeaf = slate.Editor.leaf(editor, editor.selection);
      const [, inlinePath] = linkLeaf;
      slate.Transforms.select(editor, inlinePath);
    }

    plateCommon.setNodes(editor, {
      color
    }, {
      match: () => true,
      split: true
    });
  }
}

exports.DEFAULTS_FONT_COLOR = DEFAULTS_FONT_COLOR;
exports.ELEMENT_FONT_COLOR = ELEMENT_FONT_COLOR;
exports.createFontColorPlugin = createFontColorPlugin;
exports.getFontColorLeafDeserialize = getFontColorLeafDeserialize;
exports.upsertFontColor = upsertFontColor;
//# sourceMappingURL=index.js.map
