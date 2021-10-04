"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableOnKeyDown = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const slate_1 = require("slate");
const getNextTableCell_1 = require("./queries/getNextTableCell");
const getPreviousTableCell_1 = require("./queries/getPreviousTableCell");
const getTableCellEntry_1 = require("./queries/getTableCellEntry");
const defaults_1 = require("./defaults");
const getTableOnKeyDown = () => editor => e => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const res = getTableCellEntry_1.getTableCellEntry(editor, {});
        if (!res)
            return;
        const { tableRow, tableCell } = res;
        const [, tableCellPath] = tableCell;
        const shiftTab = e.shiftKey;
        const tab = !e.shiftKey;
        if (shiftTab) {
            // move left with shift+tab
            const previousCell = getPreviousTableCell_1.getPreviousTableCell(editor, tableCell, tableCellPath, tableRow);
            if (previousCell) {
                const [, previousCellPath] = previousCell;
                slate_1.Transforms.select(editor, previousCellPath);
            }
        }
        else if (tab) {
            // move right with tab
            const nextCell = getNextTableCell_1.getNextTableCell(editor, tableCell, tableCellPath, tableRow);
            if (nextCell) {
                const [, nextCellPath] = nextCell;
                slate_1.Transforms.select(editor, nextCellPath);
            }
        }
    }
    // FIXME: would prefer this as mod+a, but doesn't work
    if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
        const options = plate_core_1.getPlatePluginOptions(editor, defaults_1.ELEMENT_TABLE);
        const res = plate_common_1.getAbove(editor, { match: { type: options.type } });
        if (!res)
            return;
        const [, tablePath] = res;
        // select the whole table
        slate_1.Transforms.select(editor, tablePath);
        e.preventDefault();
        e.stopPropagation();
    }
};
exports.getTableOnKeyDown = getTableOnKeyDown;
//# sourceMappingURL=getTableOnKeyDown.js.map