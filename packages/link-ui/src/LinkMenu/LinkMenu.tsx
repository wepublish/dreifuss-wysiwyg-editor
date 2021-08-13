import React, {useContext, useEffect, useState} from 'react'
import {BaseRange, Editor, Element, BaseEditor} from 'slate'
import {
  getSlatePluginType,
  useEventEditorId,
  useStoreEditorState
} from '@udecode/slate-plugins-core'
import {
  upsertLinkAtSelection,
  validateUrl,
  removeLink,
  ELEMENT_LINK
} from '@dreifuss-wysiwyg-editor/link'
import './link.css'
import {ModalContext} from '@dreifuss-wysiwyg-editor/common'
import {ReactEditor} from 'slate-react'
import {HistoryEditor} from 'slate-history'

type CustomElement = {type: 'link'; title: string; url?: string; children: CustomText[]}
type CustomText = {title: string; url?: string; text: string}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const ToolbarLink = () => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const [selection, setSelection] = useState<BaseRange | null>(null)

  const [title, setTitle] = useState('')
  const [url, setURL] = useState('')

  enum prefixType {
    http = 'http://',
    https = 'https://',
    mailto = 'mailto://',
    other = 'other'
  }

  const [prefix, setPrefix] = useState<prefixType | string>(prefixType.http)

  const [isValidURL, setIsValidURL] = useState(false)

  const [isInsertBtnDisabled, setIsInsertBtnDisabled] = useState(false)

  const {toggleMenu} = useContext(ModalContext)

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
    if (!url || !title || !isValidURL) {
      setIsInsertBtnDisabled(true)
    } else {
      setIsInsertBtnDisabled(false)
    }
  }, [title, url, isValidURL])

  useEffect(() => {
    if (!editor) return

    const nodes = Array.from(
      Editor.nodes(editor, {
        at: editor.selection ?? undefined,
        match: node =>
          Element.isElement(node) && node.type === getSlatePluginType(editor, ELEMENT_LINK)
      })
    )

    const tuple = nodes[0]
    if (tuple) {
      const [node] = tuple
      if (Element.isElement(node)) {
        setTitle((node.title || (node?.children[0]?.text as string)) ?? '')

        const nodeUrl = node.url as string
        if (nodeUrl.startsWith(prefixType.https)) {
          setPrefix(prefixType.https)
        } else if (nodeUrl.startsWith(prefixType.http)) {
          setPrefix(prefixType.http)
        } else if (nodeUrl.startsWith(prefixType.mailto)) {
          setPrefix(prefixType.mailto)
        } else {
          setPrefix(prefixType.other)
        }

        setURL((nodeUrl as string) ?? '')
      }
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
          <input name="url" value={url} onChange={e => setURL(e.target.value)} />
        </div>
        <p>{url && !isValidURL ? 'Invalid Link' : undefined}</p>
      </div>
      <div className="form-group">
        <label>Selected Text</label>
        <div className="input-group">
          <input name="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
      </div>
      <div className="toolbar" role="toolbar">
        <button
          className={`${isInsertBtnDisabled ? 'disabled' : 'insert'}`}
          disabled={isInsertBtnDisabled}
          onClick={e => {
            if (!editor) return
            e.preventDefault()

            upsertLinkAtSelection(editor, {
              url: prefix !== prefixType.other ? prefix + url : url,
              wrap: true,
              selection
            })
            toggleMenu()
          }}>
          Insert
        </button>
        <button
          className={`${url ? 'cancel' : 'disabled'}`}
          onClick={e => {
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
