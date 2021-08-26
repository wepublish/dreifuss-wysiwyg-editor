import {ELEMENT_LINK} from '../defaults'
import {verifyHotkey, getPluginHotkey, getClipboardText} from '@dreifuss-wysiwyg-editor/common'
import {upsertLinkAtSelection} from '../transforms'
import {validateUrl} from '../utils'

export const onKeyDown =
  (editor: any): any =>
  async (event: any) => {
    if (!event.ctrlKey || !editor) return

    const hotKey = getPluginHotkey(editor, ELEMENT_LINK)

    if (!hotKey) return

    if (verifyHotkey(event, hotKey)) {
      const url = await getClipboardText()

      if (!url) return

      validateUrl(url).then((isValid: boolean) => {
        if (isValid) {
          upsertLinkAtSelection(editor, {
            url,
            selection: editor.selection
          })
        }
      })
    }
  }
