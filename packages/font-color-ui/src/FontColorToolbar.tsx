import React, {useContext, useEffect, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {HistoryEditor} from 'slate-history'
import {Editor, BaseEditor, Text} from 'slate'
import {useEventEditorId, useStoreEditorState} from '@udecode/plate-core'
import {ModalContext} from '@dreifuss-wysiwyg-editor/common'
import {upsertFontColor, removeFontColor} from '@dreifuss-wysiwyg-editor/font-color'
import './font-color.css'

type CustomElement = {type: 'paragraph'; children: CustomText[]}
type CustomText = {text: string; color?: string}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

const DEFAULT_FONT_COLOR = '#000'

export const FontColorToolbar = () => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const {toggleMenu} = useContext(ModalContext)

  const [color, setColor] = useState<string>(DEFAULT_FONT_COLOR)

  useEffect(() => {
    if (!editor?.selection) return

    const nodes: Array<any> | null = Array.from(
      Editor.nodes(editor, {
        at: editor.selection,
        match: node => Text.isText(node) && !!node.color
      })
    )

    if (nodes?.length) {
      setColor(nodes[0][0].color)
    }
  }, [editor?.selection])

  return (
    <form className="font-color-toolbar">
      <div className="form-group">
        <div className="input-group">
          <label>Selected font color</label>
          <input
            type="color"
            value={color}
            onChange={e => {
              e.preventDefault()
              if (!editor?.selection) return

              const color = e.target.value
              if (color) {
                upsertFontColor(editor, color)
                setColor(color)
              }

              toggleMenu()
            }}
          />
        </div>
      </div>
      <div className="toolbar" role="toolbar">
        <button
          className={`${color && color !== DEFAULT_FONT_COLOR ? 'remove' : 'disabled'}`}
          onClick={e => {
            e.preventDefault()
            if (!editor) return

            removeFontColor(editor)
            setColor(DEFAULT_FONT_COLOR)

            toggleMenu()
          }}>
          Remove
        </button>
      </div>
    </form>
  )
}
