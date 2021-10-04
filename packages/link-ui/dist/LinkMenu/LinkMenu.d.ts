import { BaseEditor } from 'slate';
import './link.css';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
declare type CustomElement = {
    type: 'link';
    title: string;
    url?: string;
    children: CustomText[];
};
declare type CustomText = {
    title: string;
    url?: string;
    text: string;
};
declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
export declare const ToolbarLink: () => JSX.Element;
export {};
//# sourceMappingURL=LinkMenu.d.ts.map