import React, {useEffect} from 'react'
import Divider, {DividerType} from './atoms/Divider'
import {HeadingToolbar} from '@udecode/slate-plugins-toolbar'
import {createImagePlugin} from '@udecode/slate-plugins-image'
import {createTablePlugin} from '@dreifuss-wysiwyg-editor/table'
import {createAlignPlugin} from '@udecode/slate-plugins-alignment'
import {createHeadingPlugin} from '@udecode/slate-plugins-heading'
import {createHighlightPlugin} from '@udecode/slate-plugins-highlight'
import {createParagraphPlugin} from '@udecode/slate-plugins-paragraph'
import {createCodeBlockPlugin} from '@udecode/slate-plugins-code-block'
import {createBlockquotePlugin} from '@udecode/slate-plugins-block-quote'
import {createMediaEmbedPlugin} from '@udecode/slate-plugins-media-embed'
import {createSlatePluginsOptions} from './utils/createSlatePluginsOptions'
import {EditorValue, CharactersCountIcon} from '@dreifuss-wysiwyg-editor/common'
import {createBasicElementPlugins} from '@udecode/slate-plugins-basic-elements'
import {createSlatePluginsComponents} from './utils/createSlatePluginsComponents'
import {createListPlugin, createTodoListPlugin} from '@udecode/slate-plugins-list'
import {CharCountToolbar, getCharacterCount} from '@dreifuss-wysiwyg-editor/character-count-ui'
import {createHistoryPlugin, createReactPlugin, SlatePlugins} from '@udecode/slate-plugins-core'
// @ts-ignore
import {ToolbarLink} from '@dreifuss-wysiwyg-editor/link-ui'
import {createLinkPlugin} from '@dreifuss-wysiwyg-editor/link'
import {FontColorToolbar} from '@dreifuss-wysiwyg-editor/font-color-ui'
import {createFontColorPlugin} from '@dreifuss-wysiwyg-editor/font-color'
import {
  createBoldPlugin,
  createItalicPlugin,
  createCodePlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin
} from '@udecode/slate-plugins-basic-marks'
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
  const components = createSlatePluginsComponents()
  const options = createSlatePluginsOptions()

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
    <SlatePlugins
      id={props.id}
      onChange={props.onChange}
      plugins={plugins}
      components={components}
      options={options}
      editableProps={editableProps as EditableProps}
      initialValue={props.value || props.initialValue}>
      <ToolbarBalloon />
      {!props.displayOnly && (
        <HeadingToolbar>
          <ToolbarButtonsBasicElements />
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
        </HeadingToolbar>
      )}
      {showCharactersCount && (
        <p style={{textAlign: 'right'}}>
          <CharactersCountIcon /> <CharCountToolbar id={id} />
        </p>
      )}
    </SlatePlugins>
  )
}
