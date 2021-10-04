"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginHotkey = exports.verifyHotkey = void 0;
const is_hotkey_1 = __importDefault(require("is-hotkey"));
function verifyHotkey(e, keys) {
    return is_hotkey_1.default(keys, e);
}
exports.verifyHotkey = verifyHotkey;
function getPluginHotkey(editor, pluginKey) {
    var _a, _b;
    return (_b = (_a = editor.options) === null || _a === void 0 ? void 0 : _a[pluginKey]) === null || _b === void 0 ? void 0 : _b.hotkey;
}
exports.getPluginHotkey = getPluginHotkey;
//# sourceMappingURL=hotkeyUtility.js.map