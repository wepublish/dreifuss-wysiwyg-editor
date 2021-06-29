import React, {useEffect, useState} from 'react'
import {TEditor, useEventEditorId, useStoreEditorState} from '@udecode/slate-plugins-core'
import {BaseEditor, BaseRange, Range, Editor, Transforms, BaseElement} from 'slate'
// import './link.css'

function removeLink(editor: TEditor) {
  Transforms.unwrapNodes(editor, {
    match: node => node.type === 'link'
  })
}

export function RemoveLinkFormatButton() {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  return (
    <button
      // active={WepublishEditor.isFormatActive(editor, InlineFormat.Link)}
      // disabled={!WepublishEditor.isFormatActive(editor, InlineFormat.Link)}
      onMouseDown={e => {
        if (!editor) return
        e.preventDefault()

        removeLink(editor)
      }}>
      Remove
    </button>
  )
}

async function validateURL(url: string) {
  if (url) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    )
    return pattern.test(url)
  }
  return false
}

function insertLink(editor: BaseEditor, selection: BaseRange | null, url: string, title?: string) {
  if (selection) {
    if (Range.isCollapsed(selection)) {
      const nodes = Array.from(
        Editor.nodes(editor, {
          at: selection,
          match: node => node.type === 'link'
        })
      )
      const tuple = nodes[0]

      if (tuple) {
        const [, path] = tuple
        Transforms.select(editor, path)
      } else {
        Transforms.insertText(editor, title ?? '')
        Transforms.select(editor, {
          anchor: {
            path: selection.anchor.path,
            offset: selection.anchor.offset + (title?.length ?? 0)
          },
          focus: {path: selection.focus.path, offset: selection.focus.offset}
        })
      }
    } else {
      Transforms.select(editor, selection)
    }
  }

  Transforms.unwrapNodes(editor, {
    match: node => node.type === 'link'
  })
  Transforms.wrapNodes(editor, {type: 'link', url, title, children: []} as BaseElement, {
    split: true
  })
  Transforms.collapse(editor, {edge: 'end'})
}

export const LinkToolbar = () => {
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
    validateURL(url).then(value => setIsValidURL(value))

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
  }, [url])

  useEffect(() => {
    if (!editor) return
    setSelection(editor?.selection)

    const nodes = Array.from(
      Editor.nodes(editor, {
        at: editor?.selection ?? undefined,
        match: node => node.type === 'link'
      })
    )
    const tuple = nodes[0]
    if (tuple) {
      const [node] = tuple
      setTitle((node.title as string) ?? '')

      const nodeUrl = node.url as string
      if (
        !nodeUrl.startsWith(prefixType.https) ||
        !nodeUrl.startsWith(prefixType.http) ||
        !nodeUrl.startsWith(prefixType.mailto)
      ) {
        setPrefix(prefixType.other)
      }
      setURL((nodeUrl as string) ?? '')
    } else if (editor.selection) {
      const text = Editor.string(editor, editor.selection)
      setTitle(text ?? '')
    }
  }, [])

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

            insertLink(
              editor,
              selection,
              prefix !== prefixType.other ? prefix + url : url,
              title || undefined
            )
          }}>
          Insert
        </button>
        <RemoveLinkFormatButton />
      </div>
    </form>
  )
}
