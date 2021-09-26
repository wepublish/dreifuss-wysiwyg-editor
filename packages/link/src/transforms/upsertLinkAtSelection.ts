import {insertNodes, isCollapsed, unwrapNodes} from '@udecode/plate-common'
import {getPlatePluginType, SPEditor, TElement} from '@udecode/plate-core'
import {Editor, Transforms} from 'slate'
import {ELEMENT_LINK} from '../defaults'
import {wrapLink} from './wrapLink'

/**
 * Unwrap link at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the link at the location.
 */
export const upsertLinkAtSelection = (
  editor: SPEditor,
  {
    url,
    wrap,
    selection
  }: {
    url: string
    /**
     * If true, wrap the link at the location (default: selection) even if the selection is collapsed.
     */
    wrap?: boolean
    selection?: any
  }
) => {
  if (!selection) return

  const type = getPlatePluginType(editor, ELEMENT_LINK)

  if (!wrap && isCollapsed(selection)) {
    return insertNodes<TElement>(editor, {
      type,
      url,
      children: [{text: url}]
    })
  }

  // if our cursor is inside an existing link, but don't have the text selected, select it now
  if (wrap && isCollapsed(selection)) {
    const linkLeaf = Editor.leaf(editor, selection)
    const [, inlinePath] = linkLeaf
    Transforms.select(editor, inlinePath)
  }

  unwrapNodes(editor, {at: selection, match: {type}})

  wrapLink(editor, {at: selection, url})

  Transforms.collapse(editor, {edge: 'end'})
}

export function removeLink(editor: SPEditor) {
  if (!editor.selection) return null
  const type = getPlatePluginType(editor, ELEMENT_LINK)

  unwrapNodes(editor, {
    at: editor.selection,
    match: {type}
  })
}
