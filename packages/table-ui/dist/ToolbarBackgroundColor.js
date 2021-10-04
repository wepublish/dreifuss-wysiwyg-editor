"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBgColorToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const slate_1 = require("slate");
const plate_core_1 = require("@udecode/plate-core");
const common_1 = require("@dreifuss-wysiwyg-editor/common");
const table_1 = require("@dreifuss-wysiwyg-editor/table");
const DEFAULT_TD_BG_COLOR = '#fff';
const TableBgColorToolbar = (props) => {
    var _a;
    const editor = plate_core_1.useStoreEditorState(plate_core_1.useEventEditorId('focus'));
    const [bgColor, setBgColor] = react_1.useState(DEFAULT_TD_BG_COLOR);
    const textInput = react_1.useRef(null);
    react_1.useEffect(() => {
        if (!(editor === null || editor === void 0 ? void 0 : editor.selection))
            return;
        const nodes = Array.from(slate_1.Editor.nodes(editor, {
            at: editor.selection,
            match: node => slate_1.Element.isElement(node) && node.type === plate_core_1.getPlatePluginType(editor, table_1.ELEMENT_TD)
        }));
        if (nodes === null || nodes === void 0 ? void 0 : nodes.length) {
            setBgColor(nodes[0][0].backgroundColor || DEFAULT_TD_BG_COLOR);
        }
    }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
    return (jsx_runtime_1.jsxs("div", Object.assign({ onClick: () => { var _a; return (_a = textInput.current) === null || _a === void 0 ? void 0 : _a.click(); } }, { children: [(_a = props.icon) !== null && _a !== void 0 ? _a : jsx_runtime_1.jsx(common_1.BackgroundColorIcon, {}, void 0), jsx_runtime_1.jsx("input", { type: "color", ref: textInput, value: bgColor, onChange: e => {
                    if (!editor)
                        return;
                    const color = e.target.value;
                    if (color)
                        setBgColor(color);
                    table_1.upsertBgColor(editor, color);
                }, style: {
                    width: 0,
                    visibility: 'hidden'
                } }, void 0)] }), void 0));
};
exports.TableBgColorToolbar = TableBgColorToolbar;
//# sourceMappingURL=ToolbarBackgroundColor.js.map