"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapLink = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("../defaults");
/**
 * Wrap selected nodes with a link and collapse at the end.
 */
const wrapLink = (editor, { at, url }) => {
    plate_common_1.wrapNodes(editor, {
        type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_LINK),
        url,
        children: []
    }, { at, split: true });
};
exports.wrapLink = wrapLink;
//# sourceMappingURL=wrapLink.js.map