"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarBalloon = exports.ToolbarTableButtons = exports.ToolbarBasicMarksButtons = exports.ToolbarAlignButtons = exports.ToolbarListButtons = exports.ToolbarBasicElementsButtons = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const common_1 = require("@dreifuss-wysiwyg-editor/common");
const plate_alignment_1 = require("@udecode/plate-alignment");
const plate_list_ui_1 = require("@udecode/plate-list-ui");
const table_ui_1 = require("@dreifuss-wysiwyg-editor/table-ui");
const plate_alignment_ui_1 = require("@udecode/plate-alignment-ui");
const plate_list_1 = require("@udecode/plate-list");
const plate_code_block_1 = require("@udecode/plate-code-block");
const plate_block_quote_1 = require("@udecode/plate-block-quote");
const plate_code_block_ui_1 = require("@udecode/plate-code-block-ui");
const plate_toolbar_1 = require("@udecode/plate-toolbar");
const plate_core_1 = require("@udecode/plate-core");
const plate_heading_1 = require("@udecode/plate-heading");
const table_1 = require("@dreifuss-wysiwyg-editor/table");
const plate_basic_marks_1 = require("@udecode/plate-basic-marks");
const ToolbarBasicElementsButtons = () => (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx(plate_toolbar_1.ToolbarElement, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_heading_1.ELEMENT_H1), icon: jsx_runtime_1.jsx(common_1.H1Icon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarElement, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_heading_1.ELEMENT_H2), icon: jsx_runtime_1.jsx(common_1.H2Icon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarElement, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_heading_1.ELEMENT_H3), icon: jsx_runtime_1.jsx(common_1.H3Icon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarElement, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_block_quote_1.ELEMENT_BLOCKQUOTE), icon: jsx_runtime_1.jsx(common_1.BlockQuoteIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_code_block_ui_1.ToolbarCodeBlock, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_code_block_1.ELEMENT_CODE_BLOCK), icon: jsx_runtime_1.jsx(common_1.BlockCodeIcon, {}, void 0) }, void 0)] }, void 0));
exports.ToolbarBasicElementsButtons = ToolbarBasicElementsButtons;
const ToolbarListButtons = () => (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx(plate_list_ui_1.ToolbarList, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_list_1.ELEMENT_UL), icon: jsx_runtime_1.jsx(common_1.ListULIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_list_ui_1.ToolbarList, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_list_1.ELEMENT_OL), icon: jsx_runtime_1.jsx(common_1.ListOLIcon, {}, void 0) }, void 0)] }, void 0));
exports.ToolbarListButtons = ToolbarListButtons;
const ToolbarAlignButtons = () => (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx(plate_alignment_ui_1.ToolbarAlign, { icon: jsx_runtime_1.jsx(common_1.AlignLeftIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_alignment_ui_1.ToolbarAlign, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_alignment_1.ELEMENT_ALIGN_CENTER), icon: jsx_runtime_1.jsx(common_1.AlignCenterIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_alignment_ui_1.ToolbarAlign, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_alignment_1.ELEMENT_ALIGN_RIGHT), icon: jsx_runtime_1.jsx(common_1.AlignRightIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_alignment_ui_1.ToolbarAlign, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_alignment_1.ELEMENT_ALIGN_JUSTIFY), icon: jsx_runtime_1.jsx(common_1.AlignJustifyIcon, {}, void 0) }, void 0)] }, void 0));
exports.ToolbarAlignButtons = ToolbarAlignButtons;
const ToolbarBasicMarksButtons = () => {
    return (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_basic_marks_1.MARK_BOLD), icon: jsx_runtime_1.jsx(common_1.BoldIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_basic_marks_1.MARK_ITALIC), icon: jsx_runtime_1.jsx(common_1.ItalicIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_basic_marks_1.MARK_UNDERLINE), icon: jsx_runtime_1.jsx(common_1.UnderlineIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_basic_marks_1.MARK_STRIKETHROUGH), icon: jsx_runtime_1.jsx(common_1.StrikeThroughIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_basic_marks_1.MARK_CODE), icon: 'code' }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_basic_marks_1.MARK_SUPERSCRIPT), clear: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_basic_marks_1.MARK_SUBSCRIPT), icon: jsx_runtime_1.jsx(common_1.SuperscriptIcon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_basic_marks_1.MARK_SUBSCRIPT), clear: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_basic_marks_1.MARK_SUPERSCRIPT), icon: jsx_runtime_1.jsx(common_1.SubscriptIcon, {}, void 0) }, void 0)] }, void 0));
};
exports.ToolbarBasicMarksButtons = ToolbarBasicMarksButtons;
const ToolbarTableButtons = () => (jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx(table_ui_1.ToolbarTable, { icon: jsx_runtime_1.jsx(common_1.BorderAllIcon, {}, void 0), transform: table_1.insertTable }, void 0), jsx_runtime_1.jsx(table_ui_1.ToolbarTable, { icon: jsx_runtime_1.jsx(common_1.BorderClearIcon, {}, void 0), transform: table_1.deleteTable }, void 0), jsx_runtime_1.jsx(table_ui_1.ToolbarTable, { icon: jsx_runtime_1.jsx(common_1.BorderBottomIcon, {}, void 0), transform: table_1.addRow }, void 0), jsx_runtime_1.jsx(table_ui_1.ToolbarTable, { icon: jsx_runtime_1.jsx(common_1.BorderTopIcon, {}, void 0), transform: table_1.deleteRow }, void 0), jsx_runtime_1.jsx(table_ui_1.ToolbarTable, { icon: jsx_runtime_1.jsx(common_1.BorderLeftIcon, {}, void 0), transform: table_1.addColumn }, void 0), jsx_runtime_1.jsx(table_ui_1.ToolbarTable, { icon: jsx_runtime_1.jsx(common_1.BorderRightIcon, {}, void 0), transform: table_1.deleteColumn }, void 0), jsx_runtime_1.jsx(table_ui_1.TableBorderColorToolbar, {}, void 0), jsx_runtime_1.jsx(table_ui_1.TableBgColorToolbar, {}, void 0)] }, void 0));
exports.ToolbarTableButtons = ToolbarTableButtons;
const ToolbarBalloon = () => {
    const arrow = true;
    const tooltip = {
        arrow,
        delay: 0,
        duration: [200, 0],
        hideOnClick: false,
        offset: [0, 17],
        placement: 'top'
    };
    const editor = plate_core_1.useStoreEditorState(plate_core_1.useEventEditorId('focus'));
    return (jsx_runtime_1.jsxs(plate_toolbar_1.BalloonToolbar, Object.assign({ direction: "top", hiddenDelay: 0, theme: "light", arrow: arrow }, { children: [jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(editor, plate_basic_marks_1.MARK_BOLD), icon: jsx_runtime_1.jsx(common_1.BoldIcon, {}, void 0), 
                // @ts-ignore
                tooltip: { content: 'Bold (⌘B)', ...tooltip } }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(editor, plate_basic_marks_1.MARK_ITALIC), icon: jsx_runtime_1.jsx(common_1.ItalicIcon, {}, void 0), 
                // @ts-ignore
                tooltip: { content: 'Italic (⌘I)', ...tooltip } }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarMark, { type: plate_core_1.getPlatePluginType(editor, plate_basic_marks_1.MARK_UNDERLINE), icon: jsx_runtime_1.jsx(common_1.UnderlineIcon, {}, void 0), 
                // @ts-ignore
                tooltip: { content: 'Underline (⌘U)', ...tooltip } }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarElement, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_heading_1.ELEMENT_H1), icon: jsx_runtime_1.jsx(common_1.H1Icon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarElement, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_heading_1.ELEMENT_H2), icon: jsx_runtime_1.jsx(common_1.H2Icon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_toolbar_1.ToolbarElement, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_heading_1.ELEMENT_H3), icon: jsx_runtime_1.jsx(common_1.H3Icon, {}, void 0) }, void 0), jsx_runtime_1.jsx(plate_list_ui_1.ToolbarList, { type: plate_core_1.getPlatePluginType(plate_core_1.useEditorRef(), plate_list_1.ELEMENT_UL), icon: jsx_runtime_1.jsx(common_1.ListULIcon, {}, void 0) }, void 0)] }), void 0));
};
exports.ToolbarBalloon = ToolbarBalloon;
//# sourceMappingURL=Toolbar.js.map