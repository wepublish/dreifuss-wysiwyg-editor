"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTable = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const slate_1 = require("slate");
const defaults_1 = require("./defaults");
const withTable = () => editor => {
    const matchCells = (node) => {
        return (plate_core_1.isElement(node) &&
            (node.type === plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD) ||
                node.type === plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD)));
    };
    const { deleteBackward, deleteForward, deleteFragment, insertText } = editor;
    const preventDeleteCell = (operation, pointCallback, nextPoint) => (unit) => {
        const { selection } = editor;
        if (plate_common_1.isCollapsed(selection)) {
            const [cell] = slate_1.Editor.nodes(editor, {
                match: matchCells
            });
            if (cell) {
                // Prevent deletions within a cell
                const [, cellPath] = cell;
                const start = pointCallback(editor, cellPath);
                if (selection && slate_1.Point.equals(selection.anchor, start)) {
                    return;
                }
            }
            else {
                // Prevent deleting cell when selection is before or after a table
                const next = nextPoint(editor, selection, { unit });
                const [nextCell] = slate_1.Editor.nodes(editor, {
                    match: matchCells,
                    at: next
                });
                if (nextCell)
                    return;
            }
        }
        operation(unit);
    };
    editor.deleteFragment = () => {
        const { selection } = editor;
        const [start] = slate_1.Editor.nodes(editor, {
            match: matchCells,
            at: selection === null || selection === void 0 ? void 0 : selection.anchor.path
        });
        const [end] = slate_1.Editor.nodes(editor, {
            match: matchCells,
            at: selection === null || selection === void 0 ? void 0 : selection.focus.path
        });
        // Skip deletes if they start or end in a table cell, unless start & end in the same cell
        if ((start || end) && (start === null || start === void 0 ? void 0 : start[0]) !== (end === null || end === void 0 ? void 0 : end[0])) {
            // Clear cells content
            const cells = slate_1.Editor.nodes(editor, {
                match: matchCells
            });
            for (const [, path] of cells) {
                for (const [, childPath] of slate_1.Node.children(editor, path, {
                    reverse: true
                })) {
                    slate_1.Transforms.removeNodes(editor, { at: childPath });
                }
            }
            slate_1.Transforms.collapse(editor);
            return;
        }
        deleteFragment();
    };
    editor.insertText = text => {
        const { selection } = editor;
        const [start] = slate_1.Editor.nodes(editor, {
            match: matchCells,
            at: selection === null || selection === void 0 ? void 0 : selection.anchor.path
        });
        const [end] = slate_1.Editor.nodes(editor, {
            match: matchCells,
            at: selection === null || selection === void 0 ? void 0 : selection.focus.path
        });
        // Collapse selection if multiple cells are selected to avoid breaking the table
        if (!plate_common_1.isCollapsed(selection) && (start || end) && (start === null || start === void 0 ? void 0 : start[0]) !== (end === null || end === void 0 ? void 0 : end[0])) {
            const [cell] = slate_1.Editor.nodes(editor, { match: matchCells });
            if (cell) {
                slate_1.Transforms.collapse(editor, { edge: 'end' });
                insertText(text);
                return;
            }
        }
        insertText(text);
    };
    // prevent deleting cells with deleteBackward
    editor.deleteBackward = preventDeleteCell(deleteBackward, slate_1.Editor.start, slate_1.Editor.before);
    // prevent deleting cells with deleteForward
    editor.deleteForward = preventDeleteCell(deleteForward, slate_1.Editor.end, slate_1.Editor.after);
    return editor;
};
exports.withTable = withTable;
//# sourceMappingURL=withTable.js.map