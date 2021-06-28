import * as React from 'react'
import {useStoreEditor} from '@udecode/slate-plugins-core'
import {insertImage} from '@udecode/slate-plugins-image'
import {ToolbarButtonProps} from '@udecode/slate-plugins-toolbar'
import {useState} from 'react'
// import {Transforms} from 'slate'

export interface ToolbarImageProps extends ToolbarButtonProps {
  /**
   * Default onMouseDown is getting the image url by calling this promise before inserting the image.
   */
  editorId: string
}

export const UploadImageMenu = ({editorId, ...props}: ToolbarImageProps) => {
  const editor: any = useStoreEditor(editorId)
  const [url, setURL] = useState('')

  return (
    <form className="link-toolbar">
      <div className="form-group">
        <label>Image URL:</label>
        <div className="input-group">
          <input name="imageURL" value={url} onChange={(e: any) => setURL(e.target.value)} />
        </div>
      </div>
      <div className="toolbar" role="toolbar">
        <button
          onClick={e => {
            e.preventDefault()
            // const image = {
            //   type: 'img',
            //   url,
            //   children: ['text']
            // }
            // console.log();
            insertImage(editor, url)
            // // @ts-ignore
            // Transforms.insertNodes<any>(editor, image)
          }}>
          Insert
        </button>
      </div>
    </form>
  )
}
