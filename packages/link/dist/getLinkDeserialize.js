"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkDeserialize = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const getLinkDeserialize = () => editor => {
    const options = plate_core_1.getPlatePluginOptions(editor, defaults_1.ELEMENT_LINK);
    return {
        element: plate_common_1.getNodeDeserializer({
            type: options.type,
            getNode: el => ({
                type: options.type,
                url: el.getAttribute('href')
            }),
            rules: [{ nodeNames: 'A' }],
            ...options.deserialize
        })
    };
};
exports.getLinkDeserialize = getLinkDeserialize;
//# sourceMappingURL=getLinkDeserialize.js.map