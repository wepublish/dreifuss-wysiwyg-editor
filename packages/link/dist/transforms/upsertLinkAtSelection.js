"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLink = exports.upsertLinkAtSelection = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const slate_1 = require("slate");
const defaults_1 = require("../defaults");
const wrapLink_1 = require("./wrapLink");
/**
 * Unwrap link at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the link at the location.
 */
const upsertLinkAtSelection = (editor, { url, wrap, selection }) => {
    if (!selection)
        return;
    const type = plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_LINK);
    if (!wrap && plate_common_1.isCollapsed(selection)) {
        return plate_common_1.insertNodes(editor, {
            type,
            url,
            children: [{ text: url }]
        });
    }
    // if our cursor is inside an existing link, but don't have the text selected, select it now
    if (wrap && plate_common_1.isCollapsed(selection)) {
        const linkLeaf = slate_1.Editor.leaf(editor, selection);
        const [, inlinePath] = linkLeaf;
        slate_1.Transforms.select(editor, inlinePath);
    }
    plate_common_1.unwrapNodes(editor, { at: selection, match: { type } });
    wrapLink_1.wrapLink(editor, { at: selection, url });
    slate_1.Transforms.collapse(editor, { edge: 'end' });
};
exports.upsertLinkAtSelection = upsertLinkAtSelection;
function removeLink(editor) {
    if (!editor.selection)
        return null;
    const type = plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_LINK);
    plate_common_1.unwrapNodes(editor, {
        at: editor.selection,
        match: { type }
    });
}
exports.removeLink = removeLink;
//# sourceMappingURL=upsertLinkAtSelection.js.map