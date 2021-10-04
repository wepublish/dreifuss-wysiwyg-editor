import { SPEditor, WithOverride } from '@udecode/plate-core';
import { ReactEditor } from 'slate-react';
import { WithImageUploadOptions } from './types';
/**
 * Allows for pasting images from clipboard.
 * Not yet: dragging and dropping images, selecting them through a file system dialog.
 * @param options.type
 * @param options.uploadImage
 */
export declare const withImageUpload: ({ uploadImage }?: WithImageUploadOptions) => WithOverride<ReactEditor & SPEditor>;
//# sourceMappingURL=withImageUpload.d.ts.map