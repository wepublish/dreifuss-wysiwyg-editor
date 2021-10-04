"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImagePlugin = void 0;
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const getImageDeserialize_1 = require("./getImageDeserialize");
const withImageUpload_1 = require("./withImageUpload");
/**
 * Enables support for images.
 */
const createImagePlugin = (options) => ({
    pluginKeys: defaults_1.ELEMENT_IMAGE,
    renderElement: plate_core_1.getRenderElement(defaults_1.ELEMENT_IMAGE),
    deserialize: getImageDeserialize_1.getImageDeserialize(),
    voidTypes: plate_core_1.getPlatePluginTypes(defaults_1.ELEMENT_IMAGE),
    withOverrides: withImageUpload_1.withImageUpload(options)
});
exports.createImagePlugin = createImagePlugin;
//# sourceMappingURL=createImagePlugin.js.map