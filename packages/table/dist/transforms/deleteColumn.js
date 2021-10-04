"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteColumn = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const slate_1 = require("slate");
const defaults_1 = require("../defaults");
const deleteColumn = (editor) => {
    if (plate_common_1.someNode(editor, {
        match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
    })) {
        const currentCellItem = plate_common_1.getAbove(editor, {
            match: {
                type: [plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD), plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD)]
            }
        });
        const currentRowItem = plate_common_1.getAbove(editor, {
            match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TR) }
        });
        const currentTableItem = plate_common_1.getAbove(editor, {
            match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
        });
        if (currentCellItem &&
            currentRowItem &&
            currentTableItem &&
            // Cannot delete the last cell
            currentRowItem[0].children.length > 1) {
            const currentCellPath = currentCellItem[1];
            const pathToDelete = currentCellPath.slice();
            const replacePathPos = pathToDelete.length - 2;
            currentTableItem[0].children.forEach((row, rowIdx) => {
                pathToDelete[replacePathPos] = rowIdx;
                slate_1.Transforms.removeNodes(editor, {
                    at: pathToDelete
                });
            });
        }
    }
};
exports.deleteColumn = deleteColumn;
//# sourceMappingURL=deleteColumn.js.map