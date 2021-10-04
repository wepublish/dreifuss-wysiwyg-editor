"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTable = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const slate_1 = require("slate");
const defaults_1 = require("../defaults");
const deleteTable = (editor) => {
    if (plate_common_1.someNode(editor, {
        match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
    })) {
        const tableItem = plate_common_1.getAbove(editor, {
            match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TABLE) }
        });
        if (tableItem) {
            slate_1.Transforms.removeNodes(editor, {
                at: tableItem[1]
            });
        }
    }
};
exports.deleteTable = deleteTable;
//# sourceMappingURL=deleteTable.js.map