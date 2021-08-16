import * as React from 'react'
import {
  getSlatePluginType,
  useEventEditorId,
  useStoreEditorState
} from '@udecode/slate-plugins-core'
import {ToolbarButtonProps, ToolbarElement} from '@udecode/slate-plugins-toolbar'

export const SubMenuIcon = (props: ToolbarButtonProps & {type: string}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  return (
    <ToolbarElement
      {...props}
      onMouseDown={e => e.preventDefault()}
      type={getSlatePluginType(editor, props.type)}
    />
  )
}
