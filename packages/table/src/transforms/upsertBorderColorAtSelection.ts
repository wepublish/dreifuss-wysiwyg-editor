import {Editor, Element} from 'slate'
import {getPlatePluginType} from '@udecode/plate-core'
import {setNodes} from '@udecode/plate-common'
import {TEditor} from '@dreifuss-wysiwyg-editor/common'
import {ELEMENT_TABLE, ELEMENT_TD} from '../defaults'

export function upsertBorderColor(editor: TEditor, borderColor: string) {
  if (!editor?.selection || !borderColor) return

  const tdType = getPlatePluginType(editor, ELEMENT_TD)
  const tableType = getPlatePluginType(editor, ELEMENT_TABLE)

  const nodes = Editor.nodes(editor, {
    // @ts-ignore
    match: node => Element.isElement(node) && node.type === tableType
  })
  for (const [, path] of nodes) {
    setNodes(
      editor,
      {
        borderColor
      },
      {
        at: path,
        match: node => node.type === tdType
      }
    )
    return
  }
}
