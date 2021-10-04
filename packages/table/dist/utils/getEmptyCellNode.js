"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmptyCellNode = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("../defaults");
const getEmptyCellNode = (editor, { header }) => {
    return {
        type: header ? plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD) : plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD),
        children: [
            {
                type: plate_core_1.getPlatePluginType(editor, plate_common_1.ELEMENT_DEFAULT),
                children: [{ text: '' }]
            }
        ]
    };
};
exports.getEmptyCellNode = getEmptyCellNode;
//# sourceMappingURL=getEmptyCellNode.js.map