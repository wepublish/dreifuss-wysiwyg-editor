'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plateCore = require('@udecode/plate-core');
var plateCommon = require('@udecode/plate-common');
var slate = require('slate');

const ELEMENT_TABLE = 'table';
const ELEMENT_TH = 'th';
const ELEMENT_TR = 'tr';
const ELEMENT_TD = 'td';
const KEYS_TABLE = [ELEMENT_TABLE, ELEMENT_TH, ELEMENT_TR, ELEMENT_TD];
const DEFAULTS_TH = {
  getNodeProps: ({
    element
  }) => {
    var _element$attributes, _element$attributes2;

    return {
      colSpan: element === null || element === void 0 ? void 0 : (_element$attributes = element.attributes) === null || _element$attributes === void 0 ? void 0 : _element$attributes.colspan,
      rowSpan: element === null || element === void 0 ? void 0 : (_element$attributes2 = element.attributes) === null || _element$attributes2 === void 0 ? void 0 : _element$attributes2.rowspan
    };
  }
};
const DEFAULTS_TD = {
  getNodeProps: ({
    element
  }) => {
    var _element$attributes3, _element$attributes4;

    return {
      colSpan: element === null || element === void 0 ? void 0 : (_element$attributes3 = element.attributes) === null || _element$attributes3 === void 0 ? void 0 : _element$attributes3.colspan,
      rowSpan: element === null || element === void 0 ? void 0 : (_element$attributes4 = element.attributes) === null || _element$attributes4 === void 0 ? void 0 : _element$attributes4.rowspan
    };
  }
};

const getTableDeserialize = () => editor => {
  const table = plateCore.getPlatePluginOptions(editor, ELEMENT_TABLE);
  const td = plateCore.getPlatePluginOptions(editor, ELEMENT_TD);
  const th = plateCore.getPlatePluginOptions(editor, ELEMENT_TH);
  const tr = plateCore.getPlatePluginOptions(editor, ELEMENT_TR);
  return {
    element: [...plateCommon.getElementDeserializer({
      type: table.type,
      rules: [{
        nodeNames: 'TABLE'
      }],
      ...table.deserialize
    }), ...plateCommon.getElementDeserializer({
      type: tr.type,
      rules: [{
        nodeNames: 'TR'
      }],
      ...tr.deserialize
    }), ...plateCommon.getElementDeserializer({
      type: td.type,
      attributeNames: ['rowspan', 'colspan'],
      rules: [{
        nodeNames: 'TD'
      }],
      ...td.deserialize
    }), ...plateCommon.getElementDeserializer({
      type: th.type,
      attributeNames: ['rowspan', 'colspan'],
      rules: [{
        nodeNames: 'TH'
      }],
      ...th.deserialize
    })]
  };
};

function getCellInNextTableRow(editor, currentRowPath) {
  try {
    var _nextRowNode$children;

    const nextRow = slate.Editor.node(editor, slate.Path.next(currentRowPath)); // TODO: Many tables in rich text editors (Google Docs, Word),
    // add a new row if we're in the last cell. Should we do the same?

    const [nextRowNode, nextRowPath] = nextRow;
    const nextCell = nextRowNode === null || nextRowNode === void 0 ? void 0 : (_nextRowNode$children = nextRowNode.children) === null || _nextRowNode$children === void 0 ? void 0 : _nextRowNode$children[0];
    const nextCellPath = nextRowPath.concat(0);

    if (nextCell && nextCellPath) {
      return slate.Editor.node(editor, nextCellPath);
    }
  } catch (err) {}
}

function getNextTableCell(editor, currentCell, currentPath, currentRow) {
  try {
    return slate.Editor.node(editor, slate.Path.next(currentPath));
  } catch (err) {
    const [, currentRowPath] = currentRow;
    return getCellInNextTableRow(editor, currentRowPath);
  }
}

function getCellInPreviousTableRow(editor, currentRowPath) {
  try {
    var _previousRowNode$chil;

    const previousRow = slate.Editor.node(editor, slate.Path.previous(currentRowPath));
    const [previousRowNode, previousRowPath] = previousRow;
    const previousCell = previousRowNode === null || previousRowNode === void 0 ? void 0 : (_previousRowNode$chil = previousRowNode.children) === null || _previousRowNode$chil === void 0 ? void 0 : _previousRowNode$chil[previousRowNode.children.length - 1];
    const previousCellPath = previousRowPath.concat(previousRowNode.children.length - 1);

    if (previousCell && previousCellPath) {
      return slate.Editor.node(editor, previousCellPath);
    }
  } catch (err) {}
}

function getPreviousTableCell(editor, currentCell, currentPath, currentRow) {
  try {
    return slate.Editor.node(editor, slate.Path.previous(currentPath));
  } catch (err) {
    const [, currentRowPath] = currentRow;
    return getCellInPreviousTableRow(editor, currentRowPath);
  }
}

/**
 * If at (default = selection) is in table>tr>td, return table, tr, and td
 * node entries.
 */

const getTableCellEntry = (editor, {
  at = editor.selection
} = {}) => {
  if (at && plateCommon.someNode(editor, {
    at,
    match: {
      type: plateCore.getPlatePluginType(editor, ELEMENT_TD)
    }
  })) {
    const selectionParent = plateCommon.getParent(editor, at);
    if (!selectionParent) return;
    const [, paragraphPath] = selectionParent;
    const tableCell = plateCommon.getAbove(editor, {
      at,
      match: {
        type: plateCore.getPlatePluginType(editor, ELEMENT_TD)
      }
    }) || plateCommon.getParent(editor, paragraphPath);
    if (!tableCell) return;
    const [tableCellNode, tableCellPath] = tableCell;
    if (tableCellNode.type !== plateCore.getPlatePluginType(editor, ELEMENT_TD)) return;
    const tableRow = plateCommon.getParent(editor, tableCellPath);
    if (!tableRow) return;
    const [tableRowNode, tableRowPath] = tableRow;
    if (tableRowNode.type !== plateCore.getPlatePluginType(editor, ELEMENT_TR)) return;
    const tableElement = plateCommon.getParent(editor, tableRowPath);
    if (!tableElement) return;
    return {
      tableElement,
      tableRow,
      tableCell
    };
  }
};

const getTableOnKeyDown = () => editor => e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const res = getTableCellEntry(editor, {});
    if (!res) return;
    const {
      tableRow,
      tableCell
    } = res;
    const [, tableCellPath] = tableCell;
    const shiftTab = e.shiftKey;
    const tab = !e.shiftKey;

    if (shiftTab) {
      // move left with shift+tab
      const previousCell = getPreviousTableCell(editor, tableCell, tableCellPath, tableRow);

      if (previousCell) {
        const [, previousCellPath] = previousCell;
        slate.Transforms.select(editor, previousCellPath);
      }
    } else if (tab) {
      // move right with tab
      const nextCell = getNextTableCell(editor, tableCell, tableCellPath, tableRow);

      if (nextCell) {
        const [, nextCellPath] = nextCell;
        slate.Transforms.select(editor, nextCellPath);
      }
    }
  } // FIXME: would prefer this as mod+a, but doesn't work


  if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
    const options = plateCore.getPlatePluginOptions(editor, ELEMENT_TABLE);
    const res = plateCommon.getAbove(editor, {
      match: {
        type: options.type
      }
    });
    if (!res) return;
    const [, tablePath] = res; // select the whole table

    slate.Transforms.select(editor, tablePath);
    e.preventDefault();
    e.stopPropagation();
  }
};

const withTable = () => editor => {
  const matchCells = node => {
    return plateCore.isElement(node) && (node.type === plateCore.getPlatePluginType(editor, ELEMENT_TD) || node.type === plateCore.getPlatePluginType(editor, ELEMENT_TD));
  };

  const {
    deleteBackward,
    deleteForward,
    deleteFragment,
    insertText
  } = editor;

  const preventDeleteCell = (operation, pointCallback, nextPoint) => unit => {
    const {
      selection
    } = editor;

    if (plateCommon.isCollapsed(selection)) {
      const [cell] = slate.Editor.nodes(editor, {
        match: matchCells
      });

      if (cell) {
        // Prevent deletions within a cell
        const [, cellPath] = cell;
        const start = pointCallback(editor, cellPath);

        if (selection && slate.Point.equals(selection.anchor, start)) {
          return;
        }
      } else {
        // Prevent deleting cell when selection is before or after a table
        const next = nextPoint(editor, selection, {
          unit
        });
        const [nextCell] = slate.Editor.nodes(editor, {
          match: matchCells,
          at: next
        });
        if (nextCell) return;
      }
    }

    operation(unit);
  };

  editor.deleteFragment = () => {
    const {
      selection
    } = editor;
    const [start] = slate.Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.anchor.path
    });
    const [end] = slate.Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.focus.path
    }); // Skip deletes if they start or end in a table cell, unless start & end in the same cell

    if ((start || end) && (start === null || start === void 0 ? void 0 : start[0]) !== (end === null || end === void 0 ? void 0 : end[0])) {
      // Clear cells content
      const cells = slate.Editor.nodes(editor, {
        match: matchCells
      });

      for (const [, path] of cells) {
        for (const [, childPath] of slate.Node.children(editor, path, {
          reverse: true
        })) {
          slate.Transforms.removeNodes(editor, {
            at: childPath
          });
        }
      }

      slate.Transforms.collapse(editor);
      return;
    }

    deleteFragment();
  };

  editor.insertText = text => {
    const {
      selection
    } = editor;
    const [start] = slate.Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.anchor.path
    });
    const [end] = slate.Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.focus.path
    }); // Collapse selection if multiple cells are selected to avoid breaking the table

    if (!plateCommon.isCollapsed(selection) && (start || end) && (start === null || start === void 0 ? void 0 : start[0]) !== (end === null || end === void 0 ? void 0 : end[0])) {
      const [cell] = slate.Editor.nodes(editor, {
        match: matchCells
      });

      if (cell) {
        slate.Transforms.collapse(editor, {
          edge: 'end'
        });
        insertText(text);
        return;
      }
    }

    insertText(text);
  }; // prevent deleting cells with deleteBackward


  editor.deleteBackward = preventDeleteCell(deleteBackward, slate.Editor.start, slate.Editor.before); // prevent deleting cells with deleteForward

  editor.deleteForward = preventDeleteCell(deleteForward, slate.Editor.end, slate.Editor.after);
  return editor;
};

/**
 * Enables support for tables.
 */

const createTablePlugin = () => ({
  pluginKeys: KEYS_TABLE,
  renderElement: plateCore.getRenderElement(KEYS_TABLE),
  deserialize: getTableDeserialize(),
  onKeyDown: getTableOnKeyDown(),
  withOverrides: withTable()
});

const getEmptyCellNode = (editor, {
  header
}) => {
  return {
    type: header ? plateCore.getPlatePluginType(editor, ELEMENT_TD) : plateCore.getPlatePluginType(editor, ELEMENT_TD),
    children: [{
      type: plateCore.getPlatePluginType(editor, plateCommon.ELEMENT_DEFAULT),
      children: [{
        text: ''
      }]
    }]
  };
};

const addColumn = (editor, {
  header
}) => {
  if (plateCommon.someNode(editor, {
    match: {
      type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const currentCellItem = plateCommon.getAbove(editor, {
      match: {
        type: [plateCore.getPlatePluginType(editor, ELEMENT_TD), plateCore.getPlatePluginType(editor, ELEMENT_TD)]
      }
    });
    const currentTableItem = plateCommon.getAbove(editor, {
      match: {
        type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
      }
    });

    if (currentCellItem && currentTableItem) {
      const nextCellPath = slate.Path.next(currentCellItem[1]);
      const newCellPath = nextCellPath.slice();
      const replacePathPos = newCellPath.length - 2;
      const currentRowIdx = nextCellPath[replacePathPos];
      currentTableItem[0].children.forEach((row, rowIdx) => {
        newCellPath[replacePathPos] = rowIdx;
        plateCommon.insertNodes(editor, getEmptyCellNode(editor, {
          header
        }), {
          at: newCellPath,
          select: rowIdx === currentRowIdx
        });
      });
    }
  }
};

const getEmptyRowNode = (editor, {
  header,
  colCount
}) => {
  return {
    type: plateCore.getPlatePluginType(editor, ELEMENT_TR),
    children: Array(colCount).fill(colCount).map(() => getEmptyCellNode(editor, {
      header
    }))
  };
};

const addRow = (editor, {
  header
}) => {
  if (plateCommon.someNode(editor, {
    match: {
      type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const currentRowItem = plateCommon.getAbove(editor, {
      match: {
        type: plateCore.getPlatePluginType(editor, ELEMENT_TR)
      }
    });

    if (currentRowItem) {
      const [currentRowElem, currentRowPath] = currentRowItem;
      plateCommon.insertNodes(editor, getEmptyRowNode(editor, {
        header,
        colCount: currentRowElem.children.length
      }), {
        at: slate.Path.next(currentRowPath),
        select: true
      });
    }
  }
};

const deleteColumn = editor => {
  if (plateCommon.someNode(editor, {
    match: {
      type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const currentCellItem = plateCommon.getAbove(editor, {
      match: {
        type: [plateCore.getPlatePluginType(editor, ELEMENT_TD), plateCore.getPlatePluginType(editor, ELEMENT_TD)]
      }
    });
    const currentRowItem = plateCommon.getAbove(editor, {
      match: {
        type: plateCore.getPlatePluginType(editor, ELEMENT_TR)
      }
    });
    const currentTableItem = plateCommon.getAbove(editor, {
      match: {
        type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
      }
    });

    if (currentCellItem && currentRowItem && currentTableItem && // Cannot delete the last cell
    currentRowItem[0].children.length > 1) {
      const currentCellPath = currentCellItem[1];
      const pathToDelete = currentCellPath.slice();
      const replacePathPos = pathToDelete.length - 2;
      currentTableItem[0].children.forEach((row, rowIdx) => {
        pathToDelete[replacePathPos] = rowIdx;
        slate.Transforms.removeNodes(editor, {
          at: pathToDelete
        });
      });
    }
  }
};

const deleteRow = editor => {
  if (plateCommon.someNode(editor, {
    match: {
      type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const currentTableItem = plateCommon.getAbove(editor, {
      match: {
        type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
      }
    });
    const currentRowItem = plateCommon.getAbove(editor, {
      match: {
        type: plateCore.getPlatePluginType(editor, ELEMENT_TR)
      }
    });

    if (currentRowItem && currentTableItem && // Cannot delete the last row
    currentTableItem[0].children.length > 1) {
      slate.Transforms.removeNodes(editor, {
        at: currentRowItem[1]
      });
    }
  }
};

const deleteTable = editor => {
  if (plateCommon.someNode(editor, {
    match: {
      type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const tableItem = plateCommon.getAbove(editor, {
      match: {
        type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
      }
    });

    if (tableItem) {
      slate.Transforms.removeNodes(editor, {
        at: tableItem[1]
      });
    }
  }
};

const getEmptyTableNode = (editor, {
  header
}) => {
  return {
    type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE),
    children: [getEmptyRowNode(editor, {
      header,
      colCount: 2
    }), getEmptyRowNode(editor, {
      header,
      colCount: 2
    })]
  };
};

const insertTable = (editor, {
  header
}) => {
  if (!plateCommon.someNode(editor, {
    match: {
      type: plateCore.getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    plateCommon.insertNodes(editor, getEmptyTableNode(editor, {
      header
    }));
  }
};

function upsertBgColor(editor, backgroundColor) {
  if (!(editor !== null && editor !== void 0 && editor.selection) || !backgroundColor) return;
  const tdType = plateCore.getPlatePluginType(editor, ELEMENT_TD);
  const tableType = plateCore.getPlatePluginType(editor, ELEMENT_TABLE);
  const nodes = slate.Editor.nodes(editor, {
    // @ts-ignore
    match: node => slate.Element.isElement(node) && node.type === tableType
  });

  for (const [, path] of nodes) {
    plateCommon.setNodes(editor, {
      backgroundColor
    }, {
      at: path,
      match: node => node.type === tdType
    });
    return;
  }
}

function upsertBorderColor(editor, borderColor) {
  if (!(editor !== null && editor !== void 0 && editor.selection) || !borderColor) return;
  const tdType = plateCore.getPlatePluginType(editor, ELEMENT_TD);
  const tableType = plateCore.getPlatePluginType(editor, ELEMENT_TABLE);
  const nodes = slate.Editor.nodes(editor, {
    // @ts-ignore
    match: node => slate.Element.isElement(node) && node.type === tableType
  });

  for (const [, path] of nodes) {
    plateCommon.setNodes(editor, {
      borderColor
    }, {
      at: path,
      match: node => node.type === tdType
    });
    return;
  }
}

exports.DEFAULTS_TD = DEFAULTS_TD;
exports.DEFAULTS_TH = DEFAULTS_TH;
exports.ELEMENT_TABLE = ELEMENT_TABLE;
exports.ELEMENT_TD = ELEMENT_TD;
exports.ELEMENT_TH = ELEMENT_TH;
exports.ELEMENT_TR = ELEMENT_TR;
exports.KEYS_TABLE = KEYS_TABLE;
exports.addColumn = addColumn;
exports.addRow = addRow;
exports.createTablePlugin = createTablePlugin;
exports.deleteColumn = deleteColumn;
exports.deleteRow = deleteRow;
exports.deleteTable = deleteTable;
exports.getCellInNextTableRow = getCellInNextTableRow;
exports.getCellInPreviousTableRow = getCellInPreviousTableRow;
exports.getEmptyCellNode = getEmptyCellNode;
exports.getEmptyRowNode = getEmptyRowNode;
exports.getEmptyTableNode = getEmptyTableNode;
exports.getNextTableCell = getNextTableCell;
exports.getPreviousTableCell = getPreviousTableCell;
exports.getTableCellEntry = getTableCellEntry;
exports.getTableDeserialize = getTableDeserialize;
exports.getTableOnKeyDown = getTableOnKeyDown;
exports.insertTable = insertTable;
exports.upsertBgColor = upsertBgColor;
exports.upsertBorderColor = upsertBorderColor;
exports.withTable = withTable;
//# sourceMappingURL=index.js.map
