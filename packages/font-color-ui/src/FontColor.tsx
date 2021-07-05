import React, {useEffect, useRef, useState} from 'react'
import {useEventEditorId, useStoreEditorState} from '@udecode/slate-plugins-core'
import {Editor, Transforms} from 'slate'
// import './font-color.css'

function changeColor(editor: Editor, color?: string) {
  if (color) {
    Transforms.setNodes(
      editor,
      // @ts-ignore
      {color},
      {
        match: () => true,
        split: true
      }
    )
  }
}

export const FontColorToolbar = () => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const [color, setColor] = useState<string>()

  const textInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const nodes: Array<any> | null = Array.from(
      // @ts-ignore
      Editor.nodes(editor, {
        // @ts-ignore
        at: editor.selection ?? undefined,
        // @ts-ignore
        match: node => !!node.color
      })
    )
    if (nodes?.length) {
      setColor(nodes[0][0].color)
    }
  }, [])

  useEffect(() => {
    textInput.current?.click()
  }, [color])

  return (
    <input
      type="color"
      ref={textInput}
      value={color}
      onChange={e => {
        if (!editor) return

        const color = e.target.value
        if (color) setColor(color)

        changeColor(editor, color)
      }}
      style={{
        width: 0,
        visibility: 'hidden'
      }}
    />
  )
}
