"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onKeyDown = void 0;
const defaults_1 = require("../defaults");
const common_1 = require("@dreifuss-wysiwyg-editor/common");
const transforms_1 = require("../transforms");
const utils_1 = require("../utils");
const onKeyDown = (editor) => async (event) => {
    if (!editor)
        return;
    const hotKey = common_1.getPluginHotkey(editor, defaults_1.ELEMENT_LINK);
    if (!hotKey)
        return;
    if (common_1.verifyHotkey(event, hotKey)) {
        const url = await common_1.getClipboardText();
        if (!url)
            return;
        utils_1.validateUrl(url).then((isValid) => {
            if (isValid) {
                transforms_1.upsertLinkAtSelection(editor, {
                    url,
                    selection: editor.selection,
                    wrap: true
                });
            }
        });
    }
};
exports.onKeyDown = onKeyDown;
//# sourceMappingURL=onKeyDown.js.map