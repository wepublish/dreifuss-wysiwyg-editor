"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertTable = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("../defaults");
const getEmptyTableNode_1 = require("../utils/getEmptyTableNode");
const insertTable = (editor, { header }) => {
    if (!plate_common_1.someNode(editor, {
        match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
    })) {
        plate_common_1.insertNodes(editor, getEmptyTableNode_1.getEmptyTableNode(editor, { header }));
    }
};
exports.insertTable = insertTable;
//# sourceMappingURL=insertTable.js.map