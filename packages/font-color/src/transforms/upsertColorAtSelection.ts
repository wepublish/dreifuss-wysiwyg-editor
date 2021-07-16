import {TEditor} from '@udecode/slate-plugins-core'
import {Transforms} from 'slate'

export function upsertFontColor(editor: TEditor, color: string) {
  if (color) {
    Transforms.setNodes(
      editor,
      //@ts-ignore
      {color},
      {
        match: () => true,
        split: true
      }
    )
  }
}
