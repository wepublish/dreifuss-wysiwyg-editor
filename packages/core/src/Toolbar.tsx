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
  // Emoji,
  // Image,
  // FontColor
} from '@dreifuss-wysiwyg-editor/common'
import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_RIGHT
} from '@udecode/slate-plugins-alignment'
import {ToolbarList} from '@udecode/slate-plugins-list-ui'
import {ToolbarTable} from '@udecode/slate-plugins-table-ui'
import {ToolbarAlign} from '@udecode/slate-plugins-alignment-ui'
import {ELEMENT_OL, ELEMENT_UL} from '@udecode/slate-plugins-list'
import {ELEMENT_CODE_BLOCK} from '@udecode/slate-plugins-code-block'
import {ELEMENT_BLOCKQUOTE} from '@udecode/slate-plugins-block-quote'
import {ToolbarCodeBlock} from '@udecode/slate-plugins-code-block-ui'
import {ToolbarElement, ToolbarMark} from '@udecode/slate-plugins-toolbar'
import {getSlatePluginType, useEditorRef} from '@udecode/slate-plugins-core'
import {ELEMENT_H1, ELEMENT_H2, ELEMENT_H3} from '@udecode/slate-plugins-heading'
import {
  insertTable,
  deleteColumn,
  deleteRow,
  deleteTable,
  addColumn,
  addRow
} from '@udecode/slate-plugins-table'
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from '@udecode/slate-plugins-basic-marks'

// export const ToolbarFontColor = () => (
//   <Popover
//     Icon={
//       <ToolbarElement
//         type={getSlatePluginType(useEditorRef(), ELEMENT_FONT_COLOR)}
//         icon={<FontColor />}
//       />
//     }>
//     <FontColorToolbar />
//   </Popover>
// )

// export const ToolbarImage = () => (
//   <Popover Icon={<ToolbarElement type="" icon={<Image />} />}>
//     <UploadImageMenu />
//   </Popover>
// )

// export const ToolbarEmoji = () => (
//   <Popover Icon={<ToolbarElement type="" icon={<Emoji />} />}>
//     <EmojiPicker />
//   </Popover>
// )

// export const ToolbarQuotationMarks = () => (
//   <Popover Icon={<ToolbarElement type="" icon={'<<>>'} />}>
//     <QuotationMarksPicker />
//   </Popover>
// )

export const ToolbarButtonsBasicElements = () => (
  <>
    <ToolbarElement type={getSlatePluginType(useEditorRef(), ELEMENT_H1)} icon={<H1 />} />
    <ToolbarElement type={getSlatePluginType(useEditorRef(), ELEMENT_H2)} icon={<H2 />} />
    <ToolbarElement type={getSlatePluginType(useEditorRef(), ELEMENT_H3)} icon={<H3 />} />
    <ToolbarElement
      type={getSlatePluginType(useEditorRef(), ELEMENT_BLOCKQUOTE)}
      icon={<BlockQuote />}
    />
    <ToolbarCodeBlock
      type={getSlatePluginType(useEditorRef(), ELEMENT_CODE_BLOCK)}
      icon={<BlockCode />}
    />
  </>
)

export const ToolbarButtonsList = () => (
  <>
    <ToolbarList type={getSlatePluginType(useEditorRef(), ELEMENT_UL)} icon={<ListUL />} />
    <ToolbarList type={getSlatePluginType(useEditorRef(), ELEMENT_OL)} icon={<ListOL />} />
  </>
)

export const ToolbarButtonsAlign = () => (
  <>
    <ToolbarAlign icon={<AlignLeft />} />
    <ToolbarAlign
      type={getSlatePluginType(useEditorRef(), ELEMENT_ALIGN_CENTER)}
      icon={<AlignCenter />}
    />
    <ToolbarAlign
      type={getSlatePluginType(useEditorRef(), ELEMENT_ALIGN_RIGHT)}
      icon={<AlignRight />}
    />
    <ToolbarAlign
      type={getSlatePluginType(useEditorRef(), ELEMENT_ALIGN_JUSTIFY)}
      icon={<AlignJustify />}
    />
  </>
)

export const ToolbarButtonsBasicMarks = () => {
  return (
    <>
      <ToolbarMark type={getSlatePluginType(useEditorRef(), MARK_BOLD)} icon={<Bold />} />
      <ToolbarMark type={getSlatePluginType(useEditorRef(), MARK_ITALIC)} icon={<Italic />} />
      <ToolbarMark type={getSlatePluginType(useEditorRef(), MARK_UNDERLINE)} icon={<Underline />} />
      <ToolbarMark
        type={getSlatePluginType(useEditorRef(), MARK_STRIKETHROUGH)}
        icon={<StrikeThrough />}
      />
      <ToolbarMark type={getSlatePluginType(useEditorRef(), MARK_CODE)} icon={'code'} />
      <ToolbarMark
        type={getSlatePluginType(useEditorRef(), MARK_SUPERSCRIPT)}
        clear={getSlatePluginType(useEditorRef(), MARK_SUBSCRIPT)}
        icon={<Superscript />}
      />
      <ToolbarMark
        type={getSlatePluginType(useEditorRef(), MARK_SUBSCRIPT)}
        clear={getSlatePluginType(useEditorRef(), MARK_SUPERSCRIPT)}
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
    {/* <Popover Icon={<ToolbarElement type="" icon={'+'} />}>
      {'Border color: '} <TableCellBorderColorPicker />
    </Popover> */}
  </>
)
