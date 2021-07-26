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
import {createBasicElementPlugins} from '@udecode/slate-plugins-basic-elements'
import {createSlatePluginsComponents} from './utils/createSlatePluginsComponents'
import {createListPlugin, createTodoListPlugin} from '@udecode/slate-plugins-list'
import {ToolbarLink} from '@dreifuss-wysiwyg-editor/link-ui'
import {createLinkPlugin} from '@dreifuss-wysiwyg-editor/link'
import {SlatePlugins, createHistoryPlugin, createReactPlugin} from '@udecode/slate-plugins-core'
import {ToolbarLink} from '@dreifuss-wysiwyg-editor/link-ui'
import {createLinkPlugin} from '@dreifuss-wysiwyg-editor/link'
import {FontColorToolbar} from '@dreifuss-wysiwyg-editor/font-color-ui'
import {createFontColorPlugin} from '@dreifuss-wysiwyg-editor/font-color'
import {CharCountToolbar, useCharacterCount} from '@dreifuss-wysiwyg-editor/character-count-ui'
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
import {EditorValue} from '@dreifuss-wysiwyg-editor/common'

export interface EditableProps {
  id?: string
  displayOnly?: boolean
  showCharCount?: boolean
  displayOneLine?: boolean
  disabled?: boolean
}

export interface EditorProps {
  id?: string
  displayOnly?: boolean
  showCharCount?: boolean
  displayOneLine?: boolean
  disabled?: boolean
  initialValue?: any
  value?: EditorValue
  charactersCount?: any
  onChange?: React.Dispatch<React.SetStateAction<any>>
}

export default function DreifussWysiwygEditor(props: EditorProps) {
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
    // TODO: Should be moved to font color plugin
    // renderLeaf
  }

  const charCount = useCharacterCount()

  useEffect(() => {
    props.charactersCount(charCount)
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
      id={props.id ?? 'main'}
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
      {props.showCharCount && (
        <p style={{textAlign: 'right'}}>
          {'Characters count:'} <CharCountToolbar />
        </p>
      )}
    </SlatePlugins>
  )
}
