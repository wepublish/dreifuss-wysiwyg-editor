"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addColumn = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const slate_1 = require("slate");
const defaults_1 = require("../defaults");
const getEmptyCellNode_1 = require("../utils/getEmptyCellNode");
const addColumn = (editor, { header }) => {
    if (plate_common_1.someNode(editor, {
        match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
    })) {
        const currentCellItem = plate_common_1.getAbove(editor, {
            match: {
                type: [plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD), plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD)]
            }
        });
        const currentTableItem = plate_common_1.getAbove(editor, {
            match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
        });
        if (currentCellItem && currentTableItem) {
            const nextCellPath = slate_1.Path.next(currentCellItem[1]);
            const newCellPath = nextCellPath.slice();
            const replacePathPos = newCellPath.length - 2;
            const currentRowIdx = nextCellPath[replacePathPos];
            currentTableItem[0].children.forEach((row, rowIdx) => {
                newCellPath[replacePathPos] = rowIdx;
                plate_common_1.insertNodes(editor, getEmptyCellNode_1.getEmptyCellNode(editor, { header }), {
                    at: newCellPath,
                    select: rowIdx === currentRowIdx
                });
            });
        }
    }
};
exports.addColumn = addColumn;
//# sourceMappingURL=addColumn.js.map