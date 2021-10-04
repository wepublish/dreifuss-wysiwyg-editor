"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyTableNode = void 0;
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("../defaults");
const getEmptyRowNode_1 = require("./getEmptyRowNode");
const getEmptyTableNode = (editor, { header }) => {
    return {
        type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE),
        children: [
            getEmptyRowNode_1.getEmptyRowNode(editor, { header, colCount: 2 }),
            getEmptyRowNode_1.getEmptyRowNode(editor, { header, colCount: 2 })
        ]
    };
};
exports.getEmptyTableNode = getEmptyTableNode;
//# sourceMappingURL=getEmptyTableNode.js.map