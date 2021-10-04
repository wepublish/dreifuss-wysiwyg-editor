import {TDescendant} from '@udecode/plate-core'

export enum ImageSizeType {
  large = 'large',
  medium = 'medium',
  small = 'small'
}

export interface ImageNodeData {
  url: string
  size: ImageSizeType
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
