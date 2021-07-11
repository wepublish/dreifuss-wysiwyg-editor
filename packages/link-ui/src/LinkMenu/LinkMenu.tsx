import React, {useEffect, useState} from 'react'
import {BaseRange, Editor} from 'slate'
import {useEventEditorId, useStoreEditorState} from '@udecode/slate-plugins-core'
import {
  upsertLinkAtSelection,
  validateUrl,
  removeLink
} from '@dreifuss-wysiwyg-editor/slate-plugins-link'
import './link.css'

export const ToolbarLink = () => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const [title, setTitle] = useState('')
  const [url, setURL] = useState('')

  enum prefixType {
    http = 'http://',
    https = 'https://',
    mailto = 'mailto://',
    other = 'other'
  }

  const [prefix, setPrefix] = useState<prefixType | string>(prefixType.http)

  const [selection, setSelection] = useState<BaseRange | null>(null)

  const [isValidURL, setIsValidURL] = useState(false)
  const isDisabled = !url || !title

  useEffect(() => {
    if (url) {
      validateUrl(url).then((value: boolean) => setIsValidURL(value))

      if (url.startsWith(prefixType.https)) {
        setPrefix(prefixType.https)
        setURL(url.replace(prefixType.https, ''))
      } else if (url.startsWith(prefixType.http)) {
        setPrefix(prefixType.http)
        setURL(url.replace(prefixType.http, ''))
      } else if (url.startsWith(prefixType.mailto)) {
        setPrefix(prefixType.mailto)
        setURL(url.replace(prefixType.mailto, ''))
      }
    }
  }, [url])

  useEffect(() => {
    if (!editor) return
    setSelection(editor?.selection)

    const nodes = Array.from(
      Editor.nodes(editor, {
        at: editor?.selection ?? undefined,
        // @ts-ignore
        match: node => node.type === 'link'
      })
    )

    const tuple = nodes[0]
    if (tuple) {
      const [node] = tuple
      // @ts-ignore
      setTitle((node.title as string) ?? '')
      // @ts-ignore
      const nodeUrl = node.url as string
      if (nodeUrl) {
        if (
          !nodeUrl.startsWith(prefixType.https) ||
          !nodeUrl.startsWith(prefixType.http) ||
          !nodeUrl.startsWith(prefixType.mailto)
        ) {
          setPrefix(prefixType.other)
        }
      }
      setURL((nodeUrl as string) ?? '')
    } else if (editor.selection) {
      const text = Editor.string(editor, editor.selection)
      setTitle(text ?? '')
    }
  }, [selection])

  useEffect(() => {
    if (editor?.selection) {
      setSelection(editor.selection)
    }
  }, [editor?.selection])

  return (
    <form className="link-toolbar">
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
            <option value={prefixType.mailto}>{prefixType.mailto}</option>
            <option value={prefixType.other}>{prefixType.other}</option>
          </select>
          <input name="url" value={url} onChange={(e: any) => setURL(e.target.value)} />
        </div>
        <p>{url && !isValidURL ? 'Invalid Link' : undefined}</p>
      </div>
      <div className="form-group">
        <label>Selected Text</label>
        <div className="input-group">
          <input name="text" value={title} onChange={(e: any) => setTitle(e.target.value)} />
        </div>
      </div>
      <div className="toolbar" role="toolbar">
        <button
          disabled={isDisabled}
          onClick={e => {
            if (!editor) return
            e.preventDefault()

            upsertLinkAtSelection(editor, {
              url: prefix !== prefixType.other ? prefix + url : url,
              wrap: true,
              selection
            })
          }}>
          Insert
        </button>
        <button
          onMouseDown={e => {
            if (!editor) return
            e.preventDefault()

            removeLink(editor)
          }}>
          Remove
        </button>
      </div>
    </form>
  )
}
