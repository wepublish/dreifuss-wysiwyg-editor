"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontColorToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const slate_1 = require("slate");
const plate_core_1 = require("@udecode/plate-core");
const common_1 = require("@dreifuss-wysiwyg-editor/common");
const font_color_1 = require("@dreifuss-wysiwyg-editor/font-color");
const FontColorToolbar = (props) => {
    const editor = plate_core_1.useStoreEditorState(plate_core_1.useEventEditorId('focus'));
    const [color, setColor] = react_1.useState('#fff');
    const [isSelectingColoredNode, setSelectingColoredNode] = react_1.useState(false);
    const textInput = react_1.useRef(null);
    react_1.useEffect(() => {
        if (!(editor === null || editor === void 0 ? void 0 : editor.selection))
            return;
        const nodes = Array.from(slate_1.Editor.nodes(editor, {
            at: editor.selection,
            // @ts-ignore
            match: node => !!node.color
        }));
        if (nodes === null || nodes === void 0 ? void 0 : nodes.length) {
            setColor(nodes[0][0].color);
            setSelectingColoredNode(true);
        }
        else {
            setSelectingColoredNode(false);
        }
    }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
    return (jsx_runtime_1.jsxs("div", Object.assign({ onClick: () => { var _a; return (_a = textInput.current) === null || _a === void 0 ? void 0 : _a.click(); } }, { children: [(props === null || props === void 0 ? void 0 : props.icon) || jsx_runtime_1.jsx(common_1.FontColor, { active: !!isSelectingColoredNode }, void 0), jsx_runtime_1.jsx("input", { type: "color", ref: textInput, value: color, onChange: e => {
                    if (!editor)
                        return;
                    const color = e.target.value;
                    if (color)
                        setColor(color);
                    font_color_1.upsertFontColor(editor, color);
                }, style: {
                    width: 0,
                    visibility: 'hidden'
                } }, void 0)] }), void 0));
};
exports.FontColorToolbar = FontColorToolbar;
//# sourceMappingURL=FontColorToolbar.js.map