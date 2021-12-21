import React, {useEffect} from 'react'
import {Node} from 'slate'
import {toArray} from 'lodash'
import {useStoreEditorState} from '@udecode/plate-core'
import {TEditor} from '@dreifuss-wysiwyg-editor/common'

const getTextString = (editor: TEditor) => {
  // get all text nodes and append them to each other in one string
  return [...Node.texts(editor)].reduce((string, nodePair) => {
    const [textNode] = nodePair
    if (string.endsWith(' ') || textNode.text.startsWith(' ')) {
      return `${string}${textNode.text}`
    } else if (string === '') {
      return `${textNode.text}`
    } else {
      return `${string} ${textNode.text}`
    }
  }, '')
}

const calculateCharCount = (editor?: TEditor) => {
  if (!editor) return 0
  // using lodash toArray to get correct length for characters like emojis
  return toArray(getTextString(editor)).length
}

export const CharCountToolbar = ({id, getCharsCount}: {id: string; getCharsCount: any}) => {
  const editor = useStoreEditorState(id)

  const charCount = calculateCharCount(editor)

  useEffect(() => {
    if (getCharsCount) getCharsCount(charCount)
  }, [charCount])

  return <span>{charCount}</span>
}
