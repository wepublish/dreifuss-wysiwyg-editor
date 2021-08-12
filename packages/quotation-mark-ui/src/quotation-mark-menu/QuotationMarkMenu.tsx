import React, {useEffect, useState} from 'react'
import {BaseRange} from 'slate'
import {useEventEditorId, useStoreEditorState} from '@udecode/plate-core'
import {insertQuotationMarks, ELEMENT_QUOTATION_MARK} from '@dreifuss-wysiwyg-editor/quotation-mark'
import {Modal, SubMenuIcon} from '@dreifuss-wysiwyg-editor/common'
import './style.css'

export function QuotationMarksMenu(props: any) {
  const editor = useStoreEditorState(useEventEditorId('focus'))
  if (!editor) return

  const [selection, setSelection] = useState<BaseRange | null>(null)
  let selectedQuotationMarks = ''

  useEffect(() => {
    if (!editor) return

    setSelection(editor?.selection)
  }, [editor?.selection])

  return (
    <Modal icon={<SubMenuIcon type={ELEMENT_QUOTATION_MARK} icon={props?.icon || '«»'} />}>
      <div className="quotation-mark-menu">
        <button
          // TODO: make this in one function
          onClick={e => {
            e.preventDefault()
            selectedQuotationMarks = '«»'
            insertQuotationMarks(editor, selection, selectedQuotationMarks)
          }}
          className="button">
          {'« »'}
        </button>

        <button
          onClick={e => {
            e.preventDefault()
            selectedQuotationMarks = '‹›'
            insertQuotationMarks(editor, selection, selectedQuotationMarks)
          }}
          className="button">
          {'‹ ›'}
        </button>

        <button
          onClick={e => {
            e.preventDefault()
            selectedQuotationMarks = '’’'
            insertQuotationMarks(editor, selection, selectedQuotationMarks)
          }}
          className="button">
          {'’ ’'}
        </button>

        <button
          onClick={e => {
            e.preventDefault()
            selectedQuotationMarks = '""'
            insertQuotationMarks(editor, selection, selectedQuotationMarks)
          }}
          className="button">
          {'" "'}
        </button>
      </div>
    </Modal>
  )
}
