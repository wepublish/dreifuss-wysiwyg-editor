import isHotkey from 'is-hotkey'
import {TEditor} from './types'

export function verifyHotkey(e: any, keys: string | string[]) {
  return isHotkey(keys, e)
}

export function getPluginHotkey(editor: TEditor, pluginKey: string) {
  return editor?.options?.[pluginKey]?.hotkey
}
