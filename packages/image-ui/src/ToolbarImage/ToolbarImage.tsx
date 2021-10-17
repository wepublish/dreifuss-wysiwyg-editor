import React, {useContext, useEffect, useRef, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {BaseSelection, Transforms} from 'slate'
import {insertImage} from '@dreifuss-wysiwyg-editor/image'
import {ModalContext} from '@dreifuss-wysiwyg-editor/common'
import {useEventEditorId, useStoreEditorRef, useStoreEditorSelection} from '@udecode/plate-core'

import './image-toolbar.css'

export const ToolbarImage = ({CustomComponent}: any) => {
  const editor = useStoreEditorRef(useEventEditorId('focus'))
  const editorRef = useStoreEditorRef(useEventEditorId('focus'))
  const selection = useStoreEditorSelection(useEventEditorId('focus'))

  const latestSelection = useRef<BaseSelection>()

  const {toggleMenu} = useContext(ModalContext)

  const [url, setURL] = useState('')

  useEffect(() => {
    if (selection) {
      latestSelection.current = selection
    }
  }, [selection])

  if (CustomComponent)
    return (
      <CustomComponent
        onChange={(newUrl: string) => {
          setURL(newUrl)
          if (!editor) return

          Transforms.select(editorRef, latestSelection.current)
          ReactEditor.focus(editorRef)

          insertImage(editor, newUrl)
          toggleMenu()
        }}
      />
    )

  return (
    <form className="image-toolbar">
      <div className="form-group">
        <label>Link</label>
        <div className="input-group">
          <input name="url" value={url} onChange={e => setURL(e.target.value)} />
        </div>
      </div>
      <div className="toolbar" role="toolbar">
        <button
          onClick={async e => {
            e.preventDefault()
            if (!editor) return

            Transforms.select(editorRef, latestSelection.current)
            ReactEditor.focus(editorRef)

            insertImage(editor, url)
            toggleMenu()
          }}>
          Insert
        </button>
      </div>
    </form>
  )
}

export interface CustomImageToolbarProps {
  onChange: React.Dispatch<React.SetStateAction<any>>
}
