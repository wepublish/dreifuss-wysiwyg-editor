"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationMarksMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const plate_core_1 = require("@udecode/plate-core");
const quotation_mark_1 = require("@dreifuss-wysiwyg-editor/quotation-mark");
const common_1 = require("@dreifuss-wysiwyg-editor/common");
require("./style.css");
function QuotationMarksMenu() {
    const editor = plate_core_1.useStoreEditorState(plate_core_1.useEventEditorId('focus'));
    const { toggleMenu } = react_1.useContext(common_1.ModalContext);
    const [selection, setSelection] = react_1.useState(null);
    react_1.useEffect(() => {
        if (!editor)
            return;
        setSelection(editor.selection);
    }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
    function handleSelectingQuotationMark(e, mark) {
        e.preventDefault();
        if (!editor)
            return;
        quotation_mark_1.insertQuotationMarks(editor, selection, mark);
        toggleMenu();
    }
    return (jsx_runtime_1.jsxs("div", Object.assign({ className: "quotation-mark-menu" }, { children: [jsx_runtime_1.jsx("button", Object.assign({ onClick: e => handleSelectingQuotationMark(e, '«»'), className: "button" }, { children: '« »' }), void 0), jsx_runtime_1.jsx("button", Object.assign({ onClick: e => handleSelectingQuotationMark(e, '‹›'), className: "button" }, { children: '‹ ›' }), void 0), jsx_runtime_1.jsx("button", Object.assign({ onClick: e => handleSelectingQuotationMark(e, '’’'), className: "button" }, { children: '’ ’' }), void 0), jsx_runtime_1.jsx("button", Object.assign({ onClick: e => handleSelectingQuotationMark(e, '""'), className: "button" }, { children: '" "' }), void 0)] }), void 0));
}
exports.QuotationMarksMenu = QuotationMarksMenu;
//# sourceMappingURL=QuotationMarkMenu.js.map