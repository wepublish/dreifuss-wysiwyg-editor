import {
  getRangeBefore,
  getRangeFromBlockStart,
  getText,
  isCollapsed,
  isUrl as isUrlProtocol,
  someNode,
  unwrapNodes
} from '@udecode/slate-plugins-common'
import {getSlatePluginType, SPEditor, WithOverride} from '@udecode/slate-plugins-core'
import {withRemoveEmptyNodes} from '@udecode/slate-plugins-normalizers'
import {Range} from 'slate'
import {ReactEditor} from 'slate-react'
import {upsertCharacterCountAtSelection} from './transforms/upsertLinkAtSelection'
import {wrapCharacterCount} from './transforms/wrapLink'
import {CHARACTER_COUNT} from './defaults'
import {WithCharacterCountOptions} from './types'

const upsertCharacterCount = (
  editor: SPEditor,
  {
    url,
    at
  }: {
    url: string
    at: Range
  }
) => {
  unwrapNodes(editor, {
    at,
    match: {type: getSlatePluginType(editor, CHARACTER_COUNT)}
  })

  const newSelection = editor.selection as Range

  wrapCharacterCount(editor, {
    at: {
      ...at,
      focus: newSelection.focus
    },
    url
  })
}

const upsertCharacterCountIfValid = (editor: SPEditor, {isUrl}: {isUrl: any}) => {
  const rangeFromBlockStart = getRangeFromBlockStart(editor)
  const textFromBlockStart = getText(editor, rangeFromBlockStart)

  if (rangeFromBlockStart && isUrl(textFromBlockStart)) {
    upsertCharacterCount(editor, {url: textFromBlockStart, at: rangeFromBlockStart})
    return true
  }
}

/**
 * Insert space after a url to wrap a CharacterCount.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a CharacterCount element will edit its children text but not its url.
 *
 */
export const withCharacterCount =
  ({
    isUrl = isUrlProtocol,
    rangeBeforeOptions = {
      matchString: ' ',
      skipInvalid: true,
      afterMatch: true,
      multiPaths: true
    }
  }: WithCharacterCountOptions = {}): WithOverride<ReactEditor & SPEditor> =>
  editor => {
    const {insertData, insertText} = editor

    const type = getSlatePluginType(editor, CHARACTER_COUNT)

    editor.insertText = text => {
      if (text === ' ' && isCollapsed(editor.selection)) {
        const selection = editor.selection as Range

        if (upsertCharacterCountIfValid(editor, {isUrl})) {
          return insertText(text)
        }

        const beforeWordRange = getRangeBefore(editor, selection, rangeBeforeOptions)

        if (beforeWordRange) {
          const beforeWordText = getText(editor, beforeWordRange)

          if (isUrl(beforeWordText)) {
            upsertCharacterCount(editor, {url: beforeWordText, at: beforeWordRange})
          }
        }
      }

      insertText(text)
    }

    editor.insertData = (data: DataTransfer) => {
      const text = data.getData('text/plain')

      if (text) {
        if (someNode(editor, {match: {type}})) {
          return insertText(text)
        }

        if (isUrl(text)) {
          return upsertCharacterCountAtSelection(editor, {url: text})
        }
      }

      insertData(data)
    }

    // editor.insertBreak = () => {
    //   if (upsertCharacterCountIfValid(editor, { CharacterCount, isUrl })) {
    //     console.info('fix cursor');
    //   }
    //
    //   insertBreak();
    // };

    editor = withRemoveEmptyNodes({type})(editor)

    return editor
  }
