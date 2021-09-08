import React, {useEffect, useRef, useState} from 'react'
import {Editor, Element} from 'slate'
import {getPlatePluginType, useEventEditorId, useStoreEditorState} from '@udecode/plate-core'
import {BorderColorIcon} from '@dreifuss-wysiwyg-editor/common'
import {ELEMENT_TD, upsertBorderColor} from '@dreifuss-wysiwyg-editor/table'

interface TableBorderColorToolbarProps {
  icon?: any
}

const DEFAULT_TD_BORDER_COLOR = '#000'

export const TableBorderColorToolbar = (props: TableBorderColorToolbarProps) => {
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const [borderColor, setBorderColor] = useState<string>(DEFAULT_TD_BORDER_COLOR)

  const textInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!editor?.selection) return
    const nodes: Array<any> | null = Array.from(
      Editor.nodes(editor, {
        at: editor.selection,
        match: node =>
          Element.isElement(node) && node.type === getPlatePluginType(editor, ELEMENT_TD)
      })
    )
    if (nodes?.length) {
      setBorderColor(nodes[0][0].borderColor || DEFAULT_TD_BORDER_COLOR)
    }
  }, [editor?.selection])

  return (
    <div onClick={() => textInput.current?.click()}>
      {props.icon ?? <BorderColorIcon />}
      <input
        type="color"
        ref={textInput}
        value={borderColor}
        onChange={e => {
          if (!editor) return

          const color = e.target.value
          if (color) setBorderColor(color)

          upsertBorderColor(editor, color)
        }}
        style={{
          width: 0,
          visibility: 'hidden'
        }}
      />
    </div>
  )
}
