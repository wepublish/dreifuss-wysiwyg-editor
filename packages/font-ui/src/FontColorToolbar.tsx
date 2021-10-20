import React, {useContext, useEffect, useRef, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {HistoryEditor} from 'slate-history'
import {BaseEditor, BaseSelection, Transforms} from 'slate'
import {
  getPlatePluginType,
  useEventEditorId,
  useStoreEditorRef,
  useStoreEditorSelection,
  useStoreEditorState
} from '@udecode/plate-core'
import {ModalContext} from '@dreifuss-wysiwyg-editor/common'
import {DEFAULT_FONT_COLOR} from '@dreifuss-wysiwyg-editor/font'
import {getMark, setMarks, removeMark} from '@udecode/plate-common'

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

export const FontColorToolbar = ({type: pluginKey}: {type?: string}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))
  const editorRef = useStoreEditorRef(useEventEditorId('focus'))
  const selection = useStoreEditorSelection(useEventEditorId('focus'))

  const latestSelection = useRef<BaseSelection>()

  const type = getPlatePluginType(editor, pluginKey)

  const {toggleMenu} = useContext(ModalContext)

  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_FONT_COLOR)

  const color = editorRef && getMark(editorRef, type)

  useEffect(() => {
    if (selection && color !== DEFAULT_FONT_COLOR) {
      latestSelection.current = selection
      setSelectedColor(color)
    }
  }, [color, selection])

  return (
    <form className="font-color-toolbar">
      <div className="form-group">
        <div className="input-group">
          <label>Selected color</label>
          <input
            type="color"
            value={selectedColor}
            onChange={e => {
              e.preventDefault()

              const newColor = e.target.value
              if (editorRef && editor && latestSelection.current) {
                Transforms.select(editorRef, latestSelection.current)
                ReactEditor.focus(editorRef)

                if (selectedColor) {
                  setMarks(editor, {[type]: newColor})
                  setSelectedColor(newColor)
                }
              }
            }}
          />
        </div>
      </div>
      <div className="toolbar" role="toolbar">
        <button
          className={`${color && color !== DEFAULT_FONT_COLOR ? 'remove' : 'disabled'}`}
          onClick={e => {
            if (!editor) return

            removeMark(editor, {key: type})
            toggleMenu()
          }}>
          Remove
        </button>
      </div>
    </form>
  )
}
