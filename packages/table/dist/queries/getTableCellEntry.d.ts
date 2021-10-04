import { SPEditor } from '@udecode/plate-core';
import { Location } from 'slate';
/**
 * If at (default = selection) is in table>tr>td, return table, tr, and td
 * node entries.
 */
export declare const getTableCellEntry: (editor: SPEditor, { at }?: {
    at?: Location | null | undefined;
}) => {
    tableElement: import("slate").NodeEntry<import("@udecode/plate-core").TAncestor<import("@udecode/plate-core").AnyObject>>;
    tableRow: import("slate").NodeEntry<import("@udecode/plate-core").TAncestor<import("@udecode/plate-core").AnyObject>>;
    tableCell: import("slate").NodeEntry<import("@udecode/plate-core").TAncestor<import("@udecode/plate-core").AnyObject>>;
} | undefined;
//# sourceMappingURL=getTableCellEntry.d.ts.map