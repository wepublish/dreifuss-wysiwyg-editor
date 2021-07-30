import React, {useEffect, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {HistoryEditor} from 'slate-history'
import {Editor, BaseEditor} from 'slate'
import {useEventEditorId, useStoreEditorState} from '@udecode/slate-plugins-core'
import {FontColor, ColorPicker} from '@dreifuss-wysiwyg-editor/common'
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

  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false)

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
    <div onClick={() => setIsPickerOpen(!isPickerOpen)}>
      {/* TODO: enhance it for props.icon */}
      {props?.icon || <FontColor active={!!isSelectingColoredNode} />}
      <ColorPicker
        color={color}
        style={
          !isPickerOpen
            ? {
                width: 0,
                height: 0,
                visibility: 'hidden'
              }
            : {position: 'absolute', zIndex: '9999'}
        }
        onChange={(e: any) => {
          if (!editor) return

          const color = e.hex
          if (color) setColor(color)

          upsertFontColor(editor, color)
        }}
      />
    </div>
  )
}
