import {wrapNodes} from '@udecode/slate-plugins-common'
import {getSlatePluginType, SPEditor} from '@udecode/slate-plugins-core'
import {Location} from 'slate'
import {CHARACTER_COUNT} from '../defaults'

/**
 * Wrap selected nodes with a CharacterCount and collapse at the end.
 */
export const wrapCharacterCount = (editor: SPEditor, {at, url}: {url: string; at?: Location}) => {
  wrapNodes(
    editor,
    {
      type: getSlatePluginType(editor, CHARACTER_COUNT),
      url,
      children: []
    },
    {at, split: true}
  )
}
