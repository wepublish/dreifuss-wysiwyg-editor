import {insertNodes, isCollapsed, unwrapNodes} from '@udecode/slate-plugins-common'
// import {getSlatePluginType, SPEditor, TElement} from '@udecode/slate-plugins-core'
// import {ELEMENT_QUOTATION_MARK} from '../defaults'
// import {wrapLink} from './wrapLink'

// /**
//  * Unwrap link at a location (default: selection).
//  * Then, the focus of the location is set to selection focus.
//  * Then, wrap the link at the location.
//  */
// export const upsertLinkAtSelection = (
//   editor: SPEditor,
//   {
//     url,
//     wrap,
//     selection
//   }: {
//     url: string
//     /**
//      * If true, wrap the link at the location (default: selection) even if the selection is collapsed.
//      */
//     wrap?: boolean
//     selection?: any
//   }
// ) => {
//   if (!selection) return

//   const type = getSlatePluginType(editor, ELEMENT_QUOTATION_MARK)

//   if (!wrap && isCollapsed(selection)) {
//     return insertNodes<TElement>(editor, {
//       type,
//       url,
//       children: [{text: url}]
//     })
//   }

//   // if our cursor is inside an existing link, but don't have the text selected, select it now
//   if (wrap && isCollapsed(selection)) {
//     const linkLeaf = Editor.leaf(editor, selection)
//     const [, inlinePath] = linkLeaf
//     Transforms.select(editor, inlinePath)
//   }

//   unwrapNodes(editor, {at: selection, match: {type}})

//   wrapLink(editor, {at: selection, url})

//   Transforms.collapse(editor, {edge: 'end'})
// }

// export function removeLink(editor: SPEditor) {
//   if (!editor.selection) return null
//   const type = getSlatePluginType(editor, ELEMENT_QUOTATION_MARK)

//   unwrapNodes(editor, {
//     at: editor.selection,
//     match: {type}
//   })
// }
import {BaseEditor, BaseRange, Range, Editor, Transforms} from 'slate'

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
        case '""': {
          Transforms.insertText(editor, '"', {
            at: selection.anchor
          })
          Transforms.insertText(editor, '"', {
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
        case '’’': {
          Transforms.insertText(editor, '’', {
            at: selection.anchor
          })
          Transforms.insertText(editor, '’', {
            at: selection.focus
          })
          break
        }
        case '«»': {
          Transforms.insertText(editor, '»', {
            at: selection.anchor
          })
          Transforms.insertText(editor, '«', {
            at: selection.focus
          })
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
        case '""': {
          Transforms.insertText(editor, '"', {
            at: startingPoint
          })
          Transforms.insertText(editor, '"', {
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
        case '’’': {
          Transforms.insertText(editor, '’', {
            at: startingPoint
          })
          Transforms.insertText(editor, '’', {
            at: endingPoint
          })
          break
        }
        case '«»': {
          Transforms.insertText(editor, '»', {
            at: startingPoint
          })
          Transforms.insertText(editor, '«', {
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
