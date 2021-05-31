import {insertNodes, isCollapsed, unwrapNodes} from '@udecode/slate-plugins-common'
import {getSlatePluginType, SPEditor, TElement} from '@udecode/slate-plugins-core'
import {Editor, Transforms} from 'slate'
import {CHARACTER_COUNT} from '../defaults'
import {wrapCharacterCount} from './wrapLink'

/**
 * Unwrap CharacterCount at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the CharacterCount at the location.
 */
export const upsertCharacterCountAtSelection = (
  editor: SPEditor,
  {
    url,
    wrap
  }: {
    url: string
    /**
     * If true, wrap the CharacterCount at the location (default: selection) even if the selection is collapsed.
     */
    wrap?: boolean
  }
) => {
  if (!editor.selection) return

  const type = getSlatePluginType(editor, CHARACTER_COUNT)

  if (!wrap && isCollapsed(editor.selection)) {
    return insertNodes<TElement>(editor, {
      type,
      url,
      children: [{text: url}]
    })
  }

  // if our cursor is inside an existing CharacterCount, but don't have the text selected, select it now
  if (wrap && isCollapsed(editor.selection)) {
    const CharacterCountLeaf = Editor.leaf(editor, editor.selection)
    const [, inlinePath] = CharacterCountLeaf
    Transforms.select(editor, inlinePath)
  }

  unwrapNodes(editor, {at: editor.selection, match: {type}})

  wrapCharacterCount(editor, {at: editor.selection, url})

  Transforms.collapse(editor, {edge: 'end'})
}
