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
  FontColorIcon,
  BackgroundColorIcon
} from '@dreifuss-wysiwyg-editor/common'
import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_LEFT,
  ELEMENT_ALIGN_RIGHT
} from '@dreifuss-wysiwyg-editor/alignment'
import {TableBorderColorToolbar, TableBgColorToolbar} from '@dreifuss-wysiwyg-editor/table-ui'
import {ELEMENT_LINK} from '@dreifuss-wysiwyg-editor/link'
import {ELEMENT_OL, ELEMENT_UL} from '@udecode/plate-list'
import {ELEMENT_CODE_BLOCK} from '@udecode/plate-code-block'
import {ELEMENT_BLOCKQUOTE} from '@udecode/plate-block-quote'
import {ToolbarCodeBlock} from '@udecode/plate-code-block-ui'
import {BalloonToolbar} from '@udecode/plate-toolbar'
import {getPlatePluginType, useEditorRef} from '@udecode/plate-core'
import {ELEMENT_H1, ELEMENT_H2, ELEMENT_H3} from '@udecode/plate-heading'
import {Button} from './utils/ToolbarButtonsHelper'
import {MARK_BG_COLOR, MARK_COLOR} from '@dreifuss-wysiwyg-editor/font'
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
    <Button.Align type={ELEMENT_ALIGN_LEFT} icon={<AlignLeftIcon />} />
    <Button.Align type={ELEMENT_ALIGN_CENTER} icon={<AlignCenterIcon />} />
    <Button.Align type={ELEMENT_ALIGN_RIGHT} icon={<AlignRightIcon />} />
    <Button.Align type={ELEMENT_ALIGN_JUSTIFY} icon={<AlignJustifyIcon />} />
  </Button>
)

export const ToolbarBasicMarksButtons = ({editor}) => (
  <Button editor={editor}>
    <Button.Mark type={MARK_BOLD} icon={<BoldIcon />} />
    <Button.Mark type={MARK_ITALIC} icon={<ItalicIcon />} />
    <Button.Mark type={MARK_UNDERLINE} icon={<UnderlineIcon />} />
    <Button.Mark type={MARK_STRIKETHROUGH} icon={<StrikeThroughIcon />} />
    <Button.Mark type={MARK_CODE} icon={<BlockCodeIcon />} />
    <Button.Mark
      type={MARK_SUBSCRIPT}
      clear={getPlatePluginType(useEditorRef(), MARK_SUBSCRIPT)}
      icon={<SuperscriptIcon />}
    />
    <Button.Mark
      type={MARK_SUPERSCRIPT}
      clear={getPlatePluginType(useEditorRef(), MARK_SUPERSCRIPT)}
      icon={<SubscriptIcon />}
    />
  </Button>
)

export const ToolbarTableButtons = ({editor}) => (
  <>
    <Button editor={editor}>
      <Button.Table icon={<BorderAllIcon />} transform={insertTable} />
      <Button.Table icon={<BorderClearIcon />} transform={deleteTable} />
      <Button.Table icon={<BorderBottomIcon />} transform={addRow} />
      <Button.Table icon={<BorderTopIcon />} transform={deleteRow} />
      <Button.Table icon={<BorderLeftIcon />} transform={addColumn} />
      <Button.Table icon={<BorderRightIcon />} transform={deleteColumn} />
      <TableBorderColorToolbar />
      <TableBgColorToolbar />
    </Button>
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
    <BalloonToolbar direction="top" hiddenDelay={0} theme="dark" arrow={arrow}>
      <Button editor={editor}>
        <Button.Mark
          type={getPlatePluginType(editor, MARK_BOLD)}
          icon={<BoldIcon />}
          tooltip={{content: 'Bold (⌘B)', ...tooltip}}
        />
        <Button.Mark
          type={getPlatePluginType(editor, MARK_ITALIC)}
          icon={<ItalicIcon />}
          tooltip={{content: 'Italic (⌘I)', ...tooltip}}
        />
        <Button.Mark
          type={getPlatePluginType(editor, MARK_UNDERLINE)}
          icon={<UnderlineIcon />}
          tooltip={{content: 'Underline (⌘U)', ...tooltip}}
        />
      </Button>
    </BalloonToolbar>
  )
}

export const ToolbarFontColorButton = ({editor}) => (
  <Button editor={editor}>
    <Button.Mark type={MARK_COLOR} icon={<FontColorIcon />} />
  </Button>
)

export const ToolbarFontBgButton = ({editor}) => (
  <Button editor={editor}>
    <Button.Mark type={MARK_BG_COLOR} icon={<BackgroundColorIcon />} />
  </Button>
)

export const ToolbarLinkButton = ({editor}) => (
  <Button editor={editor}>
    <Button.Link type={ELEMENT_LINK} icon={<LinkIcon />} />
  </Button>
)
