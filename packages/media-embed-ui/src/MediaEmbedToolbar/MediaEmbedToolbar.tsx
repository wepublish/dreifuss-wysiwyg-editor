import React, {useContext, useEffect, useRef, useState} from 'react'
import {ReactEditor} from 'slate-react'
import {BaseSelection, Transforms} from 'slate'
import {useEventEditorId, useStoreEditorRef, useStoreEditorSelection} from '@udecode/plate-core'
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
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  const selection = useStoreEditorSelection(useEventEditorId('focus'))
  const latestSelection = useRef<BaseSelection>()

  const [url, setURL] = useState('')

  const {toggleMenu} = useContext(ModalContext)

  useEffect(() => {
    if (selection) {
      latestSelection.current = selection
    }
  }, [selection])

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
      </div>
      <div className="toolbar" role="toolbar">
        <button
          className={`${!url ? 'disabled' : 'insert'}`}
          disabled={!url}
          onClick={e => {
            e.preventDefault()
            if (!editor) return

            if (latestSelection.current) {
              Transforms.select(editor, latestSelection.current)
            }
            ReactEditor.focus(editor)

            insertMediaEmbed(editor, {url})

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
