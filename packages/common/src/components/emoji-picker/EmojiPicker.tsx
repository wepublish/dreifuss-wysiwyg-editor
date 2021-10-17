import React, {useContext, useEffect, useRef} from 'react'
import {useEventEditorId, useStoreEditorRef, useStoreEditorSelection} from '@udecode/plate-core'
import {ReactEditor} from 'slate-react'
import {BaseRange, Transforms} from 'slate'
import {Picker, BaseEmoji} from 'emoji-mart'

import {ModalContext} from '../modal'
import './emojiPicker.css'

interface EmojiPickerProps {
  setEmoji?: (emoji: string) => void
}

export function EmojiPicker({setEmoji}: EmojiPickerProps) {
  const editor = useStoreEditorRef(useEventEditorId('focus'))
  const {toggleMenu} = useContext(ModalContext)
  const selection = useStoreEditorSelection(useEventEditorId('focus'))

  const latestSelection = useRef<BaseRange>()

  useEffect(() => {
    if (selection) {
      latestSelection.current = selection
    }
  }, [selection])

  return (
    <Picker
      onSelect={({native: emoji}: BaseEmoji) => {
        if (!editor) return

        if (latestSelection.current) {
          Transforms.select(editor, latestSelection.current)
          ReactEditor.focus(editor)
        }

        if (setEmoji) {
          setEmoji(emoji)
        } else if (editor) {
          editor.insertText(emoji)
          toggleMenu()
        }
      }}
    />
  )
}
