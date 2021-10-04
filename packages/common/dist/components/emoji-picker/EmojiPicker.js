"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./emojiPicker.css");
const emoji_mart_1 = require("emoji-mart");
function EmojiPicker({ setEmoji }) {
    return jsx_runtime_1.jsx(emoji_mart_1.Picker, { onSelect: ({ native }) => setEmoji(native) }, void 0);
}
exports.EmojiPicker = EmojiPicker;
//# sourceMappingURL=EmojiPicker.js.map