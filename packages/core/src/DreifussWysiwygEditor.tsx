import React, {ReactNode} from 'react'
import Divider, {DividerType} from './atoms/Divider'
import {HeadingToolbar} from '@udecode/plate-toolbar'
import {createPlateOptions} from './utils/createPlateOptions'
import {
  CharactersCountIcon,
  Modal,
  ImageIcon,
  SearchIcon,
  EmojiPicker,
  EmojiIcon,
  EditorValue
} from '@dreifuss-wysiwyg-editor/common'
import {createPlateComponents} from './utils/createPlateComponents'
import {CharCountToolbar} from '@dreifuss-wysiwyg-editor/character-count-ui'
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
import {
  ToolbarLinkButton,
  ToolbarBalloon,
  ToolbarAlignButtons,
  ToolbarBasicElementsButtons,
  ToolbarBasicMarksButtons,
  ToolbarListButtons,
  ToolbarTableButtons,
  ToolbarFontBgButton,
  ToolbarFontColorButton
} from './Toolbar'
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
  search?: boolean
  list?: boolean
  color?: boolean
  bgColor?: boolean
  align?: boolean
  emoji?: boolean
  link?: boolean
  image?: boolean
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

export default function DreifussWysiwygEditor(props: DreifussWysiwygEditorOptions) {
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
      quotationMarks: true,
      color: false,
      bgColor: false,
      align: true,
      table: {tableBorderColor: false, tableBgColor: false},
      emoji: false,
      link: false,
      image: false,
      search: true
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

  const components = createPlateComponents(enablePlugins)

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

            {enablePlugins.search && (
              <Modal type={MARK_SEARCH_HIGHLIGHT} Icon={<SearchIcon />}>
                <ToolbarSearchHighlight setSearch={setSearch} />
              </Modal>
            )}
          </HeadingToolbar>
        )}
        {showCharactersCount && (
          <p style={{display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
            <CharactersCountIcon />
            <CharCountToolbar
              getCharsCount={count => {
                if (charactersCount) charactersCount(count)
              }}
              id={id}
            />
          </p>
        )}
      </Plate>
    </div>
  )
}
