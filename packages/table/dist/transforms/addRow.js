"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRow = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const slate_1 = require("slate");
const defaults_1 = require("../defaults");
const getEmptyRowNode_1 = require("../utils/getEmptyRowNode");
const addRow = (editor, { header }) => {
    if (plate_common_1.someNode(editor, {
        match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
    })) {
        const currentRowItem = plate_common_1.getAbove(editor, {
            match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TR) }
        });
        if (currentRowItem) {
            const [currentRowElem, currentRowPath] = currentRowItem;
            plate_common_1.insertNodes(editor, getEmptyRowNode_1.getEmptyRowNode(editor, {
                header,
                colCount: currentRowElem.children.length
            }), {
                at: slate_1.Path.next(currentRowPath),
                select: true
            });
        }
    }
};
exports.addRow = addRow;
//# sourceMappingURL=addRow.js.map