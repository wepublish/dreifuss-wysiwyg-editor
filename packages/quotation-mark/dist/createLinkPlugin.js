"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuotationMarksPlugin = void 0;
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const createQuotationMarksPlugin = () => ({
    pluginKeys: defaults_1.ELEMENT_QUOTATION_MARK,
    renderElement: plate_core_1.getRenderElement(defaults_1.ELEMENT_QUOTATION_MARK),
    inlineTypes: plate_core_1.getPlatePluginTypes(defaults_1.ELEMENT_QUOTATION_MARK)
});
exports.createQuotationMarksPlugin = createQuotationMarksPlugin;
//# sourceMappingURL=createLinkPlugin.js.map