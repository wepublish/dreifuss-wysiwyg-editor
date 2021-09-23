import React, {useContext, useEffect, useState} from 'react'
import {BaseRange} from 'slate'
import {useEventEditorId, useStoreEditorState} from '@udecode/plate-core'
import {ModalContext} from '@dreifuss-wysiwyg-editor/common'
import {insertMediaEmbed} from '@udecode/plate-media-embed'
import {MediaEmbedUrlInput} from '../MediaEmbedElement'
import './media-embed-toolbar.css'

const transformUrl = (newUrl: string) => {
  // if not starting with http, assume pasting of full iframe embed code
  if (newUrl.substring(0, 4) !== 'http') {
    const regexMatchSrc = /src=".*?"/
    const regexGroupQuotes = /"([^"]*)"/

    const src = newUrl.match(regexMatchSrc)?.[0]
    const returnString = src?.match(regexGroupQuotes)?.[1]

    if (returnString) {
      newUrl = returnString
    }
  }
  return newUrl
}

export const MediaEmbedToolbar = () => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const [selection, setSelection] = useState<BaseRange>()

  const [url, setURL] = useState('')

  const {toggleMenu} = useContext(ModalContext)

  useEffect(() => {
    if (editor?.selection) {
      setSelection(editor.selection)
    }
  }, [editor])

  return (
    <form className="media-embed-toolbar">
      <div className="form-group">
        <label>Media Embed</label>
        <div className="input-group">
          <MediaEmbedUrlInput
            onChange={(newUrl: string) => setURL(transformUrl(newUrl))}
            url={url}
          />
        </div>
        {/* <p>{url && !isValidURL ? 'Invalid Link' : undefined}</p> */}
      </div>
      <div className="toolbar" role="toolbar">
        <button
          className={`${!url ? 'disabled' : 'insert'}`}
          disabled={!url}
          onClick={e => {
            if (!editor || !selection) return
            e.preventDefault()

            insertMediaEmbed({...editor, selection}, {url})

            toggleMenu()
          }}>
          Insert
        </button>
        <button
          className={`${url ? 'cancel' : 'disabled'}`}
          onClick={e => {
            e.preventDefault()

            toggleMenu()
          }}>
          Remove
        </button>
      </div>
    </form>
  )
}

export default MediaEmbedToolbar
