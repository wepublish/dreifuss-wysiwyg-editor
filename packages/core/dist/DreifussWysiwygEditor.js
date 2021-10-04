"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Divider_1 = __importStar(require("./atoms/Divider"));
const plate_toolbar_1 = require("@udecode/plate-toolbar");
const table_1 = require("@dreifuss-wysiwyg-editor/table");
const plate_alignment_1 = require("@udecode/plate-alignment");
const plate_heading_1 = require("@udecode/plate-heading");
const plate_highlight_1 = require("@udecode/plate-highlight");
const plate_paragraph_1 = require("@udecode/plate-paragraph");
const plate_code_block_1 = require("@udecode/plate-code-block");
const plate_block_quote_1 = require("@udecode/plate-block-quote");
const plate_media_embed_1 = require("@udecode/plate-media-embed");
const createPlateOptions_1 = require("./utils/createPlateOptions");
const common_1 = require("@dreifuss-wysiwyg-editor/common");
const plate_basic_elements_1 = require("@udecode/plate-basic-elements");
const createPlateComponents_1 = require("./utils/createPlateComponents");
const plate_list_1 = require("@udecode/plate-list");
const character_count_ui_1 = require("@dreifuss-wysiwyg-editor/character-count-ui");
const plate_core_1 = require("@udecode/plate-core");
const link_ui_1 = require("@dreifuss-wysiwyg-editor/link-ui");
const image_1 = require("@dreifuss-wysiwyg-editor/image");
const image_ui_1 = require("@dreifuss-wysiwyg-editor/image-ui");
const link_1 = require("@dreifuss-wysiwyg-editor/link");
const font_color_ui_1 = require("@dreifuss-wysiwyg-editor/font-color-ui");
const font_color_1 = require("@dreifuss-wysiwyg-editor/font-color");
const quotation_mark_ui_1 = require("@dreifuss-wysiwyg-editor/quotation-mark-ui");
const quotation_mark_1 = require("@dreifuss-wysiwyg-editor/quotation-mark");
const plate_md_serializer_1 = require("@udecode/plate-md-serializer");
const plate_basic_marks_1 = require("@udecode/plate-basic-marks");
const Toolbar_1 = require("./Toolbar");
function DreifussWysiwygEditor(props) {
    var _a, _b;
    const { id = 'main', showCharactersCount = true, toolbars } = props;
    const components = createPlateComponents_1.createPlateComponents();
    const options = createPlateOptions_1.createPlateOptions();
    const editableProps = {
        placeholder: "What's on your mind?",
        spellCheck: false,
        autoFocus: true,
        readOnly: (_b = (_a = props.displayOnly) !== null && _a !== void 0 ? _a : props.disabled) !== null && _b !== void 0 ? _b : false,
        style: props.displayOneLine
            ? {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: 'inherit'
            }
            : {}
    };
    const charCount = character_count_ui_1.getCharacterCount(id);
    react_1.useEffect(() => {
        if (props === null || props === void 0 ? void 0 : props.charactersCount)
            props.charactersCount(charCount);
    }, [charCount]);
    const plugins = [
        ...plate_basic_elements_1.createBasicElementPlugins(),
        plate_core_1.createReactPlugin(),
        plate_core_1.createHistoryPlugin(),
        link_1.createLinkPlugin(),
        plate_list_1.createListPlugin(),
        plate_basic_marks_1.createBoldPlugin(),
        plate_basic_marks_1.createCodePlugin(),
        plate_alignment_1.createAlignPlugin(),
        table_1.createTablePlugin(),
        plate_basic_marks_1.createItalicPlugin(),
        plate_list_1.createTodoListPlugin(),
        font_color_1.createFontColorPlugin(),
        plate_paragraph_1.createParagraphPlugin(),
        plate_highlight_1.createHighlightPlugin(),
        plate_code_block_1.createCodeBlockPlugin(),
        plate_basic_marks_1.createUnderlinePlugin(),
        plate_basic_marks_1.createSubscriptPlugin(),
        plate_media_embed_1.createMediaEmbedPlugin(),
        plate_block_quote_1.createBlockquotePlugin(),
        plate_basic_marks_1.createSuperscriptPlugin(),
        plate_basic_marks_1.createStrikethroughPlugin(),
        plate_heading_1.createHeadingPlugin({ levels: 3 }),
        plate_md_serializer_1.createDeserializeMDPlugin(),
        image_1.createImagePlugin()
    ];
    return (jsx_runtime_1.jsxs(plate_core_1.Plate, Object.assign({ id: props.id, onChange: props.onChange, plugins: plugins, components: components, options: options, editableProps: editableProps, initialValue: JSON.parse(JSON.stringify(props.value || props.initialValue)) }, { children: [jsx_runtime_1.jsx(Toolbar_1.ToolbarBalloon, {}, void 0), !props.displayOnly && (jsx_runtime_1.jsxs(plate_toolbar_1.HeadingToolbar, { children: [jsx_runtime_1.jsx(Toolbar_1.ToolbarBasicElementsButtons, {}, void 0), jsx_runtime_1.jsx(common_1.Modal, Object.assign({ type: quotation_mark_1.ELEMENT_QUOTATION_MARK, Icon: '«»' }, { children: jsx_runtime_1.jsx(quotation_mark_ui_1.QuotationMarksMenu, {}, void 0) }), void 0), jsx_runtime_1.jsx(Divider_1.default, { type: Divider_1.DividerType.vertical }, void 0), jsx_runtime_1.jsx(Toolbar_1.ToolbarListButtons, {}, void 0), jsx_runtime_1.jsx(Divider_1.default, { type: Divider_1.DividerType.vertical }, void 0), jsx_runtime_1.jsx(Toolbar_1.ToolbarBasicMarksButtons, {}, void 0), jsx_runtime_1.jsx(Divider_1.default, { type: Divider_1.DividerType.vertical }, void 0), jsx_runtime_1.jsx(font_color_ui_1.FontColorToolbar, {}, void 0), jsx_runtime_1.jsx(Divider_1.default, { type: Divider_1.DividerType.vertical }, void 0), jsx_runtime_1.jsx(Toolbar_1.ToolbarAlignButtons, {}, void 0), jsx_runtime_1.jsx(Divider_1.default, { type: Divider_1.DividerType.vertical }, void 0), jsx_runtime_1.jsx(Toolbar_1.ToolbarTableButtons, {}, void 0), jsx_runtime_1.jsx(Divider_1.default, { type: Divider_1.DividerType.vertical }, void 0), jsx_runtime_1.jsx(common_1.Modal, Object.assign({ type: link_1.ELEMENT_LINK, Icon: jsx_runtime_1.jsx(common_1.LinkIcon, {}, void 0) }, { children: jsx_runtime_1.jsx(link_ui_1.ToolbarLink, {}, void 0) }), void 0), jsx_runtime_1.jsx(Divider_1.default, { type: Divider_1.DividerType.vertical }, void 0), jsx_runtime_1.jsx(common_1.Modal, Object.assign({ type: image_1.ELEMENT_IMAGE, Icon: jsx_runtime_1.jsx(common_1.ImageIcon, {}, void 0) }, { children: jsx_runtime_1.jsx(image_ui_1.ToolbarImage, { CustomComponent: toolbars === null || toolbars === void 0 ? void 0 : toolbars.ImageToolbar }, void 0) }), void 0)] }, void 0)), showCharactersCount && (jsx_runtime_1.jsxs("p", Object.assign({ style: { textAlign: 'right' } }, { children: [jsx_runtime_1.jsx(common_1.CharactersCountIcon, {}, void 0), " ", jsx_runtime_1.jsx(character_count_ui_1.CharCountToolbar, { id: id }, void 0)] }), void 0))] }), void 0));
}
exports.default = DreifussWysiwygEditor;
//# sourceMappingURL=DreifussWysiwygEditor.js.map