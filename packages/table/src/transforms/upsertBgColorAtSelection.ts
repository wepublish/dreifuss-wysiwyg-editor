import {Editor, Element} from 'slate'
import {getSlatePluginType} from '@udecode/plate-core'
import {setNodes} from '@udecode/plate-common'
import {TEditor} from '@dreifuss-wysiwyg-editor/common'
import {ELEMENT_TABLE, ELEMENT_TD} from '../defaults'

export function upsertBgColor(editor: TEditor, backgroundColor: string) {
  if (!editor?.selection || !backgroundColor) return

  const tdType = getSlatePluginType(editor, ELEMENT_TD)
  const tableType = getSlatePluginType(editor, ELEMENT_TABLE)

  const nodes = Editor.nodes(editor, {
    // @ts-ignore
    match: node => Element.isElement(node) && node.type === tableType
  })
  for (const [, path] of nodes) {
    setNodes(
      editor,
      {
        backgroundColor
      },
      {
        at: path,
        match: node => node.type === tdType
      }
    )
    return
  }
}
