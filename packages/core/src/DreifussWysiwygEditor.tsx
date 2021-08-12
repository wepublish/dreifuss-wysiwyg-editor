import React, {useEffect} from 'react'
import Divider, {DividerType} from './atoms/Divider'
import {HeadingToolbar} from '@udecode/plate-toolbar'
import {createImagePlugin} from '@udecode/plate-image'
import {createTablePlugin} from '@dreifuss-wysiwyg-editor/table'
import {createAlignPlugin} from '@udecode/plate-alignment'
import {createHeadingPlugin} from '@udecode/plate-heading'
import {createHighlightPlugin} from '@udecode/plate-highlight'
import {createParagraphPlugin} from '@udecode/plate-paragraph'
import {createCodeBlockPlugin} from '@udecode/plate-code-block'
import {createBlockquotePlugin} from '@udecode/plate-block-quote'
import {createMediaEmbedPlugin} from '@udecode/plate-media-embed'
import {createPlatePluginsOptions} from './utils/createSlatePluginsOptions'
import {EditorValue, CharactersCountIcon, ImageIcon} from '@dreifuss-wysiwyg-editor/common'
import {createBasicElementPlugins} from '@udecode/plate-basic-elements'
import {createPlatePluginsComponents} from './utils/createSlatePluginsComponents'
import {createListPlugin, createTodoListPlugin} from '@udecode/plate-list'
import {CharCountToolbar, getCharacterCount} from '@dreifuss-wysiwyg-editor/character-count-ui'
import {createHistoryPlugin, createReactPlugin, Plate} from '@udecode/plate-core'
import {ToolbarImage} from '@udecode/plate-image-ui'
// @ts-ignore
import {ToolbarLink} from '@dreifuss-wysiwyg-editor/link-ui'
import {createLinkPlugin} from '@dreifuss-wysiwyg-editor/link'
import {FontColorToolbar} from '@dreifuss-wysiwyg-editor/font-color-ui'
import {createFontColorPlugin} from '@dreifuss-wysiwyg-editor/font-color'
import {QuotationMarksMenu} from '@dreifuss-wysiwyg-editor/quotation-mark-ui'
import {
  createBoldPlugin,
  createItalicPlugin,
  createCodePlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin
} from '@udecode/plate-basic-marks'
import {
  ToolbarBalloon,
  ToolbarButtonsAlign,
  ToolbarButtonsBasicElements,
  ToolbarButtonsBasicMarks,
  ToolbarButtonsList,
  ToolbarButtonsTable
} from './Toolbar'

export interface EditableProps {
  id?: string
  displayOnly?: boolean
  showCharactersCount?: boolean
  displayOneLine?: boolean
  disabled?: boolean
}

export interface EditorProps {
  id?: string
  displayOnly?: boolean
  showCharactersCount?: boolean
  displayOneLine?: boolean
  disabled?: boolean
  initialValue?: any
  value?: EditorValue
  charactersCount?: any
  onChange?: React.Dispatch<React.SetStateAction<any>>
}

export default function DreifussWysiwygEditor(props: EditorProps) {
  const {id = 'main', showCharactersCount = true} = props
  const components = createPlatePluginsComponents()
  const options = createPlatePluginsOptions()

  const editableProps = {
    placeholder: "What's on your mind?",
    spellCheck: false,
    autoFocus: true,
    readOnly: props.displayOnly ?? props.disabled ?? false,
    style: props.displayOneLine
      ? {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: 'inherit'
        }
      : {}
  }

  const charCount = getCharacterCount(id)

  useEffect(() => {
    if (props?.charactersCount) props.charactersCount(charCount)
  }, [charCount])

  const plugins = [
    ...createBasicElementPlugins(),
    createReactPlugin(),
    createHistoryPlugin(),
    createLinkPlugin(),
    createListPlugin(),
    createBoldPlugin(),
    createCodePlugin(),
    createAlignPlugin(),
    createImagePlugin(),
    createTablePlugin(),
    createItalicPlugin(),
    createTodoListPlugin(),
    createFontColorPlugin(),
    createParagraphPlugin(),
    createHighlightPlugin(),
    createCodeBlockPlugin(),
    createUnderlinePlugin(),
    createSubscriptPlugin(),
    createMediaEmbedPlugin(),
    createBlockquotePlugin(),
    createSuperscriptPlugin(),
    createStrikethroughPlugin(),
    createHeadingPlugin({levels: 3})
  ]

  return (
    <Plate
      id={props.id}
      onChange={props.onChange}
      plugins={plugins}
      components={components}
      options={options}
      editableProps={editableProps as EditableProps}
      initialValue={JSON.parse(JSON.stringify(props.value || props.initialValue))}>
      <ToolbarBalloon />
      {!props.displayOnly && (
        <HeadingToolbar>
          <ToolbarButtonsBasicElements />
          <QuotationMarksMenu />
          <Divider type={DividerType.vertical} />
          <ToolbarButtonsList />
          <Divider type={DividerType.vertical} />
          <ToolbarButtonsBasicMarks />
          <Divider type={DividerType.vertical} />
          <FontColorToolbar />
          <Divider type={DividerType.vertical} />
          <ToolbarButtonsAlign />
          <Divider type={DividerType.vertical} />
          {/* <ToolbarImage />
          <Divider type={DividerType.vertical} /> */}
          <ToolbarButtonsTable />
          <Divider type={DividerType.vertical} />
          <ToolbarLink />
          <Divider type={DividerType.vertical} />
          <ToolbarImage icon={<ImageIcon />} />
        </HeadingToolbar>
      )}
      {showCharactersCount && (
        <p style={{textAlign: 'right'}}>
          <CharactersCountIcon /> <CharCountToolbar id={id} />
        </p>
      )}
    </Plate>
  )
}
