import React, {useContext, useEffect, useRef, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {BaseSelection, Transforms} from 'slate'
import {insertImage, checkImage} from '@dreifuss-wysiwyg-editor/image'
import {ModalContext} from '@dreifuss-wysiwyg-editor/common'
import {useEventEditorId, useStoreEditorRef, useStoreEditorSelection} from '@udecode/plate-core'

import './image-toolbar.css'

export const ToolbarImage = ({CustomComponent, editorRef: passedEditor}: any) => {
  const editor = useStoreEditorRef(useEventEditorId('focus'))
  const selection = useStoreEditorSelection(useEventEditorId('focus'))

  const latestSelection = useRef<BaseSelection>()

  const {toggleMenu} = useContext(ModalContext)

  enum prefixType {
    http = 'http://',
    https = 'https://'
  }

  const [url, setURL] = useState('')

  const [isValidURL, setIsValidURL] = useState(false)

  const [prefix, setPrefix] = useState<prefixType | string>()

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
      if (url.startsWith(prefixType.https)) {
        setPrefix(prefixType.https)
        setURL(url.replace(prefixType.https, ''))
      } else if (url.startsWith(prefixType.http)) {
        setPrefix(prefixType.http)
        setURL(url.replace(prefixType.http, ''))
      } else {
        setPrefix(prefixType.https)
      }
    }
  }, [url])

  useEffect(() => {
    if (prefix && url) {
      checkImage(prefix + url)
        .then(isImg => setIsValidURL(isImg))
        .catch(() => setIsValidURL(false))
    }
  }, [prefix, url])

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
          if (!editor || !isValidURL) return

          if (latestSelection.current) {
            Transforms.select(editor, latestSelection.current)
          }
          ReactEditor.focus(editor)

          insertImage(editor, prefix + url)
          toggleMenu()
        }}
      />
    )

  return (
    <form className="image-toolbar">
      <div className="form-group">
        <label>Link</label>
        <div className="input-group">
          <select
            style={{
              backgroundColor: 'white',
              border: 'none',
              boxShadow: 'none'
            }}
            value={prefix}
            onChange={e => setPrefix(e.target.value)}>
            <option value={prefixType.http}>{prefixType.http}</option>
            <option value={prefixType.https}>{prefixType.https}</option>
          </select>
          <input name="url" value={url} onChange={e => setURL(e.target.value)} />
        </div>
        <p className="invalid-value-tooltip">{url && !isValidURL ? 'Invalid Link' : undefined}</p>
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

            insertImage(editor, prefix + url)
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
