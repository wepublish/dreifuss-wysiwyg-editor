import React from 'react'
// import './emojiPicker.css'
import {Picker, BaseEmoji} from 'emoji-mart'
import {useStoreEditorRef, useEventEditorId} from '@udecode/slate-plugins-core'

export function EmojiPicker() {
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  return <Picker onSelect={({native}: BaseEmoji) => editor?.insertText(native)} />
}
