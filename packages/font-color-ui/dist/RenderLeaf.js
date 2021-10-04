"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderFontColorLeaf = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RenderFontColorLeaf = ({ attributes, children, leaf }) => (jsx_runtime_1.jsx("span", Object.assign({}, attributes, { style: { color: leaf === null || leaf === void 0 ? void 0 : leaf.color } }, { children: children }), void 0));
exports.RenderFontColorLeaf = RenderFontColorLeaf;
//# sourceMappingURL=RenderLeaf.js.map