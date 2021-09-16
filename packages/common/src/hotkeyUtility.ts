import isHotkey from 'is-hotkey'
import {SPEditor} from '@udecode/plate-core'

export function verifyHotkey(e: any, keys: string | string[]) {
  return isHotkey(keys, e)
}

export function getPluginHotkey(editor: SPEditor, pluginKey: string) {
  return editor.options?.[pluginKey]?.hotkey
}
