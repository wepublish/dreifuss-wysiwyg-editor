"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopoverContext = void 0;
const react_1 = require("react");
const emptyFn = () => {
    /* do nothing */
};
exports.PopoverContext = react_1.createContext({
    togglePopover: emptyFn
});
exports.default = exports.PopoverContext;
//# sourceMappingURL=PopoverContext.js.map