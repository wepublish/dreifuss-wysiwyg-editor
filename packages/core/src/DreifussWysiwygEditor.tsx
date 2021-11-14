import React, {ReactNode, useEffect} from 'react'
import Divider, {DividerType} from './atoms/Divider'
import {HeadingToolbar} from '@udecode/plate-toolbar'
import {ELEMENT_MEDIA_EMBED} from '@udecode/plate-media-embed'
import {createPlateOptions} from './utils/createPlateOptions'
import {
  CharactersCountIcon,
  Modal,
  ImageIcon,
  SearchIcon,
  MediaEmbedIcon,
  EmojiPicker,
  EmojiIcon,
  EditorValue
} from '@dreifuss-wysiwyg-editor/common'
import {createPlateComponents} from './utils/createPlateComponents'
import {CharCountToolbar, getCharacterCount} from '@dreifuss-wysiwyg-editor/character-count-ui'
import {Plate, TNode, useStoreEditorRef} from '@udecode/plate-core'
import {ToolbarLink} from '@dreifuss-wysiwyg-editor/link-ui'
import {ELEMENT_IMAGE} from '@dreifuss-wysiwyg-editor/image'
import {ToolbarImage} from '@dreifuss-wysiwyg-editor/image-ui'
import {FontColorToolbar} from '@dreifuss-wysiwyg-editor/font-ui'
import {MARK_COLOR, MARK_BG_COLOR} from '@dreifuss-wysiwyg-editor/font'
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
  ToolbarFontBgButton,
  ToolbarFontColorButton,
  ToolbarTodoListButton
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

export interface EnablePluginsProps {
  dnd?: boolean
  search?: boolean
  list?: boolean
  todoList?: boolean
  codeBlock?: boolean
  color?: boolean
  bgColor?: boolean
  align?: boolean
  emoji?: boolean
  link?: boolean
  image?: boolean
  media?: boolean
  quote?: boolean
  quotationMarks?: boolean
  basicMarks?: boolean
  basicElements?: boolean
  table?: {tableBorderColor?: boolean; tableBgColor?: boolean}
}

export interface DreifussWysiwygEditorOptions {
  id: string
  displayOnly?: boolean
  showCharactersCount?: boolean
  displayOneLine?: boolean
  disabled?: boolean
  value?: EditorValue
  charactersCount?: any
  onChange?: React.Dispatch<React.SetStateAction<any>>
  toolbars?: Toolbars
  enablePlugins?: EnablePluginsProps
}

/** Removes nodes' ids before getting value out */
const handleOnChange = (value: EditorValue) => {
  return value.map(({id, ...block}) => {
    if (block.children?.length) return {...block, children: handleOnChange(block.children)}
    else return block
  })
}

function DreifussEditor(props: DreifussWysiwygEditorOptions) {
  const defaultOptions: Omit<DreifussWysiwygEditorOptions, 'id'> = {
    displayOnly: false,
    showCharactersCount: true,
    displayOneLine: false,
    disabled: false,
    value: [
      {
        type: 'paragraph',
        children: [{text: ''}]
      }
    ],
    enablePlugins: {
      basicElements: true,
      basicMarks: true,
      list: true,
      todoList: true,
      quote: true,
      quotationMarks: true,
      codeBlock: true,
      color: false,
      bgColor: false,
      align: true,
      table: {tableBorderColor: false, tableBgColor: false},
      emoji: false,
      link: false,
      image: false,
      media: false,
      search: true,
      dnd: false
    }
  }

  const availableOptions: DreifussWysiwygEditorOptions = Object.assign(defaultOptions, props)

  const {
    id,
    value,
    disabled,
    displayOnly,
    displayOneLine,
    charactersCount,
    showCharactersCount,
    enablePlugins,
    toolbars
  } = availableOptions

  const editorRef = useStoreEditorRef(id)

  const {setSearch, plugin: findReplacePlugin} = useFindReplacePlugin()

  const components = enablePlugins.dnd
    ? withStyledDraggables(createPlateComponents(enablePlugins))
    : createPlateComponents(enablePlugins)

  const options = createPlateOptions(enablePlugins)

  const editableProps = {
    placeholder: "What's on your mind?",
    spellCheck: false,
    autoFocus: true,
    readOnly: displayOnly ?? disabled ?? false,
    style: displayOneLine
      ? {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: 'inherit',
          fontFamily: 'Helvetica'
        }
      : {fontFamily: 'Helvetica'}
  }

  const charCount = getCharacterCount(id)

  useEffect(() => {
    if (charactersCount) charactersCount(charCount)
  }, [charCount])

  return (
    <div className="dreifuss-wrapper">
      <Plate
        id={id}
        onChange={(val: TNode[]) => props.onChange(handleOnChange(val))}
        plugins={plugins(enablePlugins, {findReplace: findReplacePlugin})}
        components={components}
        options={options}
        editableProps={editableProps as EditableProps}
        initialValue={JSON.parse(
          JSON.stringify(value?.map(block => ({...block, id: Math.random()})))
        )}>
        <ToolbarBalloon editor={editorRef} />
        {!displayOnly && (
          <HeadingToolbar>
            {enablePlugins.basicElements && <ToolbarBasicElementsButtons editor={editorRef} />}

            {enablePlugins.quotationMarks && (
              <>
                <Modal type={ELEMENT_QUOTATION_MARK} Icon={'«»'}>
                  <QuotationMarksMenu />
                </Modal>
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enablePlugins.list && <ToolbarListButtons editor={editorRef} />}

            {!enablePlugins.todoList && <Divider type={DividerType.vertical} />}

            {enablePlugins.todoList && (
              <>
                <ToolbarTodoListButton editor={editorRef} />
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enablePlugins.basicMarks && (
              <>
                <ToolbarBasicMarksButtons editor={editorRef} />
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enablePlugins.color && (
              <>
                <Modal Icon={<ToolbarFontColorButton editor={editorRef} />}>
                  <FontColorToolbar type={MARK_COLOR} />
                </Modal>
              </>
            )}

            {enablePlugins.bgColor && (
              <>
                <Modal Icon={<ToolbarFontBgButton editor={editorRef} />}>
                  <FontColorToolbar type={MARK_BG_COLOR} />
                </Modal>
              </>
            )}

            {enablePlugins.align && (
              <>
                <ToolbarAlignButtons editor={editorRef} />
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enablePlugins.table && (
              <>
                <ToolbarTableButtons editor={editorRef} enabledOptions={enablePlugins.table} />
                <Divider type={DividerType.vertical} />
              </>
            )}

            {enablePlugins.emoji && (
              <>
                <Modal type="EMOJI" Icon={<EmojiIcon />}>
                  <EmojiPicker />
                </Modal>
              </>
            )}

            {enablePlugins.link && (
              <>
                <Modal Icon={<ToolbarLinkButton editor={editorRef} />}>
                  <ToolbarLink />
                </Modal>
              </>
            )}

            {enablePlugins.image && (
              <>
                <Modal type={ELEMENT_IMAGE} Icon={<ImageIcon />}>
                  <ToolbarImage editorRef={editorRef} CustomComponent={toolbars?.ImageToolbar} />
                </Modal>
              </>
            )}

            {enablePlugins.media && (
              <>
                <Modal type={ELEMENT_MEDIA_EMBED} Icon={<MediaEmbedIcon />}>
                  <MediaEmbedToolbar editorRef={editorRef} />
                </Modal>
              </>
            )}

            {enablePlugins.search && (
              <Modal type={MARK_SEARCH_HIGHLIGHT} Icon={<SearchIcon />}>
                <ToolbarSearchHighlight setSearch={setSearch} />
              </Modal>
            )}
          </HeadingToolbar>
        )}
        {showCharactersCount && (
          <p style={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
            <CharactersCountIcon /> <CharCountToolbar id={id} />
          </p>
        )}
      </Plate>
    </div>
  )
}

export default function DreifussWysiwygEditor(props: DreifussWysiwygEditorOptions) {
  if (props?.enablePlugins?.dnd) {
    return (
      <DndProvider backend={HTML5Backend}>
        <DreifussEditor {...props} />
      </DndProvider>
    )
  }

  return <DreifussEditor {...props} />
}
