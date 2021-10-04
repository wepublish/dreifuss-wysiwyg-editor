"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkElementStyles = void 0;
const plate_styled_components_1 = require("@udecode/plate-styled-components");
const styled_components_1 = require("styled-components");
const getLinkElementStyles = (props) => plate_styled_components_1.createStyles({ prefixClassNames: 'LinkElement', ...props }, {
    root: styled_components_1.css `
        color: #0078d4;
        text-decoration: initial;
        :hover,
        :visited:hover {
          color: #004578;
          text-decoration: underline;
        }
        :visited {
          color: #0078d4;
        }
      `
});
exports.getLinkElementStyles = getLinkElementStyles;
//# sourceMappingURL=LinkElement.styles.js.map