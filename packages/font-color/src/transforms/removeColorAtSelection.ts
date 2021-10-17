import {TEditor} from '@udecode/plate-core'
import {toggleMark} from '@udecode/plate-common'

export function removeFontColor(editor: TEditor) {
  if (!editor.selection) return null

  toggleMark(editor, 'color')
}
