import React, {ReactNode, useEffect} from 'react'
import Divider, {DividerType} from './atoms/Divider'
import {HeadingToolbar} from '@udecode/plate-toolbar'
import {ELEMENT_MEDIA_EMBED} from '@udecode/plate-media-embed'
import {createPlateOptions} from './utils/createPlateOptions'
import {
  EditorValue,
  CharactersCountIcon,
  Modal,
  ImageIcon,
  SearchIcon,
  MediaEmbedIcon,
  EmojiPicker,
  EmojiIcon
} from '@dreifuss-wysiwyg-editor/common'
import {createPlateComponents} from './utils/createPlateComponents'
import {CharCountToolbar, getCharacterCount} from '@dreifuss-wysiwyg-editor/character-count-ui'
import {Plate, TNode, useStoreEditorRef} from '@udecode/plate-core'
import {ToolbarLink} from '@dreifuss-wysiwyg-editor/link-ui'
import {ELEMENT_IMAGE} from '@dreifuss-wysiwyg-editor/image'
import {ToolbarImage} from '@dreifuss-wysiwyg-editor/image-ui'
import {FontColorToolbar} from '@dreifuss-wysiwyg-editor/font-color-ui'
import {QuotationMarksMenu} from '@dreifuss-wysiwyg-editor/quotation-mark-ui'
import {ELEMENT_QUOTATION_MARK} from '@dreifuss-wysiwyg-editor/quotation-mark'
import {useFindReplacePlugin, MARK_SEARCH_HIGHLIGHT} from '@dreifuss-wysiwyg-editor/find-replace'
import {ToolbarSearchHighlight} from '@dreifuss-wysiwyg-editor/find-replace-ui'
import {MediaEmbedToolbar} from '@dreifuss-wysiwyg-editor/media-embed-ui'
import {
  ToolbarLinkButton,
  ToolbarBalloon,
  ToolbarAlignButtons,
  ToolbarBasicElementsButtons,
  ToolbarBasicMarksButtons,
  ToolbarListButtons,
  ToolbarTableButtons,
  ToolbarFontColorButton
} from './Toolbar'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {withStyledDraggables} from './utils/WithStyledDraggables'
import {plugins} from './utils/createPlatePlugins'

export interface EditableProps {
  id?: string
  displayOnly?: boolean
  showCharactersCount?: boolean
  displayOneLine?: boolean
  disabled?: boolean
}

export interface Toolbars {
  ImageToolbar: ReactNode
}

export interface EditorEnabledOptions {
  list?: boolean
  code?: boolean
  color?: boolean
  align?: boolean
  emoji?: boolean
  link?: boolean
  image?: boolean
  media?: boolean
  quote?: boolean
  quotationMarks?: boolean
  basicMarks?: boolean
  basicElements?: boolean
  table?: {tableBorderColor?: boolean; tableBgColor?: boolean} | boolean
}

export interface EditorProps {
  id?: string
  displayOnly?: boolean
  showCharactersCount?: boolean
  displayOneLine?: boolean
  disabled?: boolean
  value?: EditorValue
  charactersCount?: any
  onChange?: React.Dispatch<React.SetStateAction<any>>
  toolbars?: Toolbars
  enabledOptions?: EditorEnabledOptions
}

/** Removes nodes' ids before getting value out */
const handleOnChange = (value: TNode[]) => {
  return value.map(({id, ...block}) => {
    if (block.children?.length) return {...block, children: handleOnChange(block.children)}
    else return block
  })
}

export default function DreifussWysiwygEditor(props: EditorProps) {
  const {id = 'main', showCharactersCount = true, toolbars, enabledOptions = {}} = props

  const editorRef = useStoreEditorRef(props.id)

  const components = withStyledDraggables(createPlateComponents({enabledOptions}))

  const options = createPlateOptions({enabledOptions})

  const {setSearch} = useFindReplacePlugin()

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

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        id={props.id}
        onChange={(val: TNode[]) => props.onChange(handleOnChange(val))}
        plugins={plugins(enabledOptions)}
        components={components}
        options={options}
        editableProps={editableProps as EditableProps}
        initialValue={JSON.parse(
          JSON.stringify(props.value.map(block => ({...block, id: Math.random()})))
        )}>
        <ToolbarBalloon editor={editorRef} />
        {!props.displayOnly && (
          <HeadingToolbar>
            {enabledOptions.basicElements && <ToolbarBasicElementsButtons editor={editorRef} />}

            {enabledOptions.quotationMarks && (
              <>
                <Modal type={ELEMENT_QUOTATION_MARK} Icon={'«»'}>
                  <QuotationMarksMenu />
                </Modal>
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enabledOptions.list && (
              <>
                <ToolbarListButtons editor={editorRef} />
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enabledOptions.basicMarks && (
              <>
                <ToolbarBasicMarksButtons editor={editorRef} />
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enabledOptions.color && (
              <>
                <Modal editor={editorRef} Icon={<ToolbarFontColorButton editor={editorRef} />}>
                  <FontColorToolbar />
                </Modal>
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enabledOptions.align && (
              <>
                <ToolbarAlignButtons editor={editorRef} />
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enabledOptions.table && (
              <>
                <ToolbarTableButtons enabledOptions={enabledOptions.table} />
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enabledOptions.image && (
              <>
                <Modal type={ELEMENT_IMAGE} Icon={<EmojiIcon />}>
                  <EmojiPicker />
                </Modal>
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enabledOptions.link && (
              <>
                <Modal editor={editorRef} Icon={<ToolbarLinkButton editor={editorRef} />}>
                  <ToolbarLink />
                </Modal>
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enabledOptions.image && (
              <>
                <Modal type={ELEMENT_IMAGE} Icon={<ImageIcon />}>
                  <ToolbarImage CustomComponent={toolbars?.ImageToolbar} />
                </Modal>
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enabledOptions.media && (
              <>
                <Modal type={ELEMENT_MEDIA_EMBED} Icon={<MediaEmbedIcon />}>
                  <MediaEmbedToolbar />
                </Modal>
                <Divider type={DividerType.vertical} />
              </>
            )}

            <Modal type={MARK_SEARCH_HIGHLIGHT} Icon={<SearchIcon />}>
              <ToolbarSearchHighlight setSearch={setSearch} />
            </Modal>
          </HeadingToolbar>
        )}
        {showCharactersCount && (
          <p style={{textAlign: 'right'}}>
            <CharactersCountIcon /> <CharCountToolbar id={id} />
          </p>
        )}
      </Plate>
    </DndProvider>
  )
}
