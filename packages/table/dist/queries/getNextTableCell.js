"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextTableCell = void 0;
const slate_1 = require("slate");
const getCellInNextTableRow_1 = require("./getCellInNextTableRow");
function getNextTableCell(editor, currentCell, currentPath, currentRow) {
    try {
        return slate_1.Editor.node(editor, slate_1.Path.next(currentPath));
    }
    catch (err) {
        const [, currentRowPath] = currentRow;
        return getCellInNextTableRow_1.getCellInNextTableRow(editor, currentRowPath);
    }
}
exports.getNextTableCell = getNextTableCell;
//# sourceMappingURL=getNextTableCell.js.map