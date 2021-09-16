import {KeyboardEvent} from 'react'
import {ELEMENT_LINK} from '../defaults'
import {verifyHotkey, getPluginHotkey} from '@dreifuss-wysiwyg-editor/common'
import {upsertLinkAtSelection} from '../transforms'
import {validateUrl} from '../utils'
import {SPEditor} from '@udecode/plate-core'

export const getLinkOnKeyDown = () => (editor: SPEditor) => (event: KeyboardEvent<Element>) => {
  if (!editor) return

  const hotKey = getPluginHotkey(editor, ELEMENT_LINK)

  if (!hotKey) return

  if (verifyHotkey(event, hotKey)) {
    navigator.clipboard
      .readText()
      .then((url: string) => {
        if (!url) return

        validateUrl(url).then((isValid: boolean) => {
          if (isValid) {
            upsertLinkAtSelection(editor, {
              url,
              selection: editor.selection,
              wrap: true
            })
          }
        })
      })
      .catch(err => console.error("can't get clipboard value", err))
  }
}
