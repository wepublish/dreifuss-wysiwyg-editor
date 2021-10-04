"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableCellEntry = void 0;
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("../defaults");
/**
 * If at (default = selection) is in table>tr>td, return table, tr, and td
 * node entries.
 */
const getTableCellEntry = (editor, { at = editor.selection } = {}) => {
    if (at &&
        plate_common_1.someNode(editor, {
            at,
            match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD) }
        })) {
        const selectionParent = plate_common_1.getParent(editor, at);
        if (!selectionParent)
            return;
        const [, paragraphPath] = selectionParent;
        const tableCell = plate_common_1.getAbove(editor, {
            at,
            match: { type: plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD) }
        }) || plate_common_1.getParent(editor, paragraphPath);
        if (!tableCell)
            return;
        const [tableCellNode, tableCellPath] = tableCell;
        if (tableCellNode.type !== plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TD))
            return;
        const tableRow = plate_common_1.getParent(editor, tableCellPath);
        if (!tableRow)
            return;
        const [tableRowNode, tableRowPath] = tableRow;
        if (tableRowNode.type !== plate_core_1.getPlatePluginType(editor, defaults_1.ELEMENT_TR))
            return;
        const tableElement = plate_common_1.getParent(editor, tableRowPath);
        if (!tableElement)
            return;
        return {
            tableElement,
            tableRow,
            tableCell
        };
    }
};
exports.getTableCellEntry = getTableCellEntry;
//# sourceMappingURL=getTableCellEntry.js.map