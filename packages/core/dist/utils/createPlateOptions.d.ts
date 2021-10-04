import { ELEMENT_ALIGN_CENTER, ELEMENT_ALIGN_JUSTIFY, ELEMENT_ALIGN_LEFT, ELEMENT_ALIGN_RIGHT } from '@udecode/plate-alignment';
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE } from '@udecode/plate-basic-marks';
import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE } from '@udecode/plate-code-block';
import { PlatePluginOptions } from '@udecode/plate-core';
import { MARK_SEARCH_HIGHLIGHT } from '@udecode/plate-find-replace';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading';
import { MARK_HIGHLIGHT } from '@udecode/plate-highlight';
import { ELEMENT_LINK } from '@dreifuss-wysiwyg-editor/link';
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_TODO_LI, ELEMENT_UL, ELEMENT_LIC } from '@udecode/plate-list';
import { ELEMENT_MEDIA_EMBED } from '@udecode/plate-media-embed';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR } from '@dreifuss-wysiwyg-editor/table';
import { ELEMENT_IMAGE } from '@dreifuss-wysiwyg-editor/image';
export declare type DefaultPlatePluginKey = typeof ELEMENT_ALIGN_CENTER | typeof ELEMENT_ALIGN_JUSTIFY | typeof ELEMENT_ALIGN_LEFT | typeof ELEMENT_ALIGN_RIGHT | typeof ELEMENT_BLOCKQUOTE | typeof ELEMENT_CODE_BLOCK | typeof ELEMENT_CODE_LINE | typeof ELEMENT_H1 | typeof ELEMENT_H2 | typeof ELEMENT_H3 | typeof ELEMENT_LI | typeof ELEMENT_LINK | typeof ELEMENT_MEDIA_EMBED | typeof ELEMENT_OL | typeof ELEMENT_PARAGRAPH | typeof ELEMENT_TABLE | typeof ELEMENT_TD | typeof ELEMENT_TH | typeof ELEMENT_TODO_LI | typeof ELEMENT_TR | typeof ELEMENT_UL | typeof ELEMENT_LIC | typeof MARK_BOLD | typeof MARK_CODE | typeof MARK_HIGHLIGHT | typeof MARK_ITALIC | typeof MARK_SEARCH_HIGHLIGHT | typeof MARK_STRIKETHROUGH | typeof MARK_SUBSCRIPT | typeof MARK_SUPERSCRIPT | typeof MARK_UNDERLINE | typeof ELEMENT_IMAGE;
/**
 * Get slate plugins options.
 * @param overrides merge into the default options
 */
export declare const createPlateOptions: <T extends string = string>(overrides?: Partial<Record<DefaultPlatePluginKey | T, Partial<PlatePluginOptions>>>) => Record<DefaultPlatePluginKey | T, PlatePluginOptions>;
//# sourceMappingURL=createPlateOptions.d.ts.map