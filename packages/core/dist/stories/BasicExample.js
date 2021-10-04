"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicExample = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const prop_types_1 = __importDefault(require("prop-types"));
const DreifussWysiwygEditor_1 = __importDefault(require("../DreifussWysiwygEditor"));
const value = [
    {
        type: 'paragraph',
        children: [{ type: 'link', url: 'http://google.com', children: [{ text: 'Links: Add links.' }] }]
    },
    { type: 'paragraph', children: [{ text: 'Bold: Make the selected text bold.', bold: true }] },
    { type: 'paragraph', children: [{ text: 'Italic: Make the selected text italic.', italic: true }] },
    {
        type: 'paragraph',
        children: [{ text: 'Underline: Underline the selected text.', underline: true }]
    }
];
const BasicExample = () => {
    return (jsx_runtime_1.jsx(DreifussWysiwygEditor_1.default
    // onChange={(data: any) => {
    // }}
    , { 
        // onChange={(data: any) => {
        // }}
        initialValue: value }, void 0));
};
exports.BasicExample = BasicExample;
exports.BasicExample.propTypes = {
    /**
     * BasicExample contents
     */
    label: prop_types_1.default.string.isRequired,
    /**
     * Optional click handler
     */
    onClick: prop_types_1.default.func
};
exports.BasicExample.defaultProps = {
    onClick: undefined,
    displayName: 'd'
};
//# sourceMappingURL=BasicExample.js.map