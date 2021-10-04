"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const plate_common_1 = require("@udecode/plate-common");
const plate_core_1 = require("@udecode/plate-core");
const table_1 = require("@dreifuss-wysiwyg-editor/table");
const plate_toolbar_1 = require("@udecode/plate-toolbar");
const ToolbarTable = ({ transform, header, ...props }) => {
    const editor = plate_core_1.useStoreEditorState(plate_core_1.useEventEditorId('focus'));
    const type = plate_core_1.getPlatePluginType(editor, table_1.ELEMENT_TABLE);
    return (jsx_runtime_1.jsx(plate_toolbar_1.ToolbarButton, Object.assign({ active: !!(editor === null || editor === void 0 ? void 0 : editor.selection) &&
            plate_common_1.someNode(editor, {
                match: { type }
            }), onMouseDown: !!type && editor ? plate_common_1.getPreventDefaultHandler(transform, editor, { header }) : undefined }, props), void 0));
};
exports.ToolbarTable = ToolbarTable;
//# sourceMappingURL=ToolbarTable.js.map