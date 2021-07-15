import {wrapNodes} from '@udecode/slate-plugins-common'
import {getSlatePluginType, SPEditor} from '@udecode/slate-plugins-core'
import {Location} from 'slate'
import {ELEMENT_LINK} from '../defaults'

/**
 * Wrap selected nodes with a link and collapse at the end.
 */
export const wrapLink = (editor: SPEditor, {at, url}: {url: string; at?: Location}) => {
  wrapNodes(
    editor,
    {
      type: getSlatePluginType(editor, ELEMENT_LINK),
      url,
      children: []
    },
    {at, split: true}
  )
}
