import React from 'react'
import {Node} from 'slate'
import {toArray} from 'lodash'
import {useEventEditorId, useStoreEditorState} from '@udecode/slate-plugins-core'
import {TEditor} from '@dreifuss-wysiwyg-editor/common'

const getTextString = (editor: TEditor) => {
  // get all text nodes and append them to each other in one string
  return [...Node.texts(editor)].reduce((string, nodePair, index) => {
    const [textNode] = nodePair
    if (index === 0) return `${textNode.text}`
    return `${string} ${textNode.text}`
  }, '')
}

const calculateCharCount = (editor?: TEditor) => {
  if (!editor) return 0
  // using lodash toArray to get correct length for characters like emojis
  return toArray(getTextString(editor)).length
}

export function getCharacterCount(): number {
  const editor = useStoreEditorState(useEventEditorId('focus'))
  return calculateCharCount(editor)
}

export const CharCountToolbar = () => {
  const charCount = getCharacterCount()

  return <span>{charCount}</span>
}
