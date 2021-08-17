import {ELEMENT_LINK} from '../defaults'
import {
  verifyHotkey,
  getPluginHotkey,
  getClipboardText,
  TEditor
} from '@dreifuss-wysiwyg-editor/common'
import {upsertLinkAtSelection} from '../transforms'
import {validateUrl} from '../utils'

export const onKeyDown =
  (editor: TEditor): any =>
  async (event: any) => {
    // event.preventDefault()

    if (!event.ctrlKey) return

    const hotKey = getPluginHotkey(editor, ELEMENT_LINK)

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
