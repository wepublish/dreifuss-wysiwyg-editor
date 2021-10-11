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
  BorderTopIcon,
  LinkIcon,
  FontColor
} from '@dreifuss-wysiwyg-editor/common'
import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_LEFT,
  ELEMENT_ALIGN_RIGHT
} from '@udecode/plate-alignment'
import {ToolbarList} from '@udecode/plate-list-ui'
import {
  ToolbarTable,
  TableBorderColorToolbar,
  TableBgColorToolbar
} from '@dreifuss-wysiwyg-editor/table-ui'
import {ELEMENT_LINK} from '@dreifuss-wysiwyg-editor/link'
import {ELEMENT_OL, ELEMENT_UL} from '@udecode/plate-list'
import {ELEMENT_CODE_BLOCK} from '@udecode/plate-code-block'
import {ELEMENT_BLOCKQUOTE} from '@udecode/plate-block-quote'
import {ToolbarCodeBlock} from '@udecode/plate-code-block-ui'
import {ToolbarElement, ToolbarMark, BalloonToolbar} from '@udecode/plate-toolbar'
import {getPlatePluginType, useEditorRef} from '@udecode/plate-core'
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
import {Button} from './utils/ToolbarButtonsHelper'

export const ToolbarFontColorButton = ({editor}) => (
  <Button editor={editor}>
    <Button.FontColor icon={<FontColor />} />
  </Button>
)

export const ToolbarLinkButton = ({editor}) => (
  <Button editor={editor}>
    <Button.Link type={ELEMENT_LINK} icon={<LinkIcon />} />
  </Button>
)

export const ToolbarBasicElementsButtons = ({editor}) => (
  <Button editor={editor}>
    <Button.Element type={ELEMENT_H1} icon={<H1Icon />} />
    <Button.Element type={ELEMENT_H2} icon={<H2Icon />} />
    <Button.Element type={ELEMENT_H3} icon={<H3Icon />} />
    <Button.Element type={ELEMENT_BLOCKQUOTE} icon={<BlockQuoteIcon />} />
    <ToolbarCodeBlock type={ELEMENT_CODE_BLOCK} icon={<BlockCodeIcon />} />
  </Button>
)

export const ToolbarListButtons = ({editor}: any) => (
  <Button editor={editor}>
    <Button.List type={ELEMENT_UL} icon={<ListULIcon />} />
    <Button.List type={ELEMENT_OL} icon={<ListOLIcon />} />
  </Button>
)

export const ToolbarAlignButtons = ({editor}) => (
  <Button editor={editor}>
    <Button.Element type={ELEMENT_ALIGN_LEFT} icon={<AlignLeftIcon />} />
    <Button.Element type={ELEMENT_ALIGN_CENTER} icon={<AlignCenterIcon />} />
    <Button.Element type={ELEMENT_ALIGN_RIGHT} icon={<AlignRightIcon />} />
    <Button.Element type={ELEMENT_ALIGN_JUSTIFY} icon={<AlignJustifyIcon />} />
  </Button>
)

export const ToolbarBasicMarksButtons = ({editor}) => (
  <Button editor={editor}>
    <Button.Mark type={MARK_BOLD} icon={<BoldIcon />} />
    <Button.Mark type={MARK_ITALIC} icon={<ItalicIcon />} />
    <Button.Mark type={MARK_UNDERLINE} icon={<UnderlineIcon />} />
    <Button.Mark type={MARK_STRIKETHROUGH} icon={<StrikeThroughIcon />} />
    <Button.Mark type={MARK_CODE} icon={'code'} />
    <Button.Mark
      type={MARK_SUPERSCRIPT}
      clear={getPlatePluginType(useEditorRef(), MARK_SUBSCRIPT)}
      icon={<SuperscriptIcon />}
    />
    <Button.Mark
      type={MARK_SUBSCRIPT}
      clear={getPlatePluginType(useEditorRef(), MARK_SUPERSCRIPT)}
      icon={<SubscriptIcon />}
    />
  </Button>
)

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

export const ToolbarBalloon = ({editor}) => {
  const arrow = true
  const tooltip = {
    arrow,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: 'top'
  }

  return (
    <BalloonToolbar direction="top" hiddenDelay={0} theme="light" arrow={arrow}>
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_BOLD)}
        icon={<BoldIcon />}
        // @ts-ignore
        tooltip={{content: 'Bold (⌘B)', ...tooltip}}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_ITALIC)}
        icon={<ItalicIcon />}
        // @ts-ignore
        tooltip={{content: 'Italic (⌘I)', ...tooltip}}
      />
      <ToolbarMark
        type={getPlatePluginType(editor, MARK_UNDERLINE)}
        icon={<UnderlineIcon />}
        // @ts-ignore
        tooltip={{content: 'Underline (⌘U)', ...tooltip}}
      />
      <ToolbarElement type={ELEMENT_H1} icon={<H1Icon />} />
      <ToolbarElement type={ELEMENT_H2} icon={<H2Icon />} />
      <ToolbarElement type={ELEMENT_H3} icon={<H3Icon />} />
      <ToolbarList type={ELEMENT_UL} icon={<ListULIcon />} />
    </BalloonToolbar>
  )
}
