"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withImageUpload = void 0;
const insertImage_1 = require("./transforms/insertImage");
const isImageUrl_1 = require("./utils/isImageUrl");
/**
 * Allows for pasting images from clipboard.
 * Not yet: dragging and dropping images, selecting them through a file system dialog.
 * @param options.type
 * @param options.uploadImage
 */
const withImageUpload = ({ uploadImage } = {}) => editor => {
    const { insertData } = editor;
    editor.insertData = (data) => {
        const text = data.getData('text/plain');
        const { files } = data;
        if (files && files.length > 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');
                if (mime === 'image') {
                    reader.addEventListener('load', async () => {
                        if (!reader.result) {
                            return;
                        }
                        const uploadedUrl = uploadImage ? await uploadImage(reader.result) : reader.result;
                        insertImage_1.insertImage(editor, uploadedUrl);
                    });
                    reader.readAsDataURL(file);
                }
            }
        }
        else if (isImageUrl_1.isImageUrl(text)) {
            insertImage_1.insertImage(editor, text);
        }
        else {
            insertData(data);
        }
    };
    return editor;
};
exports.withImageUpload = withImageUpload;
//# sourceMappingURL=withImageUpload.js.map