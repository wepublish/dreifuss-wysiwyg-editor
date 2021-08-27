import React, {useEffect} from 'react'
import Divider, {DividerType} from './atoms/Divider'
import {HeadingToolbar} from '@udecode/slate-plugins-toolbar'
import {createTablePlugin} from '@dreifuss-wysiwyg-editor/table'
import {createAlignPlugin} from '@udecode/slate-plugins-alignment'
import {createHeadingPlugin} from '@udecode/slate-plugins-heading'
import {createHighlightPlugin} from '@udecode/slate-plugins-highlight'
import {createParagraphPlugin} from '@udecode/slate-plugins-paragraph'
import {createCodeBlockPlugin} from '@udecode/slate-plugins-code-block'
import {createBlockquotePlugin} from '@udecode/slate-plugins-block-quote'
import {createMediaEmbedPlugin} from '@udecode/slate-plugins-media-embed'
import {createSlatePluginsOptions} from './utils/createSlatePluginsOptions'
import {
  EditorValue,
  CharactersCountIcon,
  ImageIcon,
  Modal,
  LinkIcon
} from '@dreifuss-wysiwyg-editor/common'
import {createBasicElementPlugins} from '@udecode/slate-plugins-basic-elements'
import {createSlatePluginsComponents} from './utils/createSlatePluginsComponents'
import {createListPlugin, createTodoListPlugin} from '@udecode/slate-plugins-list'
import {CharCountToolbar, getCharacterCount} from '@dreifuss-wysiwyg-editor/character-count-ui'
import {createHistoryPlugin, createReactPlugin, SlatePlugins} from '@udecode/slate-plugins-core'
import {ToolbarLink} from '@dreifuss-wysiwyg-editor/link-ui'
import {createImagePlugin} from '@dreifuss-wysiwyg-editor/image'
import {ToolbarImage} from '@dreifuss-wysiwyg-editor/image-ui'
import {createLinkPlugin, ELEMENT_LINK} from '@dreifuss-wysiwyg-editor/link'
import {FontColorToolbar} from '@dreifuss-wysiwyg-editor/font-color-ui'
import {createFontColorPlugin} from '@dreifuss-wysiwyg-editor/font-color'
import {QuotationMarksMenu} from '@dreifuss-wysiwyg-editor/quotation-mark-ui'
import {ELEMENT_QUOTATION_MARK} from '@dreifuss-wysiwyg-editor/quotation-mark'
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
  ToolbarAlignButtons,
  ToolbarBasicElementsButtons,
  ToolbarBasicMarksButtons,
  ToolbarListButtons,
  ToolbarTableButtons
} from './Toolbar'
import {ELEMENT_IMAGE} from '@udecode/slate-plugins-image'

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
  toolbars: any
}

export default function DreifussWysiwygEditor(props: EditorProps) {
  const {id = 'main', showCharactersCount = true, toolbars} = props
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
      initialValue={JSON.parse(JSON.stringify(props.value || props.initialValue))}>
      <ToolbarBalloon />
      {!props.displayOnly && (
        <HeadingToolbar>
          <ToolbarBasicElementsButtons />
          <Modal type={ELEMENT_QUOTATION_MARK} Icon={'«»'}>
            <QuotationMarksMenu />
          </Modal>
          <Divider type={DividerType.vertical} />
          <ToolbarListButtons />
          <Divider type={DividerType.vertical} />
          <ToolbarBasicMarksButtons />
          <Divider type={DividerType.vertical} />
          <FontColorToolbar />
          <Divider type={DividerType.vertical} />
          <ToolbarAlignButtons />
          <Divider type={DividerType.vertical} />
          <ToolbarTableButtons />
          <Divider type={DividerType.vertical} />
          <Modal type={ELEMENT_LINK} Icon={<LinkIcon />}>
            <ToolbarLink />
          </Modal>
          <Divider type={DividerType.vertical} />
          <Modal type={ELEMENT_IMAGE} Icon={<ImageIcon />}>
            <ToolbarImage CustomComponent={toolbars?.ImageToolbar} />
          </Modal>
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
