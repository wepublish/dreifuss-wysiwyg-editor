"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableElement = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableElement_styles_1 = require("./TableElement.styles");
const TableElement = (props) => {
    const { attributes, children, nodeProps } = props;
    const { root } = TableElement_styles_1.getTableElementStyles(props);
    return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // TODO: fix css attr
    jsx_runtime_1.jsx("table", Object.assign({}, attributes, { css: root.css, className: root.className }, nodeProps, { children: jsx_runtime_1.jsx("tbody", { children: children }, void 0) }), void 0));
};
exports.TableElement = TableElement;
//# sourceMappingURL=TableElement.js.map