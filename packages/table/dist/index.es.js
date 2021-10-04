import { getPlatePluginOptions, getPlatePluginType, isElement, getRenderElement } from '@udecode/plate-core';
import { getElementDeserializer, someNode, getParent, getAbove, isCollapsed, ELEMENT_DEFAULT, insertNodes, setNodes } from '@udecode/plate-common';
import { Editor, Path, Transforms, Node, Point, Element } from 'slate';

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
  const table = getPlatePluginOptions(editor, ELEMENT_TABLE);
  const td = getPlatePluginOptions(editor, ELEMENT_TD);
  const th = getPlatePluginOptions(editor, ELEMENT_TH);
  const tr = getPlatePluginOptions(editor, ELEMENT_TR);
  return {
    element: [...getElementDeserializer({
      type: table.type,
      rules: [{
        nodeNames: 'TABLE'
      }],
      ...table.deserialize
    }), ...getElementDeserializer({
      type: tr.type,
      rules: [{
        nodeNames: 'TR'
      }],
      ...tr.deserialize
    }), ...getElementDeserializer({
      type: td.type,
      attributeNames: ['rowspan', 'colspan'],
      rules: [{
        nodeNames: 'TD'
      }],
      ...td.deserialize
    }), ...getElementDeserializer({
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

    const nextRow = Editor.node(editor, Path.next(currentRowPath)); // TODO: Many tables in rich text editors (Google Docs, Word),
    // add a new row if we're in the last cell. Should we do the same?

    const [nextRowNode, nextRowPath] = nextRow;
    const nextCell = nextRowNode === null || nextRowNode === void 0 ? void 0 : (_nextRowNode$children = nextRowNode.children) === null || _nextRowNode$children === void 0 ? void 0 : _nextRowNode$children[0];
    const nextCellPath = nextRowPath.concat(0);

    if (nextCell && nextCellPath) {
      return Editor.node(editor, nextCellPath);
    }
  } catch (err) {}
}

function getNextTableCell(editor, currentCell, currentPath, currentRow) {
  try {
    return Editor.node(editor, Path.next(currentPath));
  } catch (err) {
    const [, currentRowPath] = currentRow;
    return getCellInNextTableRow(editor, currentRowPath);
  }
}

function getCellInPreviousTableRow(editor, currentRowPath) {
  try {
    var _previousRowNode$chil;

    const previousRow = Editor.node(editor, Path.previous(currentRowPath));
    const [previousRowNode, previousRowPath] = previousRow;
    const previousCell = previousRowNode === null || previousRowNode === void 0 ? void 0 : (_previousRowNode$chil = previousRowNode.children) === null || _previousRowNode$chil === void 0 ? void 0 : _previousRowNode$chil[previousRowNode.children.length - 1];
    const previousCellPath = previousRowPath.concat(previousRowNode.children.length - 1);

    if (previousCell && previousCellPath) {
      return Editor.node(editor, previousCellPath);
    }
  } catch (err) {}
}

function getPreviousTableCell(editor, currentCell, currentPath, currentRow) {
  try {
    return Editor.node(editor, Path.previous(currentPath));
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
  if (at && someNode(editor, {
    at,
    match: {
      type: getPlatePluginType(editor, ELEMENT_TD)
    }
  })) {
    const selectionParent = getParent(editor, at);
    if (!selectionParent) return;
    const [, paragraphPath] = selectionParent;
    const tableCell = getAbove(editor, {
      at,
      match: {
        type: getPlatePluginType(editor, ELEMENT_TD)
      }
    }) || getParent(editor, paragraphPath);
    if (!tableCell) return;
    const [tableCellNode, tableCellPath] = tableCell;
    if (tableCellNode.type !== getPlatePluginType(editor, ELEMENT_TD)) return;
    const tableRow = getParent(editor, tableCellPath);
    if (!tableRow) return;
    const [tableRowNode, tableRowPath] = tableRow;
    if (tableRowNode.type !== getPlatePluginType(editor, ELEMENT_TR)) return;
    const tableElement = getParent(editor, tableRowPath);
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
        Transforms.select(editor, previousCellPath);
      }
    } else if (tab) {
      // move right with tab
      const nextCell = getNextTableCell(editor, tableCell, tableCellPath, tableRow);

      if (nextCell) {
        const [, nextCellPath] = nextCell;
        Transforms.select(editor, nextCellPath);
      }
    }
  } // FIXME: would prefer this as mod+a, but doesn't work


  if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
    const options = getPlatePluginOptions(editor, ELEMENT_TABLE);
    const res = getAbove(editor, {
      match: {
        type: options.type
      }
    });
    if (!res) return;
    const [, tablePath] = res; // select the whole table

    Transforms.select(editor, tablePath);
    e.preventDefault();
    e.stopPropagation();
  }
};

const withTable = () => editor => {
  const matchCells = node => {
    return isElement(node) && (node.type === getPlatePluginType(editor, ELEMENT_TD) || node.type === getPlatePluginType(editor, ELEMENT_TD));
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

    if (isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: matchCells
      });

      if (cell) {
        // Prevent deletions within a cell
        const [, cellPath] = cell;
        const start = pointCallback(editor, cellPath);

        if (selection && Point.equals(selection.anchor, start)) {
          return;
        }
      } else {
        // Prevent deleting cell when selection is before or after a table
        const next = nextPoint(editor, selection, {
          unit
        });
        const [nextCell] = Editor.nodes(editor, {
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
    const [start] = Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.anchor.path
    });
    const [end] = Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.focus.path
    }); // Skip deletes if they start or end in a table cell, unless start & end in the same cell

    if ((start || end) && (start === null || start === void 0 ? void 0 : start[0]) !== (end === null || end === void 0 ? void 0 : end[0])) {
      // Clear cells content
      const cells = Editor.nodes(editor, {
        match: matchCells
      });

      for (const [, path] of cells) {
        for (const [, childPath] of Node.children(editor, path, {
          reverse: true
        })) {
          Transforms.removeNodes(editor, {
            at: childPath
          });
        }
      }

      Transforms.collapse(editor);
      return;
    }

    deleteFragment();
  };

  editor.insertText = text => {
    const {
      selection
    } = editor;
    const [start] = Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.anchor.path
    });
    const [end] = Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.focus.path
    }); // Collapse selection if multiple cells are selected to avoid breaking the table

    if (!isCollapsed(selection) && (start || end) && (start === null || start === void 0 ? void 0 : start[0]) !== (end === null || end === void 0 ? void 0 : end[0])) {
      const [cell] = Editor.nodes(editor, {
        match: matchCells
      });

      if (cell) {
        Transforms.collapse(editor, {
          edge: 'end'
        });
        insertText(text);
        return;
      }
    }

    insertText(text);
  }; // prevent deleting cells with deleteBackward


  editor.deleteBackward = preventDeleteCell(deleteBackward, Editor.start, Editor.before); // prevent deleting cells with deleteForward

  editor.deleteForward = preventDeleteCell(deleteForward, Editor.end, Editor.after);
  return editor;
};

/**
 * Enables support for tables.
 */

const createTablePlugin = () => ({
  pluginKeys: KEYS_TABLE,
  renderElement: getRenderElement(KEYS_TABLE),
  deserialize: getTableDeserialize(),
  onKeyDown: getTableOnKeyDown(),
  withOverrides: withTable()
});

const getEmptyCellNode = (editor, {
  header
}) => {
  return {
    type: header ? getPlatePluginType(editor, ELEMENT_TD) : getPlatePluginType(editor, ELEMENT_TD),
    children: [{
      type: getPlatePluginType(editor, ELEMENT_DEFAULT),
      children: [{
        text: ''
      }]
    }]
  };
};

const addColumn = (editor, {
  header
}) => {
  if (someNode(editor, {
    match: {
      type: getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const currentCellItem = getAbove(editor, {
      match: {
        type: [getPlatePluginType(editor, ELEMENT_TD), getPlatePluginType(editor, ELEMENT_TD)]
      }
    });
    const currentTableItem = getAbove(editor, {
      match: {
        type: getPlatePluginType(editor, ELEMENT_TABLE)
      }
    });

    if (currentCellItem && currentTableItem) {
      const nextCellPath = Path.next(currentCellItem[1]);
      const newCellPath = nextCellPath.slice();
      const replacePathPos = newCellPath.length - 2;
      const currentRowIdx = nextCellPath[replacePathPos];
      currentTableItem[0].children.forEach((row, rowIdx) => {
        newCellPath[replacePathPos] = rowIdx;
        insertNodes(editor, getEmptyCellNode(editor, {
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
    type: getPlatePluginType(editor, ELEMENT_TR),
    children: Array(colCount).fill(colCount).map(() => getEmptyCellNode(editor, {
      header
    }))
  };
};

const addRow = (editor, {
  header
}) => {
  if (someNode(editor, {
    match: {
      type: getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const currentRowItem = getAbove(editor, {
      match: {
        type: getPlatePluginType(editor, ELEMENT_TR)
      }
    });

    if (currentRowItem) {
      const [currentRowElem, currentRowPath] = currentRowItem;
      insertNodes(editor, getEmptyRowNode(editor, {
        header,
        colCount: currentRowElem.children.length
      }), {
        at: Path.next(currentRowPath),
        select: true
      });
    }
  }
};

const deleteColumn = editor => {
  if (someNode(editor, {
    match: {
      type: getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const currentCellItem = getAbove(editor, {
      match: {
        type: [getPlatePluginType(editor, ELEMENT_TD), getPlatePluginType(editor, ELEMENT_TD)]
      }
    });
    const currentRowItem = getAbove(editor, {
      match: {
        type: getPlatePluginType(editor, ELEMENT_TR)
      }
    });
    const currentTableItem = getAbove(editor, {
      match: {
        type: getPlatePluginType(editor, ELEMENT_TABLE)
      }
    });

    if (currentCellItem && currentRowItem && currentTableItem && // Cannot delete the last cell
    currentRowItem[0].children.length > 1) {
      const currentCellPath = currentCellItem[1];
      const pathToDelete = currentCellPath.slice();
      const replacePathPos = pathToDelete.length - 2;
      currentTableItem[0].children.forEach((row, rowIdx) => {
        pathToDelete[replacePathPos] = rowIdx;
        Transforms.removeNodes(editor, {
          at: pathToDelete
        });
      });
    }
  }
};

const deleteRow = editor => {
  if (someNode(editor, {
    match: {
      type: getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const currentTableItem = getAbove(editor, {
      match: {
        type: getPlatePluginType(editor, ELEMENT_TABLE)
      }
    });
    const currentRowItem = getAbove(editor, {
      match: {
        type: getPlatePluginType(editor, ELEMENT_TR)
      }
    });

    if (currentRowItem && currentTableItem && // Cannot delete the last row
    currentTableItem[0].children.length > 1) {
      Transforms.removeNodes(editor, {
        at: currentRowItem[1]
      });
    }
  }
};

const deleteTable = editor => {
  if (someNode(editor, {
    match: {
      type: getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    const tableItem = getAbove(editor, {
      match: {
        type: getPlatePluginType(editor, ELEMENT_TABLE)
      }
    });

    if (tableItem) {
      Transforms.removeNodes(editor, {
        at: tableItem[1]
      });
    }
  }
};

const getEmptyTableNode = (editor, {
  header
}) => {
  return {
    type: getPlatePluginType(editor, ELEMENT_TABLE),
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
  if (!someNode(editor, {
    match: {
      type: getPlatePluginType(editor, ELEMENT_TABLE)
    }
  })) {
    insertNodes(editor, getEmptyTableNode(editor, {
      header
    }));
  }
};

function upsertBgColor(editor, backgroundColor) {
  if (!(editor !== null && editor !== void 0 && editor.selection) || !backgroundColor) return;
  const tdType = getPlatePluginType(editor, ELEMENT_TD);
  const tableType = getPlatePluginType(editor, ELEMENT_TABLE);
  const nodes = Editor.nodes(editor, {
    // @ts-ignore
    match: node => Element.isElement(node) && node.type === tableType
  });

  for (const [, path] of nodes) {
    setNodes(editor, {
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
  const tdType = getPlatePluginType(editor, ELEMENT_TD);
  const tableType = getPlatePluginType(editor, ELEMENT_TABLE);
  const nodes = Editor.nodes(editor, {
    // @ts-ignore
    match: node => Element.isElement(node) && node.type === tableType
  });

  for (const [, path] of nodes) {
    setNodes(editor, {
      borderColor
    }, {
      at: path,
      match: node => node.type === tdType
    });
    return;
  }
}

export { DEFAULTS_TD, DEFAULTS_TH, ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR, KEYS_TABLE, addColumn, addRow, createTablePlugin, deleteColumn, deleteRow, deleteTable, getCellInNextTableRow, getCellInPreviousTableRow, getEmptyCellNode, getEmptyRowNode, getEmptyTableNode, getNextTableCell, getPreviousTableCell, getTableCellEntry, getTableDeserialize, getTableOnKeyDown, insertTable, upsertBgColor, upsertBorderColor, withTable };
//# sourceMappingURL=index.es.js.map
