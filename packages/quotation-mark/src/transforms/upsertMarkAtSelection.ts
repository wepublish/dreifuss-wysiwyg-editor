import {isCollapsed} from '@udecode/slate-plugins-common'
import {BaseEditor, BaseRange, Editor, Transforms} from 'slate'

export function insertQuotationMarks(
  editor: BaseEditor,
  selection: BaseRange | null,
  selectedQuotationMarks: string
) {
  if (!selection) return

  // Selected nodes
  const nodes = Array.from(
    Editor.nodes(editor, {
      at: selection
    })
  )

  const tuple = nodes[0]

  if (tuple) {
    Transforms.setSelection(editor, {
      anchor: selection.anchor,
      focus: selection.focus
    })

    if (isCollapsed(selection)) {
      switch (selectedQuotationMarks) {
        case '«»': {
          Transforms.insertText(editor, '»', {
            at: selection.anchor
          })
          Transforms.insertText(editor, '«', {
            at: selection.focus
          })
          break
        }
        case '‹›': {
          Transforms.insertText(editor, '›', {
            at: selection.anchor
          })
          Transforms.insertText(editor, '‹', {
            at: selection.focus
          })
          break
        }
        case '""': {
          Transforms.insertText(editor, '"', {
            at: selection.anchor
          })
          Transforms.insertText(editor, '"', {
            at: selection.focus
          })
          break
        }
        case '’’': {
          Transforms.insertText(editor, '’', {
            at: selection.anchor
          })
          Transforms.insertText(editor, '’', {
            at: selection.focus
          })
          break
        }
      }
    } else {
      /**
       * Anchor and focus in slate works exactly like DOM anchor and focus points
       * Also, Selection can start from focus instead of anchor (end to start).
       */
      const isStartingFromAnchor = selection.anchor.offset > selection.focus.offset
      const startingPoint = isStartingFromAnchor ? selection.anchor : selection.focus
      const endingPoint = isStartingFromAnchor ? selection.focus : selection.anchor

      switch (selectedQuotationMarks) {
        case '«»': {
          Transforms.insertText(editor, '»', {
            at: startingPoint
          })
          Transforms.insertText(editor, '«', {
            at: endingPoint
          })
          break
        }
        case '‹›': {
          Transforms.insertText(editor, '›', {
            at: startingPoint
          })
          Transforms.insertText(editor, '‹', {
            at: endingPoint
          })
          break
        }
        case '""': {
          Transforms.insertText(editor, '"', {
            at: startingPoint
          })
          Transforms.insertText(editor, '"', {
            at: endingPoint
          })
          break
        }
        case '’’': {
          Transforms.insertText(editor, '’', {
            at: startingPoint
          })
          Transforms.insertText(editor, '’', {
            at: endingPoint
          })
          break
        }
      }
    }
  } else {
    Transforms.insertText(editor, selectedQuotationMarks)
    Transforms.select(editor, {
      anchor: selection.anchor,
      focus: selection.focus
    })
  }
}
