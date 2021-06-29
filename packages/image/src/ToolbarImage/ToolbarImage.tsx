import * as React from 'react'
import {useEventEditorId, useStoreEditorRef} from '@udecode/slate-plugins-core'
import {insertImage} from '@udecode/slate-plugins-image'
import {ChangeEvent, useState} from 'react'

export const UploadImageMenu = () => {
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  const [url, setURL] = useState('')

  return (
    <form className="link-toolbar">
      <div className="form-group">
        <label>Image URL:</label>
        <div className="input-group">
          <input
            name="imageURL"
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setURL(e.target.value)}
          />
        </div>
      </div>
      <div className="toolbar" role="toolbar">
        <button
          onClick={async event => {
            if (!editor) return
            event.preventDefault()

            insertImage(editor, url)
          }}>
          Insert
        </button>
      </div>
    </form>
  )
}
