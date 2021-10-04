import { SPEditor } from '@udecode/plate-core';
/**
 * Unwrap link at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the link at the location.
 */
export declare const upsertLinkAtSelection: (editor: SPEditor, { url, wrap, selection }: {
    url: string;
    /**
     * If true, wrap the link at the location (default: selection) even if the selection is collapsed.
     */
    wrap?: boolean | undefined;
    selection?: any;
}) => void;
export declare function removeLink(editor: SPEditor): null | undefined;
//# sourceMappingURL=upsertLinkAtSelection.d.ts.map