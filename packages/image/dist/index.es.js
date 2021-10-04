import { getPlatePluginOptions, getPlatePluginType, getRenderElement, getPlatePluginTypes } from '@udecode/plate-core';
import { getNodeDeserializer, insertNodes, isUrl } from '@udecode/plate-common';

const ELEMENT_IMAGE = 'img';

const getImageDeserialize = () => editor => {
  const options = getPlatePluginOptions(editor, ELEMENT_IMAGE);
  return {
    element: getNodeDeserializer({
      type: options.type,
      getNode: el => ({
        type: options.type,
        url: el.getAttribute('src')
      }),
      rules: [{
        nodeNames: 'IMG'
      }],
      ...options.deserialize
    })
  };
};

const insertImage = (editor, url) => {
  const text = {
    text: ''
  };
  const image = {
    type: getPlatePluginType(editor, ELEMENT_IMAGE),
    url,
    children: [text]
  };
  insertNodes(editor, image);
  insertNodes(editor, {
    type: 'paragraph',
    children: [text]
  });
};

const imageExtensions = ['ase', 'art', 'bmp', 'blp', 'cd5', 'cit', 'cpt', 'cr2', 'cut', 'dds', 'dib', 'djvu', 'egt', 'exif', 'gif', 'gpl', 'grf', 'icns', 'ico', 'iff', 'jng', 'jpeg', 'jpg', 'jfif', 'jp2', 'jps', 'lbm', 'max', 'miff', 'mng', 'msp', 'nitf', 'ota', 'pbm', 'pc1', 'pc2', 'pc3', 'pcf', 'pcx', 'pdn', 'pgm', 'PI1', 'PI2', 'PI3', 'pict', 'pct', 'pnm', 'pns', 'ppm', 'psb', 'psd', 'pdd', 'psp', 'px', 'pxm', 'pxr', 'qfx', 'raw', 'rle', 'sct', 'sgi', 'rgb', 'int', 'bw', 'tga', 'tiff', 'tif', 'vtf', 'xbm', 'xcf', 'xpm', '3dv', 'amf', 'ai', 'awg', 'cgm', 'cdr', 'cmx', 'dxf', 'e2d', 'egt', 'eps', 'fs', 'gbr', 'odg', 'svg', 'stl', 'vrml', 'x3d', 'sxd', 'v2d', 'vnd', 'wmf', 'emf', 'art', 'xar', 'png', 'webp', 'jxr', 'hdp', 'wdp', 'cur', 'ecw', 'iff', 'lbm', 'liff', 'nrrd', 'pam', 'pcx', 'pgf', 'sgi', 'rgb', 'rgba', 'bw', 'int', 'inta', 'sid', 'ras', 'sun', 'tga'];
const isImageUrl = url => {
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

/**
 * Allows for pasting images from clipboard.
 * Not yet: dragging and dropping images, selecting them through a file system dialog.
 * @param options.type
 * @param options.uploadImage
 */
const withImageUpload = ({
  uploadImage
} = {}) => editor => {
  const {
    insertData
  } = editor;

  editor.insertData = data => {
    const text = data.getData('text/plain');
    const {
      files
    } = data;

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
            insertImage(editor, uploadedUrl);
          });
          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

/**
 * Enables support for images.
 */

const createImagePlugin = options => ({
  pluginKeys: ELEMENT_IMAGE,
  renderElement: getRenderElement(ELEMENT_IMAGE),
  deserialize: getImageDeserialize(),
  voidTypes: getPlatePluginTypes(ELEMENT_IMAGE),
  withOverrides: withImageUpload(options)
});

export { ELEMENT_IMAGE, createImagePlugin, getImageDeserialize, insertImage, isImageUrl, withImageUpload };
//# sourceMappingURL=index.es.js.map
