import React, {useEffect, useRef, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {HistoryEditor} from 'slate-history'
import {Editor, BaseEditor} from 'slate'
import {useEventEditorId, useStoreEditorState} from '@udecode/plate-core'
import {FontColor} from '@dreifuss-wysiwyg-editor/common'
import {upsertFontColor} from '@dreifuss-wysiwyg-editor/font-color'

type CustomElement = {type: 'link'; title: string; color?: string; children: CustomText[]}
type CustomText = {title: string; text: string}
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

interface FontColorToolbarProps {
  icon?: any
}

export const FontColorToolbar = (props: FontColorToolbarProps) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const [color, setColor] = useState<string>('#fff')

  const [isSelectingColoredNode, setSelectingColoredNode] = useState<boolean>(false)

  const textInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editor?.selection) return

    const nodes: Array<any> | null = Array.from(
      Editor.nodes(editor, {
        at: editor.selection,
        // @ts-ignore
        match: node => !!node.color
      })
    )

    if (nodes?.length) {
      setColor(nodes[0][0].color)
      setSelectingColoredNode(true)
    } else {
      setSelectingColoredNode(false)
    }
  }, [editor?.selection])

  return (
    <div onClick={() => textInput.current?.click()}>
      {props?.icon || <FontColor active={!!isSelectingColoredNode} />}
      <input
        type="color"
        ref={textInput}
        value={color}
        onChange={e => {
          if (!editor) return

          const color = e.target.value
          if (color) setColor(color)

          upsertFontColor(editor, color)
        }}
        style={{
          width: 0,
          visibility: 'hidden'
        }}
      />
    </div>
  )
}
