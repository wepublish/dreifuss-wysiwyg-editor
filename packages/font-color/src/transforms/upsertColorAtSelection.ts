import {TEditor} from '@udecode/slate-plugins-core'
import {setNodes, isCollapsed} from '@udecode/slate-plugins-common'
import {Editor, Transforms} from 'slate'

export function upsertFontColor(editor: TEditor, color: string) {
  if (!editor) {
    console.error('error in @dreifuss-wysiwyg-editor/fontcolor')
    return
  }

  // clone to store selection
  const previousSelection = Object.assign({}, editor.selection)

  if (color) {
    if (!editor.selection) return

    if (isCollapsed(editor?.selection)) {
      const linkLeaf = Editor.leaf(editor, editor.selection)
      const [, inlinePath] = linkLeaf
      Transforms.select(editor, inlinePath)
    }

    setNodes(
      editor,
      {
        color
      },
      {
        match: () => true,
        split: true
      }
    )
    console.log(previousSelection)

    // restore selection
    // Transforms.setSelection(editor, previousSelection)

    setTimeout(() => {
      console.log('5')
      Transforms.setPoint(editor, previousSelection.focus, {edge: 'focus'})
      // Transforms.move(editor)
    }, 0)
    Transforms.setPoint(editor, previousSelection.focus, {edge: 'focus'})

    // Transforms.collapse(editor, {edge: 'end'})
  }
}
