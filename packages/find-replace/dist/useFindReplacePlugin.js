"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFindReplacePlugin = void 0;
const react_1 = require("react");
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const getSearchHighlightDecorate_1 = require("./getSearchHighlightDecorate");
/**
 * Supports search highlight.
 * TODO: replace
 */
const useFindReplacePlugin = () => {
    const [search, setSearch] = react_1.useState('');
    return {
        plugin: react_1.useMemo(() => ({
            renderLeaf: plate_core_1.getRenderLeaf(defaults_1.MARK_SEARCH_HIGHLIGHT),
            decorate: getSearchHighlightDecorate_1.getSearchHighlightDecorate({ search })
        }), [search]),
        setSearch
    };
};
exports.useFindReplacePlugin = useFindReplacePlugin;
//# sourceMappingURL=useFindReplacePlugin.js.map