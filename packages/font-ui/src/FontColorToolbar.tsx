import React, {useContext, useEffect, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {HistoryEditor} from 'slate-history'
import {Editor, BaseEditor, Text} from 'slate'
import {
  getPlatePluginType,
  useEventEditorId,
  useStoreEditorRef,
  useStoreEditorState
} from '@udecode/plate-core'
import {ModalContext} from '@dreifuss-wysiwyg-editor/common'
import {DEFAULT_FONT_COLOR} from '@dreifuss-wysiwyg-editor/font'
import './font-color.css'
import {getMark, setMarks} from '@udecode/plate-common'

type CustomElement = {type: 'paragraph'; children: CustomText[]}
type CustomText = {text: string; color?: string}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const FontColorToolbar = ({type: pluginKey}: {type?: string}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))
  const editorRef = useStoreEditorRef(useEventEditorId('focus'))

  const type = getPlatePluginType(editor, pluginKey)

  const {toggleMenu} = useContext(ModalContext)

  const [selectedColor, setColor] = useState<string>(DEFAULT_FONT_COLOR)

  const color = editorRef && getMark(editorRef, type)

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
            value={selectedColor}
            onChange={e => {
              e.preventDefault()
              if (!editor?.selection) return

              const newColor = e.target.value
              if (newColor) {
                setMarks(editor, {[type]: newColor})

                setColor(newColor)
              }
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

            setColor(DEFAULT_FONT_COLOR)

            toggleMenu()
          }}>
          Remove
        </button>
      </div>
    </form>
  )
}
