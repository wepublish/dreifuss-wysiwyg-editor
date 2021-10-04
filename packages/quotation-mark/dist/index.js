'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCommon = require('@udecode/plate-common');
var slate = require('slate');
var plateCore = require('@udecode/plate-core');

const ELEMENT_QUOTATION_MARK = 'q';

function insertQuotationMarks(editor, selection, selectedQuotationMarks) {
  if (!selection) return; // Selected nodes

  const nodes = Array.from(slate.Editor.nodes(editor, {
    at: selection
  }));
  const tuple = nodes[0];

  if (tuple) {
    slate.Transforms.setSelection(editor, {
      anchor: selection.anchor,
      focus: selection.focus
    });

    if (plateCommon.isCollapsed(selection)) {
      switch (selectedQuotationMarks) {
        case '«»':
          {
            slate.Transforms.insertText(editor, '»', {
              at: selection.anchor
            });
            slate.Transforms.insertText(editor, '«', {
              at: selection.focus
            });
            break;
          }

        case '‹›':
          {
            slate.Transforms.insertText(editor, '›', {
              at: selection.anchor
            });
            slate.Transforms.insertText(editor, '‹', {
              at: selection.focus
            });
            break;
          }

        case '""':
          {
            slate.Transforms.insertText(editor, '"', {
              at: selection.anchor
            });
            slate.Transforms.insertText(editor, '"', {
              at: selection.focus
            });
            break;
          }

        case '’’':
          {
            slate.Transforms.insertText(editor, '’', {
              at: selection.anchor
            });
            slate.Transforms.insertText(editor, '’', {
              at: selection.focus
            });
            break;
          }
      }
    } else {
      /**
       * Anchor and focus in slate works exactly like DOM anchor and focus points
       * Also, Selection can start from focus instead of anchor (end to start).
       */
      const isStartingFromAnchor = selection.anchor.offset > selection.focus.offset;
      const startingPoint = isStartingFromAnchor ? selection.anchor : selection.focus;
      const endingPoint = isStartingFromAnchor ? selection.focus : selection.anchor;

      switch (selectedQuotationMarks) {
        case '«»':
          {
            slate.Transforms.insertText(editor, '»', {
              at: startingPoint
            });
            slate.Transforms.insertText(editor, '«', {
              at: endingPoint
            });
            break;
          }

        case '‹›':
          {
            slate.Transforms.insertText(editor, '›', {
              at: startingPoint
            });
            slate.Transforms.insertText(editor, '‹', {
              at: endingPoint
            });
            break;
          }

        case '""':
          {
            slate.Transforms.insertText(editor, '"', {
              at: startingPoint
            });
            slate.Transforms.insertText(editor, '"', {
              at: endingPoint
            });
            break;
          }

        case '’’':
          {
            slate.Transforms.insertText(editor, '’', {
              at: startingPoint
            });
            slate.Transforms.insertText(editor, '’', {
              at: endingPoint
            });
            break;
          }
      }
    }
  } else {
    slate.Transforms.insertText(editor, selectedQuotationMarks);
    slate.Transforms.select(editor, {
      anchor: selection.anchor,
      focus: selection.focus
    });
  }
}

const createQuotationMarksPlugin = () => ({
  pluginKeys: ELEMENT_QUOTATION_MARK,
  renderElement: plateCore.getRenderElement(ELEMENT_QUOTATION_MARK),
  inlineTypes: plateCore.getPlatePluginTypes(ELEMENT_QUOTATION_MARK)
});

exports.ELEMENT_QUOTATION_MARK = ELEMENT_QUOTATION_MARK;
exports.createQuotationMarksPlugin = createQuotationMarksPlugin;
exports.insertQuotationMarks = insertQuotationMarks;
//# sourceMappingURL=index.js.map
