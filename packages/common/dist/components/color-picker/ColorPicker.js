"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_color_palette_1 = require("react-color-palette");
require("./styles.css");
const ColorPicker = (props) => {
    const { type = 'hex', color = '#eee', onChange, style = {}, hideHSV = true } = props;
    const { width, height } = style;
    const [currentColor, setCurrentColor] = react_color_palette_1.useColor(type, color);
    react_1.useEffect(() => {
        if (currentColor && onChange) {
            onChange(currentColor);
        }
    }, [currentColor]);
    return (jsx_runtime_1.jsx("div", Object.assign({ style: style }, { children: jsx_runtime_1.jsx(react_color_palette_1.ColorPicker, { hideHSV: hideHSV, 
            //   dark
            //   hideHSV
            width: width !== null && width !== void 0 ? width : 400, height: height !== null && height !== void 0 ? height : 200, color: currentColor, onChange: setCurrentColor }, void 0) }), void 0));
};
exports.ColorPicker = ColorPicker;
//# sourceMappingURL=ColorPicker.js.map