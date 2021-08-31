import {getAbove, someNode} from '@udecode/plate-common'
import {getSlatePluginType, SPEditor} from '@udecode/plate-core'
import {Transforms} from 'slate'
import {ELEMENT_TABLE} from '../defaults'

export const deleteTable = (editor: SPEditor) => {
  if (
    someNode(editor, {
      match: {type: getSlatePluginType(editor, ELEMENT_TABLE)}
    })
  ) {
    const tableItem = getAbove(editor, {
      match: {type: getSlatePluginType(editor, ELEMENT_TABLE)}
    })
    if (tableItem) {
      Transforms.removeNodes(editor, {
        at: tableItem[1]
      })
    }
  }
}
