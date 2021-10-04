'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCore = require('@udecode/plate-core');
var slate = require('slate');
var react = require('react');

const MARK_SEARCH_HIGHLIGHT = 'search_highlight';

const getSearchHighlightDecorate = ({
  search
}) => editor => {
  const options = plateCore.getPlatePluginOptions(editor, MARK_SEARCH_HIGHLIGHT);
  return ([node, path]) => {
    const ranges = [];

    if (search && slate.Text.isText(node)) {
      const {
        text
      } = node;
      const parts = text.toLocaleLowerCase().split(search.toLocaleLowerCase());
      let offset = 0;
      parts.forEach((part, i) => {
        if (i !== 0) {
          ranges.push({
            anchor: {
              path,
              offset: offset - search.length
            },
            focus: {
              path,
              offset
            },
            [options.type]: true
          });
        }

        offset = offset + part.length + search.length;
      });
    }

    return ranges;
  };
};

/**
 * Supports search highlight.
 * TODO: replace
 */

const useFindReplacePlugin = () => {
  const [search, setSearch] = react.useState('');
  return {
    plugin: react.useMemo(() => ({
      renderLeaf: plateCore.getRenderLeaf(MARK_SEARCH_HIGHLIGHT),
      decorate: getSearchHighlightDecorate({
        search
      })
    }), [search]),
    setSearch
  };
};

exports.MARK_SEARCH_HIGHLIGHT = MARK_SEARCH_HIGHLIGHT;
exports.getSearchHighlightDecorate = getSearchHighlightDecorate;
exports.useFindReplacePlugin = useFindReplacePlugin;
//# sourceMappingURL=index.js.map
