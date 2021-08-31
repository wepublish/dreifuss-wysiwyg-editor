import React from 'react'
import {
  H1Icon,
  H2Icon,
  H3Icon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  BlockCodeIcon,
  BlockQuoteIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  StrikeThroughIcon,
  SuperscriptIcon,
  SubscriptIcon,
  ListOLIcon,
  ListULIcon,
  BorderAllIcon,
  BorderBottomIcon,
  BorderClearIcon,
  BorderLeftIcon,
  BorderRightIcon,
  BorderTopIcon
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
  getSlatePluginType,
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

export const ToolbarBasicElementsButtons = () => (
  <>
    <ToolbarElement type={getSlatePluginType(useEditorRef(), ELEMENT_H1)} icon={<H1Icon />} />
    <ToolbarElement type={getSlatePluginType(useEditorRef(), ELEMENT_H2)} icon={<H2Icon />} />
    <ToolbarElement type={getSlatePluginType(useEditorRef(), ELEMENT_H3)} icon={<H3Icon />} />
    <ToolbarElement
      type={getSlatePluginType(useEditorRef(), ELEMENT_BLOCKQUOTE)}
      icon={<BlockQuoteIcon />}
    />
    <ToolbarCodeBlock
      type={getSlatePluginType(useEditorRef(), ELEMENT_CODE_BLOCK)}
      icon={<BlockCodeIcon />}
    />
  </>
)

export const ToolbarListButtons = () => (
  <>
    <ToolbarList type={getSlatePluginType(useEditorRef(), ELEMENT_UL)} icon={<ListULIcon />} />
    <ToolbarList type={getSlatePluginType(useEditorRef(), ELEMENT_OL)} icon={<ListOLIcon />} />
  </>
)

export const ToolbarAlignButtons = () => (
  <>
    <ToolbarAlign icon={<AlignLeftIcon />} />
    <ToolbarAlign
      type={getSlatePluginType(useEditorRef(), ELEMENT_ALIGN_CENTER)}
      icon={<AlignCenterIcon />}
    />
    <ToolbarAlign
      type={getSlatePluginType(useEditorRef(), ELEMENT_ALIGN_RIGHT)}
      icon={<AlignRightIcon />}
    />
    <ToolbarAlign
      type={getSlatePluginType(useEditorRef(), ELEMENT_ALIGN_JUSTIFY)}
      icon={<AlignJustifyIcon />}
    />
  </>
)

export const ToolbarBasicMarksButtons = () => {
  return (
    <>
      <ToolbarMark type={getSlatePluginType(useEditorRef(), MARK_BOLD)} icon={<BoldIcon />} />
      <ToolbarMark type={getSlatePluginType(useEditorRef(), MARK_ITALIC)} icon={<ItalicIcon />} />
      <ToolbarMark
        type={getSlatePluginType(useEditorRef(), MARK_UNDERLINE)}
        icon={<UnderlineIcon />}
      />
      <ToolbarMark
        type={getSlatePluginType(useEditorRef(), MARK_STRIKETHROUGH)}
        icon={<StrikeThroughIcon />}
      />
      <ToolbarMark type={getSlatePluginType(useEditorRef(), MARK_CODE)} icon={'code'} />
      <ToolbarMark
        type={getSlatePluginType(useEditorRef(), MARK_SUPERSCRIPT)}
        clear={getSlatePluginType(useEditorRef(), MARK_SUBSCRIPT)}
        icon={<SuperscriptIcon />}
      />
      <ToolbarMark
        type={getSlatePluginType(useEditorRef(), MARK_SUBSCRIPT)}
        clear={getSlatePluginType(useEditorRef(), MARK_SUPERSCRIPT)}
        icon={<SubscriptIcon />}
      />
    </>
  )
}

export const ToolbarTableButtons = () => (
  <>
    <ToolbarTable icon={<BorderAllIcon />} transform={insertTable} />
    <ToolbarTable icon={<BorderClearIcon />} transform={deleteTable} />
    <ToolbarTable icon={<BorderBottomIcon />} transform={addRow} />
    <ToolbarTable icon={<BorderTopIcon />} transform={deleteRow} />
    <ToolbarTable icon={<BorderLeftIcon />} transform={addColumn} />
    <ToolbarTable icon={<BorderRightIcon />} transform={deleteColumn} />
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
        type={getSlatePluginType(editor, MARK_BOLD)}
        icon={<BoldIcon />}
        // @ts-ignore
        tooltip={{content: 'Bold (⌘B)', ...tooltip}}
      />
      <ToolbarMark
        type={getSlatePluginType(editor, MARK_ITALIC)}
        icon={<ItalicIcon />}
        // @ts-ignore
        tooltip={{content: 'Italic (⌘I)', ...tooltip}}
      />
      <ToolbarMark
        type={getSlatePluginType(editor, MARK_UNDERLINE)}
        icon={<UnderlineIcon />}
        // @ts-ignore
        tooltip={{content: 'Underline (⌘U)', ...tooltip}}
      />
      <ToolbarElement type={getSlatePluginType(useEditorRef(), ELEMENT_H1)} icon={<H1Icon />} />
      <ToolbarElement type={getSlatePluginType(useEditorRef(), ELEMENT_H2)} icon={<H2Icon />} />
      <ToolbarElement type={getSlatePluginType(useEditorRef(), ELEMENT_H3)} icon={<H3Icon />} />
      <ToolbarList type={getSlatePluginType(useEditorRef(), ELEMENT_UL)} icon={<ListULIcon />} />
    </BalloonToolbar>
  )
}
