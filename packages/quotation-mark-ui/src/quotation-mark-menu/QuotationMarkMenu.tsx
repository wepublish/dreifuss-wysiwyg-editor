import React, {useContext, useEffect, useState} from 'react'
import {BaseRange} from 'slate'
import {useEventEditorId, useStoreEditorState} from '@udecode/plate-core'
import {insertQuotationMarks} from '@dreifuss-wysiwyg-editor/quotation-mark'
import {ModalContext} from '@dreifuss-wysiwyg-editor/common'
import './style.css'

export function QuotationMarksMenu() {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const {toggleMenu} = useContext(ModalContext)

  const [selection, setSelection] = useState<BaseRange | null>(null)

  useEffect(() => {
    if (!editor) return

    setSelection(editor.selection)
  }, [editor?.selection])

  function handleSelectingQuotationMark(e: any, mark: string) {
    e.preventDefault()
    if (!editor) return

    insertQuotationMarks(editor, selection, mark)

    toggleMenu()
  }

  return (
    <div className="quotation-mark-menu">
      <button onClick={e => handleSelectingQuotationMark(e, '«»')} className="button">
        {'« »'}
      </button>

      <button onClick={e => handleSelectingQuotationMark(e, '‹›')} className="button">
        {'‹ ›'}
      </button>

      <button onClick={e => handleSelectingQuotationMark(e, '’’')} className="button">
        {'’ ’'}
      </button>

      <button onClick={e => handleSelectingQuotationMark(e, '""')} className="button">
        {'" "'}
      </button>
    </div>
  )
}
