"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRow = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const slate_1 = require("slate");
const defaults_1 = require("../defaults");
const deleteRow = (editor) => {
    if (plate_common_1.someNode(editor, {
        match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
    })) {
        const currentTableItem = plate_common_1.getAbove(editor, {
            match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
        });
        const currentRowItem = plate_common_1.getAbove(editor, {
            match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TR) }
        });
        if (currentRowItem &&
            currentTableItem &&
            // Cannot delete the last row
            currentTableItem[0].children.length > 1) {
            slate_1.Transforms.removeNodes(editor, {
                at: currentRowItem[1]
            });
        }
    }
};
exports.deleteRow = deleteRow;
//# sourceMappingURL=deleteRow.js.map