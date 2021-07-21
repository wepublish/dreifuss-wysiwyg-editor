import {getSlatePluginType} from '@udecode/slate-plugins-core'
import {insertNodes, wrapNodes, setNodes} from '@udecode/slate-plugins-common'
// import {Editor, Transforms} from 'slate'
import {ELEMENT_TD} from '../defaults'

export function upsertBorderColor(editor: any, borderColor: string) {
  if (!editor?.selection || !borderColor) return

  const type = getSlatePluginType(editor, ELEMENT_TD)

  // insertNodes(
  //   editor,
  //   {
  //     type,
  //     borderColor,
  //     children: []
  //   },
  //   {at: editor.selection}
  // )
  setNodes(editor, {
    type,
    borderColor
  })

  // const nodes = Editor.nodes(editor, {
  //   // @ts-ignore
  //   match: (node: TableNode) => node.type === TableElementFormat.Table
  // })
  // for (const [, path] of nodes) {
  //   Transforms.setNodes(
  //     editor,
  //     // @ts-ignore
  //     {borderColor: borderColor ?? '#000'},
  //     {
  //       at: path,
  //       // @ts-ignore
  //       match: node => node.type === TableElementFormat.TableCell
  //     }
  //   )
  //   return
  // }
}
