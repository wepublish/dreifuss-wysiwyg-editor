import {TDescendant} from '@udecode/plate-core'

export enum ImageSizeType {
  fullScreen = 'fullScreen',
  large = 'large',
  medium = 'medium',
  small = 'small'
}

export enum ImageAlignmentType {
  right = 'right',
  left = 'left'
}

export interface ImageNodeData {
  url: string
  size: ImageSizeType
  align?: ImageAlignmentType
  caption?: TDescendant[]
}

export interface WithImageUploadOptions {
  /**
   * An optional method that will upload the image to a server.
   * The method receives the base64 dataUrl of the uploaded image, and should return the URL of the uploaded image.
   */
  uploadImage?: (
    dataUrl: string | ArrayBuffer
  ) => Promise<string | ArrayBuffer> | string | ArrayBuffer
}
