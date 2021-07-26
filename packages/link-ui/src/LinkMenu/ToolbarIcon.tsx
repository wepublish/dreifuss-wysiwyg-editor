import * as React from 'react'
import {
  getSlatePluginType,
  useEventEditorId,
  useStoreEditorState
} from '@udecode/slate-plugins-core'
import {ELEMENT_LINK} from '@dreifuss-wysiwyg-editor/link'
import {ToolbarButtonProps, ToolbarElement} from '@udecode/slate-plugins-toolbar'

export const LinkToolbarIcon = (props: ToolbarButtonProps) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  return (
    <ToolbarElement
      type={getSlatePluginType(editor, ELEMENT_LINK)}
      onMouseDown={e => e.preventDefault()}
      {...props}
    />
  )
}
