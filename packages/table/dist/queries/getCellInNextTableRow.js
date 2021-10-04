"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCellInNextTableRow = void 0;
const slate_1 = require("slate");
function getCellInNextTableRow(editor, currentRowPath) {
    var _a;
    try {
        const nextRow = slate_1.Editor.node(editor, slate_1.Path.next(currentRowPath));
        // TODO: Many tables in rich text editors (Google Docs, Word),
        // add a new row if we're in the last cell. Should we do the same?
        const [nextRowNode, nextRowPath] = nextRow;
        const nextCell = (_a = nextRowNode === null || nextRowNode === void 0 ? void 0 : nextRowNode.children) === null || _a === void 0 ? void 0 : _a[0];
        const nextCellPath = nextRowPath.concat(0);
        if (nextCell && nextCellPath) {
            return slate_1.Editor.node(editor, nextCellPath);
        }
    }
    catch (err) { }
}
exports.getCellInNextTableRow = getCellInNextTableRow;
//# sourceMappingURL=getCellInNextTableRow.js.map