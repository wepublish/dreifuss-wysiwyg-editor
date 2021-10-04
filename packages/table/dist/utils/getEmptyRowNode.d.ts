import { SPEditor } from '@udecode/plate-core';
import { TablePluginOptions } from '../types';
export declare const getEmptyRowNode: (editor: SPEditor, { header, colCount }: TablePluginOptions & {
    colCount: number;
}) => {
    type: string;
    children: {
        type: string;
        children: {
            type: string;
            children: {
                text: string;
            }[];
        }[];
    }[];
};
//# sourceMappingURL=getEmptyRowNode.d.ts.map