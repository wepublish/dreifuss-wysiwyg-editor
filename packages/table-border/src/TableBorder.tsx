import React, {useState, useEffect} from 'react'
import {useEventEditorId, useStoreEditorRef} from '@udecode/slate-plugins-core'
import {Editor, Node, Transforms} from 'slate'

export enum TableElementFormat {
  Table = 'table',
  TableRow = 'table-row',
  TableCell = 'table-cell'
}

type TableNode = Node & {
  borderColor?: string
  type: string
}

export function TableCellBorderColorPicker() {
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  const [borderColor, setBorderColor] = useState<string>()

  useEffect(() => {
    if (!editor) return

    const nodes = Editor.nodes(editor, {
      match: (node: TableNode) => node.type === 'table-cell'
    })
    for (const [node] of nodes) {
      // @ts-ignore
      setBorderColor(node.borderColor as string)
      return
    }
  }, [editor?.selection])

  useEffect(() => {
    if (!editor) return

    if (borderColor) {
      const nodes = Editor.nodes(editor, {
        match: (node: TableNode) => node.type === TableElementFormat.Table
      })
      for (const [, path] of nodes) {
        Transforms.setNodes(
          editor,
          // @ts-ignore
          {borderColor: borderColor ?? '#000'},
          {
            at: path,
            // @ts-ignore
            match: node => node.type === TableElementFormat.TableCell
          }
        )
        return
      }
    }
  }, [borderColor])

  return (
    <input
      type="color"
      name="borderColor"
      style={{cursor: 'pointer'}}
      onChange={e => setBorderColor(e.target.value)}
    />
  )
}
