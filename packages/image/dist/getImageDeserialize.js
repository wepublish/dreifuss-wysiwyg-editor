"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageDeserialize = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const getImageDeserialize = () => editor => {
    const options = plate_core_1.getPlatePluginOptions(editor, defaults_1.ELEMENT_IMAGE);
    return {
        element: plate_common_1.getNodeDeserializer({
            type: options.type,
            getNode: el => ({
                type: options.type,
                url: el.getAttribute('src')
            }),
            rules: [{ nodeNames: 'IMG' }],
            ...options.deserialize
        })
    };
};
exports.getImageDeserialize = getImageDeserialize;
//# sourceMappingURL=getImageDeserialize.js.map