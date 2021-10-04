"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkElement = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const LinkElement_styles_1 = require("./LinkElement.styles");
const LinkElement = (props) => {
    const { attributes, children, element, nodeProps } = props;
    const { root } = LinkElement_styles_1.getLinkElementStyles(props);
    return (
    // TODO: check this
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jsx_runtime_1.jsx("a", Object.assign({}, attributes, { href: element.url, css: root.css, className: root.className }, nodeProps, { children: children }), void 0));
};
exports.LinkElement = LinkElement;
//# sourceMappingURL=LinkElement.js.map