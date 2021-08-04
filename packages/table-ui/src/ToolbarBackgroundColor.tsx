import React, {useEffect, useRef, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {HistoryEditor} from 'slate-history'
import {Editor, Element, BaseEditor} from 'slate'
import {
  getSlatePluginType,
  useEventEditorId,
  useStoreEditorState
} from '@udecode/slate-plugins-core'
import {BackgroundColor} from '@dreifuss-wysiwyg-editor/common'
import {ELEMENT_TD, upsertBgColor} from '@dreifuss-wysiwyg-editor/table'

type CustomElement = {
  type: 'td'
  title: string
  borderColor?: string
  backgroundColor?: string
  children: CustomText[]
}
type CustomText = {title: string; text: string}
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

interface ToolbarBackgroundColorProps {
  icon?: any
}

const DEFAULT_TD_BG_COLOR = '#fff'

export const TableBgColorToolbar = (props: ToolbarBackgroundColorProps) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const [bgColor, setBgColor] = useState<string>(DEFAULT_TD_BG_COLOR)

  const textInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editor?.selection) return
    const nodes: Array<any> | null = Array.from(
      Editor.nodes(editor, {
        at: editor.selection,
        match: node =>
          Element.isElement(node) && node.type === getSlatePluginType(editor, ELEMENT_TD)
      })
    )
    if (nodes?.length) {
      setBgColor(nodes[0][0].backgroundColor || DEFAULT_TD_BG_COLOR)
    }
  }, [editor?.selection])

  return (
    <div onClick={() => textInput.current?.click()}>
      {props.icon ?? <BackgroundColor />}
      <input
        type="color"
        ref={textInput}
        value={bgColor}
        onChange={e => {
          if (!editor) return

          const color = e.target.value
          if (color) setBgColor(color)

          upsertBgColor(editor, color)
        }}
        style={{
          width: 0,
          visibility: 'hidden'
        }}
      />
    </div>
  )
}
