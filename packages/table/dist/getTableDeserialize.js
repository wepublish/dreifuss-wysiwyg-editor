"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableDeserialize = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const getTableDeserialize = () => editor => {
    const table = plate_core_1.getPlatePluginOptions(editor, defaults_1.ELEMENT_TABLE);
    const td = plate_core_1.getPlatePluginOptions(editor, defaults_1.ELEMENT_TD);
    const th = plate_core_1.getPlatePluginOptions(editor, defaults_1.ELEMENT_TH);
    const tr = plate_core_1.getPlatePluginOptions(editor, defaults_1.ELEMENT_TR);
    return {
        element: [
            ...plate_common_1.getElementDeserializer({
                type: table.type,
                rules: [{ nodeNames: 'TABLE' }],
                ...table.deserialize
            }),
            ...plate_common_1.getElementDeserializer({
                type: tr.type,
                rules: [{ nodeNames: 'TR' }],
                ...tr.deserialize
            }),
            ...plate_common_1.getElementDeserializer({
                type: td.type,
                attributeNames: ['rowspan', 'colspan'],
                rules: [{ nodeNames: 'TD' }],
                ...td.deserialize
            }),
            ...plate_common_1.getElementDeserializer({
                type: th.type,
                attributeNames: ['rowspan', 'colspan'],
                rules: [{ nodeNames: 'TH' }],
                ...th.deserialize
            })
        ]
    };
};
exports.getTableDeserialize = getTableDeserialize;
//# sourceMappingURL=getTableDeserialize.js.map