"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFontColorPlugin = void 0;
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const getFontColorDeserialize_1 = require("./getFontColorDeserialize");
/**
 * Enables support for font color.
 */
const createFontColorPlugin = () => ({
    pluginKeys: defaults_1.ELEMENT_FONT_COLOR,
    renderElement: plate_core_1.getRenderElement(defaults_1.ELEMENT_FONT_COLOR),
    deserialize: getFontColorDeserialize_1.getFontColorLeafDeserialize(),
    inlineTypes: plate_core_1.getPlatePluginTypes(defaults_1.ELEMENT_FONT_COLOR),
    renderLeaf: plate_core_1.getRenderLeaf(defaults_1.ELEMENT_FONT_COLOR)
});
exports.createFontColorPlugin = createFontColorPlugin;
//# sourceMappingURL=createFontColorPlugin.js.map