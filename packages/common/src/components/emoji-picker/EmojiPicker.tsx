import React, {useContext} from 'react'
import './emojiPicker.css'
import {Picker, BaseEmoji} from 'emoji-mart'
import {useEventEditorId, useStoreEditorRef} from '@udecode/plate-core'
import {ModalContext} from '../modal'

interface EmojiPickerProps {
  setEmoji?: (emoji: string) => void
}

export function EmojiPicker({setEmoji}: EmojiPickerProps) {
  const editor = useStoreEditorRef(useEventEditorId('focus'))
  const {toggleMenu} = useContext(ModalContext)

  return (
    <Picker
      onSelect={({native: emoji}: BaseEmoji) => {
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
