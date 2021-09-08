import * as React from 'react'
import {useEventEditorId, useStoreEditorRef} from '@udecode/plate-core'
import {insertImage} from '@dreifuss-wysiwyg-editor/image'
import {useContext, useEffect, useState} from 'react'
import {ModalContext} from '@dreifuss-wysiwyg-editor/common'
import {BaseRange} from 'slate'

export const ToolbarImage = ({CustomComponent}: any) => {
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  const {toggleMenu} = useContext(ModalContext)

  const [url, setURL] = useState('')

  const [selection, setSelection] = useState<BaseRange | null>(null)

  useEffect(() => {
    if (editor?.selection) {
      setSelection(editor.selection)
    }
  }, [editor?.selection])

  if (CustomComponent)
    return (
      <CustomComponent
        onChange={(url: string) => {
          setURL(url)
        }}
      />
    )

  return (
    <form className="link-toolbar">
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

            insertImage({...editor, selection}, url)
            toggleMenu()
          }}>
          Insert
        </button>
      </div>
    </form>
  )
}
