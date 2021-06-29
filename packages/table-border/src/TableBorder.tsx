import React, {useState, useEffect} from 'react'
import {useEventEditorId, useStoreEditorRef} from '@udecode/slate-plugins-core'
import {Editor, Transforms} from 'slate'

export enum TableElementFormat {
  Table = 'table',
  TableRow = 'table-row',
  TableCell = 'table-cell'
}

export function TableColorPicker() {
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  const [borderColor, setBorderColor] = useState<string>()

  useEffect(() => {
    if (!editor) return

    const nodes = Editor.nodes(editor, {
      match: node => node.type === 'table-cell'
    })
    for (const [node] of nodes) {
      setBorderColor(node.borderColor as string)
      return
    }
  }, [editor?.selection])

  useEffect(() => {
    if (!editor) return

    if (borderColor) {
      const nodes = Editor.nodes(editor, {
        match: node => node.type === TableElementFormat.Table
      })
      for (const [, path] of nodes) {
        Transforms.setNodes(
          editor,
          {borderColor: borderColor ?? '#000'},
          {
            at: path,
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
