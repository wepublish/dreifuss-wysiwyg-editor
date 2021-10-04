import React, { ReactNode } from 'react';
import { EditorValue } from '@dreifuss-wysiwyg-editor/common';
export interface EditableProps {
    id?: string;
    displayOnly?: boolean;
    showCharactersCount?: boolean;
    displayOneLine?: boolean;
    disabled?: boolean;
}
export interface Toolbars {
    ImageToolbar: ReactNode;
}
export interface EditorProps {
    id?: string;
    displayOnly?: boolean;
    showCharactersCount?: boolean;
    displayOneLine?: boolean;
    disabled?: boolean;
    initialValue?: any;
    value?: EditorValue;
    charactersCount?: any;
    onChange?: React.Dispatch<React.SetStateAction<any>>;
    toolbars?: Toolbars;
}
export default function DreifussWysiwygEditor(props: EditorProps): JSX.Element;
//# sourceMappingURL=DreifussWysiwygEditor.d.ts.map