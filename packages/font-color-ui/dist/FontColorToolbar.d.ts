import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { BaseEditor } from 'slate';
declare type CustomElement = {
    type: 'link';
    title: string;
    color?: string;
    children: CustomText[];
};
declare type CustomText = {
    title: string;
    text: string;
};
declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}
interface FontColorToolbarProps {
    icon?: any;
}
export declare const FontColorToolbar: (props: FontColorToolbarProps) => JSX.Element;
export {};
//# sourceMappingURL=FontColorToolbar.d.ts.map