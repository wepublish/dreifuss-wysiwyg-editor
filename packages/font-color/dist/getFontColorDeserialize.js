"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFontColorLeafDeserialize = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const getFontColorLeafDeserialize = () => editor => {
    const options = plate_core_1.getPlatePluginOptions(editor, defaults_1.ELEMENT_FONT_COLOR);
    return {
        leaf: plate_common_1.getNodeDeserializer({
            type: options.type,
            getNode: el => ({
                type: options.type,
                color: el.getAttribute('color')
            }),
            rules: [{ nodeNames: 'span' }],
            ...options.deserialize
        })
    };
};
exports.getFontColorLeafDeserialize = getFontColorLeafDeserialize;
//# sourceMappingURL=getFontColorDeserialize.js.map