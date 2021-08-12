import React from 'react'
import {
  H1,
  H2,
  H3,
  Bold,
  Italic,
  Underline,
  BlockCode,
  BlockQuote,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
  StrikeThrough,
  Superscript,
  Subscript,
  ListOL,
  ListUL,
  BorderAll,
  BorderBottom,
  BorderClear,
  BorderLeft,
  BorderRight,
  BorderTop
} from '@dreifuss-wysiwyg-editor/common'
import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_RIGHT
} from '@udecode/plate-alignment'
import {ToolbarList} from '@udecode/plate-list-ui'
import {
  ToolbarTable,
  TableBorderColorToolbar,
  TableBgColorToolbar
} from '@dreifuss-wysiwyg-editor/table-ui'
import {ToolbarAlign} from '@udecode/plate-alignment-ui'
import {ELEMENT_OL, ELEMENT_UL} from '@udecode/plate-list'
import {ELEMENT_CODE_BLOCK} from '@udecode/plate-code-block'
import {ELEMENT_BLOCKQUOTE} from '@udecode/plate-block-quote'
import {ToolbarCodeBlock} from '@udecode/plate-code-block-ui'
import {ToolbarElement, ToolbarMark, BalloonToolbar} from '@udecode/plate-toolbar'
import {
  getPlatePluginType,
  useEditorRef,
  useEventEditorId,
  useStoreEditorState
} from '@udecode/plate-core'
import {ELEMENT_H1, ELEMENT_H2, ELEMENT_H3} from '@udecode/plate-heading'
import {
  insertTable,
  deleteColumn,
  deleteRow,
  deleteTable,
  addColumn,
  addRow
} from '@dreifuss-wysiwyg-editor/table'
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from '@udecode/plate-basic-marks'

export const ToolbarButtonsBasicElements = () => (
  <>
    <ToolbarElement type={getPlatePluginType(useEditorRef(), ELEMENT_H1)} icon={<H1 />} />
    <ToolbarElement type={getPlatePluginType(useEditorRef(), ELEMENT_H2)} icon={<H2 />} />
    <ToolbarElement type={getPlatePluginType(useEditorRef(), ELEMENT_H3)} icon={<H3 />} />
    <ToolbarElement
      type={getPlatePluginType(useEditorRef(), ELEMENT_BLOCKQUOTE)}
      icon={<BlockQuote />}
    />
    <ToolbarCodeBlock
      type={getPlatePluginType(useEditorRef(), ELEMENT_CODE_BLOCK)}
      icon={<BlockCode />}
    />
  </>
)

export const ToolbarButtonsList = () => (
  <>
    <ToolbarList type={getPlatePluginType(useEditorRef(), ELEMENT_UL)} icon={<ListUL />} />
    <ToolbarList type={getPlatePluginType(useEditorRef(), ELEMENT_OL)} icon={<ListOL />} />
  </>
)

export const ToolbarButtonsAlign = () => (
  <>
    <ToolbarAlign icon={<AlignLeft />} />
    <ToolbarAlign
      type={getPlatePluginType(useEditorRef(), ELEMENT_ALIGN_CENTER)}
      icon={<AlignCenter />}
    />
    <ToolbarAlign
      type={getPlatePluginType(useEditorRef(), ELEMENT_ALIGN_RIGHT)}
      icon={<AlignRight />}
    />
    <ToolbarAlign
      type={getPlatePluginType(useEditorRef(), ELEMENT_ALIGN_JUSTIFY)}
      icon={<AlignJustify />}
    />
  </>
)

export const ToolbarButtonsBasicMarks = () => {
  return (
    <>
      <ToolbarMark type={getPlatePluginType(useEditorRef(), MARK_BOLD)} icon={<Bold />} />
      <ToolbarMark type={getPlatePluginType(useEditorRef(), MARK_ITALIC)} icon={<Italic />} />
      <ToolbarMark type={getPlatePluginType(useEditorRef(), MARK_UNDERLINE)} icon={<Underline />} />
      <ToolbarMark
        type={getPlatePluginType(useEditorRef(), MARK_STRIKETHROUGH)}
        icon={<StrikeThrough />}
      />
      <ToolbarMark type={getPlatePluginType(useEditorRef(), MARK_CODE)} icon={'code'} />
      <ToolbarMark
        type={getPlatePluginType(useEditorRef(), MARK_SUPERSCRIPT)}
        clear={getPlatePluginType(useEditorRef(), MARK_SUBSCRIPT)}
        icon={<Superscript />}
      />
      <ToolbarMark
        type={getPlatePluginType(useEditorRef(), MARK_SUBSCRIPT)}
        clear={getPlatePluginType(useEditorRef(), MARK_SUPERSCRIPT)}
        icon={<Subscript />}
      />
    </>
  )
}

export const ToolbarButtonsTable = () => (
  <>
    <ToolbarTable icon={<BorderAll />} transform={insertTable} />
    <ToolbarTable icon={<BorderClear />} transform={deleteTable} />
    <ToolbarTable icon={<BorderBottom />} transform={addRow} />
    <ToolbarTable icon={<BorderTop />} transform={deleteRow} />
    <ToolbarTable icon={<BorderLeft />} transform={addColumn} />
    <ToolbarTable icon={<BorderRight />} transform={deleteColumn} />
    <TableBorderColorToolbar />
    <TableBgColorToolbar />
  </>
)

export const ToolbarBalloon = () => {
  const arrow = true
  const tooltip = {
    arrow,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: 'top'
  }
  const editor = useStoreEditorState(useEventEditorId('focus'))

  return (
    <BalloonToolbar direction="top" hiddenDelay={0} theme="light" arrow={arrow}>
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_BOLD)}
        icon={<Bold />}
        // @ts-ignore
        tooltip={{content: 'Bold (⌘B)', ...tooltip}}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_ITALIC)}
        icon={<Italic />}
        // @ts-ignore
        tooltip={{content: 'Italic (⌘I)', ...tooltip}}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_UNDERLINE)}
        icon={<Underline />}
        // @ts-ignore
        tooltip={{content: 'Underline (⌘U)', ...tooltip}}
      />
      <ToolbarElement type={getPlatePluginType(useEditorRef(), ELEMENT_H1)} icon={<H1 />} />
      <ToolbarElement type={getPlatePluginType(useEditorRef(), ELEMENT_H2)} icon={<H2 />} />
      <ToolbarElement type={getPlatePluginType(useEditorRef(), ELEMENT_H3)} icon={<H3 />} />
      <ToolbarList type={getPlatePluginType(useEditorRef(), ELEMENT_UL)} icon={<ListUL />} />
    </BalloonToolbar>
  )
}
