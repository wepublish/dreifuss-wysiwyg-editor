"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreviousTableCell = void 0;
const slate_1 = require("slate");
const getCellInPreviousTableRow_1 = require("./getCellInPreviousTableRow");
function getPreviousTableCell(editor, currentCell, currentPath, currentRow) {
    try {
        return slate_1.Editor.node(editor, slate_1.Path.previous(currentPath));
    }
    catch (err) {
        const [, currentRowPath] = currentRow;
        return getCellInPreviousTableRow_1.getCellInPreviousTableRow(editor, currentRowPath);
    }
}
exports.getPreviousTableCell = getPreviousTableCell;
//# sourceMappingURL=getPreviousTableCell.js.map