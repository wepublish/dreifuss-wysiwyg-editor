"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertImage = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("../defaults");
const insertImage = (editor, url) => {
    const text = { text: '' };
    const image = {
        type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_IMAGE),
        url,
        children: [text]
    };
    plate_common_1.insertNodes(editor, image);
    plate_common_1.insertNodes(editor, { type: 'paragraph', children: [text] });
};
exports.insertImage = insertImage;
//# sourceMappingURL=insertImage.js.map