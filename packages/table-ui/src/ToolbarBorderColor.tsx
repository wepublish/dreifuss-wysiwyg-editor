import React, {useEffect, useRef, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {HistoryEditor} from 'slate-history'
import {Editor, Element, BaseEditor} from 'slate'
import {useEventEditorId, useStoreEditorState} from '@udecode/slate-plugins-core'
import {BorderColor} from '@dreifuss-wysiwyg-editor/common'
import {upsertBorderColor} from '@dreifuss-wysiwyg-editor/table'

type CustomElement = {type: 'link'; title: string; color?: string; children: CustomText[]}
type CustomText = {title: string; text: string}
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

interface TableBorderColorToolbarProps {
  icon?: any
}

export const TableBorderColorToolbar = (props: TableBorderColorToolbarProps) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const [color, setColor] = useState<string>('#fff')

  const textInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editor) return
    const nodes: Array<any> | null = Array.from(
      Editor.nodes(editor, {
        at: editor.selection ?? undefined,
        match: node => Element.isElement(node) && !!node.color
      })
    )
    if (nodes?.length) {
      setColor(nodes[0][0].color)
    }
  }, [])

  useEffect(() => {
    // textInput.current?.click()
  }, [color])

  return (
    <div onClick={() => textInput.current?.click()}>
      {props.icon ?? <BorderColor />}
      <input
        type="color"
        ref={textInput}
        value={color}
        onChange={e => {
          if (!editor) return

          const color = e.target.value
          if (color) setColor(color)

          upsertBorderColor(editor, color)
        }}
        style={{
          width: 0,
          visibility: 'hidden'
        }}
      />
    </div>
  )
}
