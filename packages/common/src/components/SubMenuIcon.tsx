import * as React from 'react'
import {getPlatePluginType, useEventEditorId, useStoreEditorState} from '@udecode/plate-core'
import {ToolbarButtonProps, ToolbarElement} from '@udecode/plate-toolbar'

export const SubMenuIcon = (props: ToolbarButtonProps & {type: string}) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  return (
    <ToolbarElement
      {...props}
      onMouseDown={e => e.preventDefault()}
      type={getPlatePluginType(editor, props.type)}
    />
  )
}
