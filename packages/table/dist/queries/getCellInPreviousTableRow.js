"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCellInPreviousTableRow = void 0;
const slate_1 = require("slate");
function getCellInPreviousTableRow(editor, currentRowPath) {
    var _a;
    try {
        const previousRow = slate_1.Editor.node(editor, slate_1.Path.previous(currentRowPath));
        const [previousRowNode, previousRowPath] = previousRow;
        const previousCell = (_a = previousRowNode === null || previousRowNode === void 0 ? void 0 : previousRowNode.children) === null || _a === void 0 ? void 0 : _a[previousRowNode.children.length - 1];
        const previousCellPath = previousRowPath.concat(previousRowNode.children.length - 1);
        if (previousCell && previousCellPath) {
            return slate_1.Editor.node(editor, previousCellPath);
        }
    }
    catch (err) { }
}
exports.getCellInPreviousTableRow = getCellInPreviousTableRow;
//# sourceMappingURL=getCellInPreviousTableRow.js.map