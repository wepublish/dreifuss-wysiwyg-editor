/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createContext, useContext, useMemo} from 'react'
import {
  getRangeFromBlockStart,
  getText,
  isUrl as isUrlProtocol,
  unwrapNodes
} from '@udecode/plate-common'
import {getPlatePluginType, SPEditor, WithOverride} from '@udecode/plate-core'
import {withRemoveEmptyNodes} from '@udecode/plate-normalizers'
import {wrapLink} from './transforms/wrapLink'
import {ELEMENT_LAYOUT} from './defaults'
import {WithLinkOptions} from './types'
import {Editor, Element, Node, Transforms, Range, Point, NodeEntry, Path} from 'slate'
import {ReactEditor, RenderElementProps, useFocused, useSelected} from 'slate-react'

export const paragraphElement = () => ({
  type: 'paragraph' as const,
  children: [{text: ''}]
})

export function moveChildren(
  editor: Editor,
  parent: NodeEntry | Path,
  to: Path,
  shouldMoveNode: (node: Node) => boolean = () => true
) {
  const parentPath = Path.isPath(parent) ? parent : parent[1]
  const parentNode = Path.isPath(parent) ? Node.get(editor, parentPath) : parent[0]
  if (!Editor.isBlock(editor, parentNode)) return

  for (let i = parentNode.children.length - 1; i >= 0; i--) {
    if (shouldMoveNode(parentNode.children[i])) {
      const childPath = [...parentPath, i]
      Transforms.moveNodes(editor, {at: childPath, to})
    }
  }
}

/**
 * Insert space after a url to wrap a link.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a link element will edit its children text but not its url.
 *
 */
export const withLink = (): WithOverride<ReactEditor & SPEditor> => editor => {
  const {normalizeNode, deleteBackward} = editor

  // const type = getPlatePluginType(editor, ELEMENT_LINK)

  //
  //
  //

  editor.deleteBackward = unit => {
    if (
      editor.selection &&
      Range.isCollapsed(editor.selection) &&
      // this is just an little optimisation
      // we're only doing things if we're at the start of a layout area
      // and the start of anything will always be offset 0
      // so we'll bailout if we're not at offset 0
      editor.selection.anchor.offset === 0
    ) {
      const [aboveNode, abovePath] = Editor.above(editor, {
        // @ts-ignore
        match: node => node.type === 'layout-area'
      }) || [editor, []]
      if (
        // @ts-ignore
        aboveNode.type === 'layout-area' &&
        Point.equals(Editor.start(editor, abovePath), editor.selection.anchor)
      ) {
        return
      }
    }
    deleteBackward(unit)
  }

  editor.normalizeNode = entry => {
    const [node, path] = entry

    // @ts-ignore
    if (Element.isElement(node) && node.type === 'layout') {
      // @ts-ignore
      if (node.layout === undefined) {
        Transforms.unwrapNodes(editor, {at: path})
        return
      }
      // @ts-ignore
      if (node.children.length < node.layout.length) {
        Transforms.insertNodes(
          editor,
          Array.from({
            // @ts-ignore
            length: node.layout.length - node.children.length
          }).map(() => ({
            type: 'layout-area',
            // @ts-ignore
            children: [paragraphElement()]
          })),
          {
            at: [...path, node.children.length]
          }
        )
        return
      }
      // @ts-ignore
      if (node.children.length > node.layout.length) {
        Array.from({
          // @ts-ignore
          length: node.children.length - node.layout.length
        })
          .map((_, i) => i)
          .reverse()
          .forEach(i => {
            // @ts-ignore
            const layoutAreaToRemovePath = [...path, i + node.layout.length]
            // @ts-ignore
            const child = node.children[i + node.layout.length] as Element
            moveChildren(
              editor,
              layoutAreaToRemovePath,
              [
                ...path,
                // @ts-ignore
                node.layout.length - 1,
                // @ts-ignore
                (node.children[node.layout.length - 1] as Element).children.length
              ],
              // @ts-ignore
              node => node.type !== 'paragraph' || Node.string(child) !== ''
            )

            Transforms.removeNodes(editor, {
              at: layoutAreaToRemovePath
            })
          })
        return
      }
    }
    normalizeNode(entry)
  }

  //
  //
  //
  // editor = withRemoveEmptyNodes({type})(editor)

  return editor
}
