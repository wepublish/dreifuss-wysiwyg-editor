"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withLink = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const plate_normalizers_1 = require("@udecode/plate-normalizers");
const upsertLinkAtSelection_1 = require("./transforms/upsertLinkAtSelection");
const wrapLink_1 = require("./transforms/wrapLink");
const defaults_1 = require("./defaults");
const upsertLink = (editor, { url, at }) => {
    plate_common_1.unwrapNodes(editor, {
        at,
        match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_LINK) }
    });
    const newSelection = editor.selection;
    wrapLink_1.wrapLink(editor, {
        at: {
            ...at,
            focus: newSelection.focus
        },
        url
    });
};
const upsertLinkIfValid = (editor, { isUrl }) => {
    const rangeFromBlockStart = plate_common_1.getRangeFromBlockStart(editor);
    const textFromBlockStart = plate_common_1.getText(editor, rangeFromBlockStart);
    if (rangeFromBlockStart && isUrl(textFromBlockStart)) {
        upsertLink(editor, { url: textFromBlockStart, at: rangeFromBlockStart });
        return true;
    }
};
/**
 * Insert space after a url to wrap a link.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a link element will edit its children text but not its url.
 *
 */
const withLink = ({ isUrl = plate_common_1.isUrl, rangeBeforeOptions = {
    matchString: ' ',
    skipInvalid: true,
    afterMatch: true,
    multiPaths: true
} } = {}) => editor => {
    const { insertData, insertText } = editor;
    const type = plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_LINK);
    editor.insertText = text => {
        if (text === ' ' && plate_common_1.isCollapsed(editor.selection)) {
            const selection = editor.selection;
            if (upsertLinkIfValid(editor, { isUrl })) {
                return insertText(text);
            }
            const beforeWordRange = plate_common_1.getRangeBefore(editor, selection, rangeBeforeOptions);
            if (beforeWordRange) {
                const beforeWordText = plate_common_1.getText(editor, beforeWordRange);
                if (isUrl(beforeWordText)) {
                    upsertLink(editor, { url: beforeWordText, at: beforeWordRange });
                }
            }
        }
        insertText(text);
    };
    editor.insertData = (data) => {
        const text = data.getData('text/plain');
        if (text) {
            if (plate_common_1.someNode(editor, { match: { type } })) {
                return insertText(text);
            }
            if (isUrl(text)) {
                return upsertLinkAtSelection_1.upsertLinkAtSelection(editor, { url: text });
            }
        }
        insertData(data);
    };
    // editor.insertBreak = () => {
    //   if (upsertLinkIfValid(editor, { link, isUrl })) {
    //     console.info('fix cursor');
    //   }
    //
    //   insertBreak();
    // };
    editor = plate_normalizers_1.withRemoveEmptyNodes({ type })(editor);
    return editor;
};
exports.withLink = withLink;
//# sourceMappingURL=withLink.js.map