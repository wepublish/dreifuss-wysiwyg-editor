"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
require("./popover.css");
const PopoverContext_1 = require("./PopoverContext");
class Popover extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.state = {
            isVisible: false
        };
    }
    handleClick() {
        if (!this.state.isVisible) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        }
        else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState((prevState) => ({
            isVisible: !prevState.isVisible
        }));
    }
    handleOutsideClick(e) {
        // ignore clicks on the component itself
        if (this.node.contains(e.target)) {
            return;
        }
        this.handleClick();
    }
    render() {
        return (jsx_runtime_1.jsx(PopoverContext_1.PopoverContext.Provider, Object.assign({ value: {
                togglePopover: this.handleClick
            } }, { children: jsx_runtime_1.jsxs("div", Object.assign({ className: "popover-container", ref: node => {
                    this.node = node;
                } }, { children: [jsx_runtime_1.jsx("div", Object.assign({ role: "presentation", onClick: this.handleClick }, { children: this.props.icon }), void 0), this.state.isVisible && jsx_runtime_1.jsx("div", Object.assign({ className: "popover" }, { children: this.props.children }), void 0)] }), void 0) }), void 0));
    }
}
exports.Popover = Popover;
exports.default = Popover;
//# sourceMappingURL=Popover.js.map