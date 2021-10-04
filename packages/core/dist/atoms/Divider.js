"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = exports.DividerType = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
var DividerType;
(function (DividerType) {
    DividerType["horizontal"] = "Horizontal";
    DividerType["vertical"] = "Vertical";
})(DividerType = exports.DividerType || (exports.DividerType = {}));
const Divider = (props) => (jsx_runtime_1.jsx("hr", { style: {
        margin: props.type === DividerType.vertical ? '0 10px' : '10px 0',
        height: props.type === DividerType.vertical ? '22px' : undefined,
        borderLeft: '1px solid black'
    } }, void 0));
exports.Divider = Divider;
exports.default = exports.Divider;
//# sourceMappingURL=Divider.js.map