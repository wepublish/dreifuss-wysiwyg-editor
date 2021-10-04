"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertQuotationMarks = void 0;
const plate_common_1 = require("@udecode/plate-common");
const slate_1 = require("slate");
function insertQuotationMarks(editor, selection, selectedQuotationMarks) {
    if (!selection)
        return;
    // Selected nodes
    const nodes = Array.from(slate_1.Editor.nodes(editor, {
        at: selection
    }));
    const tuple = nodes[0];
    if (tuple) {
        slate_1.Transforms.setSelection(editor, {
            anchor: selection.anchor,
            focus: selection.focus
        });
        if (plate_common_1.isCollapsed(selection)) {
            switch (selectedQuotationMarks) {
                case '«»': {
                    slate_1.Transforms.insertText(editor, '»', {
                        at: selection.anchor
                    });
                    slate_1.Transforms.insertText(editor, '«', {
                        at: selection.focus
                    });
                    break;
                }
                case '‹›': {
                    slate_1.Transforms.insertText(editor, '›', {
                        at: selection.anchor
                    });
                    slate_1.Transforms.insertText(editor, '‹', {
                        at: selection.focus
                    });
                    break;
                }
                case '""': {
                    slate_1.Transforms.insertText(editor, '"', {
                        at: selection.anchor
                    });
                    slate_1.Transforms.insertText(editor, '"', {
                        at: selection.focus
                    });
                    break;
                }
                case '’’': {
                    slate_1.Transforms.insertText(editor, '’', {
                        at: selection.anchor
                    });
                    slate_1.Transforms.insertText(editor, '’', {
                        at: selection.focus
                    });
                    break;
                }
            }
        }
        else {
            /**
             * Anchor and focus in slate works exactly like DOM anchor and focus points
             * Also, Selection can start from focus instead of anchor (end to start).
             */
            const isStartingFromAnchor = selection.anchor.offset > selection.focus.offset;
            const startingPoint = isStartingFromAnchor ? selection.anchor : selection.focus;
            const endingPoint = isStartingFromAnchor ? selection.focus : selection.anchor;
            switch (selectedQuotationMarks) {
                case '«»': {
                    slate_1.Transforms.insertText(editor, '»', {
                        at: startingPoint
                    });
                    slate_1.Transforms.insertText(editor, '«', {
                        at: endingPoint
                    });
                    break;
                }
                case '‹›': {
                    slate_1.Transforms.insertText(editor, '›', {
                        at: startingPoint
                    });
                    slate_1.Transforms.insertText(editor, '‹', {
                        at: endingPoint
                    });
                    break;
                }
                case '""': {
                    slate_1.Transforms.insertText(editor, '"', {
                        at: startingPoint
                    });
                    slate_1.Transforms.insertText(editor, '"', {
                        at: endingPoint
                    });
                    break;
                }
                case '’’': {
                    slate_1.Transforms.insertText(editor, '’', {
                        at: startingPoint
                    });
                    slate_1.Transforms.insertText(editor, '’', {
                        at: endingPoint
                    });
                    break;
                }
            }
        }
    }
    else {
        slate_1.Transforms.insertText(editor, selectedQuotationMarks);
        slate_1.Transforms.select(editor, {
            anchor: selection.anchor,
            focus: selection.focus
        });
    }
}
exports.insertQuotationMarks = insertQuotationMarks;
//# sourceMappingURL=upsertMarkAtSelection.js.map