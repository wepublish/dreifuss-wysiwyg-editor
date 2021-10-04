"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertFontColor = void 0;
const plate_common_1 = require("@udecode/plate-common");
const slate_1 = require("slate");
function upsertFontColor(editor, color) {
    if (!editor) {
        console.error('error in @dreifuss-wysiwyg-editor/fontcolor');
        return;
    }
    if (color) {
        if (!editor.selection)
            return;
        if (plate_common_1.isCollapsed(editor === null || editor === void 0 ? void 0 : editor.selection)) {
            const linkLeaf = slate_1.Editor.leaf(editor, editor.selection);
            const [, inlinePath] = linkLeaf;
            slate_1.Transforms.select(editor, inlinePath);
        }
        plate_common_1.setNodes(editor, {
            color
        }, {
            match: () => true,
            split: true
        });
    }
}
exports.upsertFontColor = upsertFontColor;
//# sourceMappingURL=upsertColorAtSelection.js.map