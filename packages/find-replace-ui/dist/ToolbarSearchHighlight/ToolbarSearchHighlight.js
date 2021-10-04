"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarSearchHighlight = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const plate_toolbar_1 = require("@udecode/plate-toolbar");
const ToolbarSearchHighlight = ({ icon: Icon, setSearch }) => (jsx_runtime_1.jsx(plate_toolbar_1.HeadingToolbar, Object.assign({ styles: { root: { height: '38px' } } }, { children: jsx_runtime_1.jsxs("div", Object.assign({ style: {
            position: 'relative',
            paddingBottom: '10px',
            marginBottom: '10px'
        } }, { children: [jsx_runtime_1.jsx(Icon, { size: 18, style: {
                    position: 'absolute',
                    top: '0.5em',
                    left: '0.5em',
                    color: '#ccc'
                } }, void 0), jsx_runtime_1.jsx("input", { "data-testid": "ToolbarSearchHighlightInput", type: "search", placeholder: "Search the text...", onChange: e => setSearch(e.target.value), style: {
                    boxSizing: 'border-box',
                    fontSize: '0.85em',
                    width: '100%',
                    padding: '0.5em',
                    paddingLeft: '2em',
                    border: '2px solid #ddd',
                    background: '#fafafa'
                } }, void 0)] }), void 0) }), void 0));
exports.ToolbarSearchHighlight = ToolbarSearchHighlight;
//# sourceMappingURL=ToolbarSearchHighlight.js.map