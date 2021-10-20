import React, {Children, cloneElement, isValidElement} from 'react'
import {ToolbarElement, ToolbarMark, ToolbarButton} from '@udecode/plate-toolbar'
import {someNode, isMarkActive} from '@udecode/plate-common'
import {useStoreEditorState, useEventEditorId, getPlatePluginType} from '@udecode/plate-core'
import {ToolbarList} from '@udecode/plate-list-ui'
import {ToolbarAlign} from '@dreifuss-wysiwyg-editor/alignment-ui'

export function Button({editor: passedEditor, children}) {
  const focusedEditor = useStoreEditorState(useEventEditorId('focus'))
  const isPassedEditorFocused = focusedEditor === passedEditor
  const isTextSelected = !!focusedEditor?.selection
  const isSelectionFocused = isPassedEditorFocused && isTextSelected

  const childrenWithProps = Children.map(children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, {isSelectionFocused, editor: focusedEditor})
    }
    return child
  })

  return <>{childrenWithProps}</>
}

Button.Align = ({isSelectionFocused, editor, type: plugin, icon}: any) => {
  const type = getPlatePluginType(editor, plugin)
  const isActive = isSelectionFocused && someNode(editor, {match: {type}})
  return <ToolbarAlign type={type} active={isActive} icon={icon} />
}

Button.Element = ({isSelectionFocused, editor, type: plugin, icon}: any) => {
  const type = getPlatePluginType(editor, plugin)
  const isActive = isSelectionFocused && someNode(editor, {match: {type}})
  return <ToolbarElement type={type} active={isActive} icon={icon} />
}

Button.Mark = ({isSelectionFocused, editor, type: plugin, icon, tooltip}: any) => {
  const type = getPlatePluginType(editor, plugin)
  const isActive = isSelectionFocused && isMarkActive(editor, type)
  return <ToolbarMark tooltip={tooltip} type={type} active={isActive} icon={icon} />
}

Button.List = ({isSelectionFocused, editor, type: plugin, icon}: any) => {
  const type = getPlatePluginType(editor, plugin)
  const isActive = isSelectionFocused && someNode(editor, {match: {type}})
  return <ToolbarList type={type} active={isActive} icon={icon} />
}

Button.Link = ({isSelectionFocused, editor, type: plugin, icon}) => {
  const type = getPlatePluginType(editor, plugin)
  const isActive = isSelectionFocused && someNode(editor, {match: {type}})

  return <ToolbarButton icon={icon} active={isActive} />
}
