"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTableElementStyles = void 0;
const plate_styled_components_1 = require("@udecode/plate-styled-components");
const twin_macro_1 = __importDefault(require("twin.macro"));
const getTableElementStyles = (props) => plate_styled_components_1.createStyles({ prefixClassNames: 'TableElement', ...props }, {
    root: twin_macro_1.default `w-full my-2.5 mx-0 border-collapse`
});
exports.getTableElementStyles = getTableElementStyles;
//# sourceMappingURL=TableElement.styles.js.map