"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SubMenuIcon_1 = require("../SubMenuIcon");
const ModalContext_1 = require("./ModalContext");
require("./modal.css");
// eslint-disable-next-line react/display-name
const Modal = ({ children, Icon, type }) => {
    const [isMenuOpen, setIsMenuOpen] = react_1.useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(false);
    };
    return (jsx_runtime_1.jsx(ModalContext_1.ModalContext.Provider, Object.assign({ value: {
            toggleMenu
        } }, { children: jsx_runtime_1.jsxs("div", Object.assign({ className: "modal-container" }, { children: [jsx_runtime_1.jsx("div", Object.assign({ role: "presentation", onClick: () => setIsMenuOpen(!isMenuOpen) }, { children: type ? jsx_runtime_1.jsx(SubMenuIcon_1.SubMenuIcon, { type: type, icon: Icon }, void 0) : Icon }), void 0), isMenuOpen && jsx_runtime_1.jsx("div", Object.assign({ className: "modal" }, { children: children }), void 0)] }), void 0) }), void 0));
};
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map