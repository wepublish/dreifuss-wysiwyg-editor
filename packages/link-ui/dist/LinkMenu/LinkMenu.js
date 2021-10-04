"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarLink = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const slate_1 = require("slate");
const plate_core_1 = require("@udecode/plate-core");
const link_1 = require("@dreifuss-wysiwyg-editor/link");
require("./link.css");
const common_1 = require("@dreifuss-wysiwyg-editor/common");
const ToolbarLink = () => {
    const editor = plate_core_1.useStoreEditorState(plate_core_1.useEventEditorId('focus'));
    const [selection, setSelection] = react_1.useState(null);
    const [title, setTitle] = react_1.useState('');
    const [url, setURL] = react_1.useState('');
    let prefixType;
    (function (prefixType) {
        prefixType["http"] = "http://";
        prefixType["https"] = "https://";
        prefixType["mailto"] = "mailto://";
        prefixType["other"] = "other";
    })(prefixType || (prefixType = {}));
    const [prefix, setPrefix] = react_1.useState(prefixType.http);
    const [isValidURL, setIsValidURL] = react_1.useState(false);
    const [isInsertBtnDisabled, setIsInsertBtnDisabled] = react_1.useState(false);
    const { toggleMenu } = react_1.useContext(common_1.ModalContext);
    react_1.useEffect(() => {
        if (url) {
            link_1.validateUrl(url).then((value) => setIsValidURL(value));
            if (url.startsWith(prefixType.https)) {
                setPrefix(prefixType.https);
                setURL(url.replace(prefixType.https, ''));
            }
            else if (url.startsWith(prefixType.http)) {
                setPrefix(prefixType.http);
                setURL(url.replace(prefixType.http, ''));
            }
            else if (url.startsWith(prefixType.mailto)) {
                setPrefix(prefixType.mailto);
                setURL(url.replace(prefixType.mailto, ''));
            }
        }
    }, [url]);
    react_1.useEffect(() => {
        if (!url || !title || !isValidURL) {
            setIsInsertBtnDisabled(true);
        }
        else {
            setIsInsertBtnDisabled(false);
        }
    }, [title, url, isValidURL]);
    react_1.useEffect(() => {
        var _a, _b, _c;
        if (!editor)
            return;
        const nodes = Array.from(slate_1.Editor.nodes(editor, {
            at: (_a = editor.selection) !== null && _a !== void 0 ? _a : undefined,
            match: node => slate_1.Element.isElement(node) && node.type === plate_core_1.getPlatePluginType(editor, link_1.ELEMENT_LINK)
        }));
        const tuple = nodes[0];
        if (tuple) {
            const [node] = tuple;
            if (slate_1.Element.isElement(node)) {
                setTitle((_c = (node.title || ((_b = node === null || node === void 0 ? void 0 : node.children[0]) === null || _b === void 0 ? void 0 : _b.text))) !== null && _c !== void 0 ? _c : '');
                const nodeUrl = node.url;
                if (!nodeUrl)
                    return;
                if (nodeUrl.startsWith(prefixType.https)) {
                    setPrefix(prefixType.https);
                }
                else if (nodeUrl.startsWith(prefixType.http)) {
                    setPrefix(prefixType.http);
                }
                else if (nodeUrl.startsWith(prefixType.mailto)) {
                    setPrefix(prefixType.mailto);
                }
                else {
                    setPrefix(prefixType.other);
                }
                setURL(nodeUrl);
            }
        }
        else if (editor.selection) {
            const text = slate_1.Editor.string(editor, editor.selection);
            setTitle(text !== null && text !== void 0 ? text : '');
        }
    }, [selection]);
    react_1.useEffect(() => {
        if (editor === null || editor === void 0 ? void 0 : editor.selection) {
            setSelection(editor.selection);
        }
    }, [editor === null || editor === void 0 ? void 0 : editor.selection]);
    return (jsx_runtime_1.jsxs("form", Object.assign({ className: "link-toolbar" }, { children: [jsx_runtime_1.jsxs("div", Object.assign({ className: "form-group" }, { children: [jsx_runtime_1.jsx("label", { children: "Link" }, void 0), jsx_runtime_1.jsxs("div", Object.assign({ className: "input-group" }, { children: [jsx_runtime_1.jsxs("select", Object.assign({ style: {
                                    backgroundColor: 'white',
                                    border: 'none',
                                    boxShadow: 'none'
                                }, value: prefix, onChange: e => setPrefix(e.target.value) }, { children: [jsx_runtime_1.jsx("option", Object.assign({ value: prefixType.http }, { children: prefixType.http }), void 0), jsx_runtime_1.jsx("option", Object.assign({ value: prefixType.https }, { children: prefixType.https }), void 0), jsx_runtime_1.jsx("option", Object.assign({ value: prefixType.mailto }, { children: prefixType.mailto }), void 0), jsx_runtime_1.jsx("option", Object.assign({ value: prefixType.other }, { children: prefixType.other }), void 0)] }), void 0), jsx_runtime_1.jsx("input", { name: "url", value: url, onChange: e => setURL(e.target.value) }, void 0)] }), void 0), jsx_runtime_1.jsx("p", { children: url && !isValidURL ? 'Invalid Link' : undefined }, void 0)] }), void 0), jsx_runtime_1.jsxs("div", Object.assign({ className: "form-group" }, { children: [jsx_runtime_1.jsx("label", { children: "Selected Text" }, void 0), jsx_runtime_1.jsx("div", Object.assign({ className: "input-group" }, { children: jsx_runtime_1.jsx("input", { name: "text", value: title, onChange: e => setTitle(e.target.value) }, void 0) }), void 0)] }), void 0), jsx_runtime_1.jsxs("div", Object.assign({ className: "toolbar", role: "toolbar" }, { children: [jsx_runtime_1.jsx("button", Object.assign({ className: `${isInsertBtnDisabled ? 'disabled' : 'insert'}`, disabled: isInsertBtnDisabled, onClick: e => {
                            if (!editor)
                                return;
                            e.preventDefault();
                            link_1.upsertLinkAtSelection(editor, {
                                url: prefix !== prefixType.other ? prefix + url : url,
                                wrap: true,
                                selection
                            });
                            toggleMenu();
                        } }, { children: "Insert" }), void 0), jsx_runtime_1.jsx("button", Object.assign({ className: `${url ? 'cancel' : 'disabled'}`, onClick: e => {
                            if (!editor)
                                return;
                            e.preventDefault();
                            link_1.removeLink(editor);
                            toggleMenu();
                        } }, { children: "Remove" }), void 0)] }), void 0)] }), void 0));
};
exports.ToolbarLink = ToolbarLink;
//# sourceMappingURL=LinkMenu.js.map