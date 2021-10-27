import React, {useContext, useEffect, useRef, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {BaseSelection, Transforms} from 'slate'
import {insertImage, checkImageUrl} from '@dreifuss-wysiwyg-editor/image'
import {ModalContext, Spinner} from '@dreifuss-wysiwyg-editor/common'
import {useEventEditorId, useStoreEditorRef, useStoreEditorSelection} from '@udecode/plate-core'

import './image-toolbar.css'

export const ToolbarImage = ({CustomComponent, editorRef: passedEditor}: any) => {
  const editor = useStoreEditorRef(useEventEditorId('focus'))
  const selection = useStoreEditorSelection(useEventEditorId('focus'))

  const latestSelection = useRef<BaseSelection>()

  const {toggleMenu} = useContext(ModalContext)

  const [url, setURL] = useState('')

  const [isValidURL, setIsValidURL] = useState(false)

  const [isCheckingURL, setIsCheckingURL] = useState(false)

  useEffect(() => {
    if (passedEditor !== editor) {
      if (latestSelection.current) {
        Transforms.select(passedEditor, latestSelection.current)
      }
      ReactEditor.focus(passedEditor)
    }
  }, [passedEditor, editor])

  useEffect(() => {
    if (url) {
      setIsCheckingURL(true)
      checkImageUrl(url)
        .then(isValidImg => {
          setIsValidURL(isValidImg)
          setIsCheckingURL(false)
        })
        .catch(() => {
          setIsValidURL(false)
          setIsCheckingURL(false)
        })
    }
  }, [url])

  useEffect(() => {
    if (selection) {
      latestSelection.current = selection
    }
  }, [selection])

  if (CustomComponent)
    return (
      <CustomComponent
        url={url}
        isValidURL={isValidURL}
        onChange={(newUrl: string) => setURL(newUrl)}
        onSubmit={() => {
          if (!editor) return

          if (latestSelection.current) {
            Transforms.select(editor, latestSelection.current)
          }
          ReactEditor.focus(editor)

          insertImage(editor, url)
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
          <div>{isCheckingURL && <Spinner />}</div>
        </div>
        <p className="invalid-value-tooltip">
          {url && !isValidURL && !isCheckingURL ? 'Invalid Link' : undefined}
        </p>
      </div>
      <div className="toolbar" role="toolbar">
        <button
          className={`${url && isValidURL ? 'insert' : 'disabled'}`}
          onClick={async e => {
            e.preventDefault()
            if (!editor || !isValidURL) return

            if (latestSelection.current) {
              Transforms.select(editor, latestSelection.current)
            }
            ReactEditor.focus(editor)

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
  isValidURL?: boolean
  url: string
  onSubmit: React.Dispatch<React.SetStateAction<any>>
}
