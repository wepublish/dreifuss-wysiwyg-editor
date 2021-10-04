"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharCountToolbar = exports.getCharacterCount = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const slate_1 = require("slate");
const lodash_1 = require("lodash");
const plate_core_1 = require("@udecode/plate-core");
const getTextString = (editor) => {
    // get all text nodes and append them to each other in one string
    return [...slate_1.Node.texts(editor)].reduce((string, nodePair, index) => {
        const [textNode] = nodePair;
        if (index === 0)
            return `${textNode.text}`;
        return `${string} ${textNode.text}`;
    }, '');
};
const calculateCharCount = (editor) => {
    if (!editor)
        return 0;
    // using lodash toArray to get correct length for characters like emojis
    return lodash_1.toArray(getTextString(editor)).length;
};
function getCharacterCount(id) {
    const editor = plate_core_1.useStoreEditorState(id);
    return calculateCharCount(editor);
}
exports.getCharacterCount = getCharacterCount;
const CharCountToolbar = ({ id }) => {
    const charCount = getCharacterCount(id);
    return jsx_runtime_1.jsx("span", { children: charCount }, void 0);
};
exports.CharCountToolbar = CharCountToolbar;
//# sourceMappingURL=CharacterCounter.js.map