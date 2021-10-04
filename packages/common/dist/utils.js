"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClipboardText = void 0;
async function getClipboardText() {
    return await navigator.clipboard.readText();
}
exports.getClipboardText = getClipboardText;
//# sourceMappingURL=utils.js.map