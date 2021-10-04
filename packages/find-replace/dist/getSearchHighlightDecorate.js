"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchHighlightDecorate = void 0;
const plate_core_1 = require("@udecode/plate-core");
const slate_1 = require("slate");
const defaults_1 = require("./defaults");
const getSearchHighlightDecorate = ({ search }) => editor => {
    const options = plate_core_1.getPlatePluginOptions(editor, defaults_1.MARK_SEARCH_HIGHLIGHT);
    return ([node, path]) => {
        const ranges = [];
        if (search && slate_1.Text.isText(node)) {
            const { text } = node;
            const parts = text.split(search);
            let offset = 0;
            parts.forEach((part, i) => {
                if (i !== 0) {
                    ranges.push({
                        anchor: { path, offset: offset - search.length },
                        focus: { path, offset },
                        [options.type]: true
                    });
                }
                offset = offset + part.length + search.length;
            });
        }
        return ranges;
    };
};
exports.getSearchHighlightDecorate = getSearchHighlightDecorate;
//# sourceMappingURL=getSearchHighlightDecorate.js.map