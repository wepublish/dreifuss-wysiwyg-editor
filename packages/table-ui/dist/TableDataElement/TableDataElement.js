"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableDataElement = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableDataElement = (props) => {
    const { backgroundColor = 'rgb(255, 255, 255)', borderColor = 'rgb(0, 0, 0, 0.5)' } = props === null || props === void 0 ? void 0 : props.element;
    return (jsx_runtime_1.jsx("td", Object.assign({}, props.attributes, { className: props.className, style: {
            border: '1px solid rgb(193, 199, 208)',
            padding: '8px',
            minWidth: '48px',
            selectors: {
                '> *': {
                    margin: 0
                }
            },
            borderColor: borderColor,
            backgroundColor: backgroundColor
        } }, { children: props.children }), void 0));
};
exports.TableDataElement = TableDataElement;
//# sourceMappingURL=TableDataElement.js.map