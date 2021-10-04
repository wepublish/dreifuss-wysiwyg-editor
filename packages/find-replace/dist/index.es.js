import { getPlatePluginOptions, getRenderLeaf } from '@udecode/plate-core';
import { Text } from 'slate';
import { useState, useMemo } from 'react';

const MARK_SEARCH_HIGHLIGHT = 'search_highlight';

const getSearchHighlightDecorate = ({
  search
}) => editor => {
  const options = getPlatePluginOptions(editor, MARK_SEARCH_HIGHLIGHT);
  return ([node, path]) => {
    const ranges = [];

    if (search && Text.isText(node)) {
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
  const [search, setSearch] = useState('');
  return {
    plugin: useMemo(() => ({
      renderLeaf: getRenderLeaf(MARK_SEARCH_HIGHLIGHT),
      decorate: getSearchHighlightDecorate({
        search
      })
    }), [search]),
    setSearch
  };
};

export { MARK_SEARCH_HIGHLIGHT, getSearchHighlightDecorate, useFindReplacePlugin };
//# sourceMappingURL=index.es.js.map
