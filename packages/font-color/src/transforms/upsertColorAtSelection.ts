import {TEditor} from '@udecode/slate-plugins-core'
import {setNodes} from '@udecode/slate-plugins-common'

export function upsertFontColor(editor: TEditor, color: string) {
  if (!editor) {
    console.error('error in @dreifuss-wysiwyg-editor/fontcolor')
    return
  }

  if (color) {
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
  }
}
