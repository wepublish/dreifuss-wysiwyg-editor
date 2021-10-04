import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { BaseEditor } from 'slate';
declare type CustomElement = {
    type: 'td';
    title: string;
    borderColor?: string;
    backgroundColor?: string;
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
interface ToolbarBackgroundColorProps {
    icon?: any;
}
export declare const TableBgColorToolbar: (props: ToolbarBackgroundColorProps) => JSX.Element;
export {};
//# sourceMappingURL=ToolbarBackgroundColor.d.ts.map