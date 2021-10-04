"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinkPlugin = void 0;
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const getLinkDeserialize_1 = require("./getLinkDeserialize");
const withLink_1 = require("./withLink");
const transforms_1 = require("./transforms");
/**
 * Enables support for hyperlinks.
 */
const createLinkPlugin = (options) => ({
    pluginKeys: defaults_1.ELEMENT_LINK,
    renderElement: plate_core_1.getRenderElement(defaults_1.ELEMENT_LINK),
    deserialize: getLinkDeserialize_1.getLinkDeserialize(),
    inlineTypes: plate_core_1.getPlatePluginTypes(defaults_1.ELEMENT_LINK),
    withOverrides: withLink_1.withLink(options),
    onKeyDown: transforms_1.onKeyDown
});
exports.createLinkPlugin = createLinkPlugin;
//# sourceMappingURL=createLinkPlugin.js.map