import {insertNodes} from '@udecode/plate-common'
import {getPlatePluginType, SPEditor, TElement} from '@udecode/plate-core'
import {ELEMENT_IMAGE} from '../defaults'
import {ImageSizeType} from '../types'

export const insertImage = (
  editor: SPEditor,
  url: string | ArrayBuffer,
  size: ImageSizeType = ImageSizeType.large
) => {
  const text = {text: ''}
  const image = {
    type: getPlatePluginType(editor, ELEMENT_IMAGE),
    url,
    size,
    children: [text]
  }
  insertNodes<TElement>(editor, image)
}
