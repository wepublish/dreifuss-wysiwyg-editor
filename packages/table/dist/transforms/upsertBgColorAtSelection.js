"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertBgColor = void 0;
const slate_1 = require("slate");
const plate_core_1 = require("@udecode/plate-core");
const plate_common_1 = require("@udecode/plate-common");
const defaults_1 = require("../defaults");
function upsertBgColor(editor, backgroundColor) {
    if (!(editor === null || editor === void 0 ? void 0 : editor.selection) || !backgroundColor)
        return;
    const tdType = plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD);
    const tableType = plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE);
    const nodes = slate_1.Editor.nodes(editor, {
        // @ts-ignore
        match: node => slate_1.Element.isElement(node) && node.type === tableType
    });
    for (const [, path] of nodes) {
        plate_common_1.setNodes(editor, {
            backgroundColor
        }, {
            at: path,
            match: node => node.type === tdType
        });
        return;
    }
}
exports.upsertBgColor = upsertBgColor;
//# sourceMappingURL=upsertBgColorAtSelection.js.map