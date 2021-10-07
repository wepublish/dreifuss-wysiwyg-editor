import * as React from 'react'
import {KEYS_ALIGN, upsertAlign} from '@dreifuss-wysiwyg-editor/alignment'
import {getPreventDefaultHandler, someNode} from '@udecode/plate-common'
import {useEventEditorId, useStoreEditorState} from '@udecode/plate-core'
import {ToolbarButton, ToolbarButtonProps} from '@udecode/plate-toolbar'

export interface ToolbarAlignProps extends ToolbarButtonProps {
  type?: string
  unwrapTypes?: string[]
}

export const ToolbarAlign = ({type, unwrapTypes = KEYS_ALIGN, ...props}: ToolbarAlignProps) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  return (
    <ToolbarButton
      active={!!editor?.selection && !!type && someNode(editor, {match: {type}})}
      onMouseDown={
        editor
          ? getPreventDefaultHandler(upsertAlign, editor, {
              type,
              unwrapTypes
            })
          : undefined
      }
      {...props}
    />
  )
}
