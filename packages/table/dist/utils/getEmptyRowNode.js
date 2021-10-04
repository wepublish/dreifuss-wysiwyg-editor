"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyRowNode = void 0;
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("../defaults");
const getEmptyCellNode_1 = require("./getEmptyCellNode");
const getEmptyRowNode = (editor, { header, colCount }) => {
    return {
        type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TR),
        children: Array(colCount)
            .fill(colCount)
            .map(() => getEmptyCellNode_1.getEmptyCellNode(editor, { header }))
    };
};
exports.getEmptyRowNode = getEmptyRowNode;
//# sourceMappingURL=getEmptyRowNode.js.map