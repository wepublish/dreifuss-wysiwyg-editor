import { SPEditor } from '@udecode/plate-core';
import { TablePluginOptions } from '../types';
export declare const getEmptyTableNode: (editor: SPEditor, { header }: TablePluginOptions) => {
    type: string;
    children: {
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
    }[];
};
//# sourceMappingURL=getEmptyTableNode.d.ts.map