import React, {useEffect} from 'react'
import Divider, {DividerType} from './atoms/Divider'
import {HeadingToolbar} from '@udecode/plate-toolbar'
import {createTablePlugin} from '@dreifuss-wysiwyg-editor/table'
import {createAlignPlugin} from '@udecode/plate-alignment'
import {createHeadingPlugin} from '@udecode/plate-heading'
import {createHighlightPlugin} from '@udecode/plate-highlight'
import {createParagraphPlugin} from '@udecode/plate-paragraph'
import {createCodeBlockPlugin} from '@udecode/plate-code-block'
import {createBlockquotePlugin} from '@udecode/plate-block-quote'
import {createMediaEmbedPlugin, ELEMENT_MEDIA_EMBED} from '@udecode/plate-media-embed'
import {createPlateOptions} from './utils/createPlateOptions'
import {
  EditorValue,
  CharactersCountIcon,
  Modal,
  LinkIcon,
  SearchIcon,
  MediaEmbedIcon
} from '@dreifuss-wysiwyg-editor/common'
import {createBasicElementPlugins} from '@udecode/plate-basic-elements'
import {createPlateComponents} from './utils/createPlateComponents'
import {createListPlugin, createTodoListPlugin} from '@udecode/plate-list'
import {CharCountToolbar, getCharacterCount} from '@dreifuss-wysiwyg-editor/character-count-ui'
import {createHistoryPlugin, createReactPlugin, Plate} from '@udecode/plate-core'
import {ToolbarLink} from '@dreifuss-wysiwyg-editor/link-ui'
import {createLinkPlugin, ELEMENT_LINK} from '@dreifuss-wysiwyg-editor/link'
import {FontColorToolbar} from '@dreifuss-wysiwyg-editor/font-color-ui'
import {createFontColorPlugin} from '@dreifuss-wysiwyg-editor/font-color'
import {QuotationMarksMenu} from '@dreifuss-wysiwyg-editor/quotation-mark-ui'
import {ELEMENT_QUOTATION_MARK} from '@dreifuss-wysiwyg-editor/quotation-mark'
import {createDeserializeMDPlugin} from '@udecode/plate-md-serializer'
import {useFindReplacePlugin} from '@udecode/plate-find-replace'
import {ToolbarSearchHighlight} from '@udecode/plate-find-replace-ui'
import {MediaEmbedToolbar} from '@dreifuss-wysiwyg-editor/media-embed-ui'
import {createSelectOnBackspacePlugin} from '@udecode/plate-select'
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
  ToolbarAlignButtons,
  ToolbarBasicElementsButtons,
  ToolbarBasicMarksButtons,
  ToolbarListButtons,
  ToolbarTableButtons
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
  const components = createPlateComponents()
  const options = createPlateOptions()

  const {setSearch, plugin: searchHighlightPlugin} = useFindReplacePlugin()

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
    createHeadingPlugin({levels: 3}),
    createDeserializeMDPlugin(),
    searchHighlightPlugin,
    createSelectOnBackspacePlugin({allow: [ELEMENT_MEDIA_EMBED]})
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
          <Modal type={'ELEMENT_IMAGE'} Icon={<SearchIcon />}>
            <ToolbarSearchHighlight icon={() => <></>} setSearch={setSearch} />
          </Modal>

          <Divider type={DividerType.vertical} />
          <Modal type={ELEMENT_LINK} Icon={<MediaEmbedIcon />}>
            <MediaEmbedToolbar />
          </Modal>
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
