import {insertNodes, someNode} from '@udecode/plate-common'
import {getSlatePluginType, SPEditor, TElement} from '@udecode/plate-core'
import {ELEMENT_TABLE} from '../defaults'
import {TablePluginOptions} from '../types'
import {getEmptyTableNode} from '../utils/getEmptyTableNode'

export const insertTable = (editor: SPEditor, {header}: TablePluginOptions) => {
  if (
    !someNode(editor, {
      match: {type: getSlatePluginType(editor, ELEMENT_TABLE)}
    })
  ) {
    insertNodes<TElement>(editor, getEmptyTableNode(editor, {header}))
  }
}
