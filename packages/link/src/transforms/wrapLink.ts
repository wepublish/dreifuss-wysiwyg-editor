import {wrapNodes} from '@udecode/plate-common'
import {getPlatePluginType, SPEditor} from '@udecode/plate-core'
import {Location} from 'slate'
import {ELEMENT_LINK} from '../defaults'

/**
 * Wrap selected nodes with a link and collapse at the end.
 */
export const wrapLink = (editor: SPEditor, {at, url}: {url: string; at?: Location}) => {
  wrapNodes(
    editor,
    {
      type: getPlatePluginType(editor, ELEMENT_LINK),
      url,
      children: []
    },
    {at, split: true}
  )
}
