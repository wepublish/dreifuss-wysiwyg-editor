import React, {ReactNode} from 'react'
import {render} from 'react-dom'
import {DreifussWysiwygEditor} from './index'
import {CustomImageToolbarProps} from '@dreifuss-wysiwyg-editor/image-ui'

const value: any = [
  {type: 'action_item', checked: true, children: [{text: 'Slide to the right.'}], id: 10054},
  {type: 'action_item', children: [{text: 'Criss-cross.'}], id: 10055},
  // {
  //   type: 'paragraph',
  //   children: [{type: 'link', url: 'http://google.com', children: [{text: 'Links: Add links.'}]}]
  // },
  // {type: 'paragraph', children: [{text: 'Bold: Make the selected text bold.', bold: true}]}
  // {type: 'paragraph', children: [{text: 'Italic: Make the selected text italic.', italic: true}]},
  // {
  //   type: 'paragraph',
  //   children: [{text: 'Underline: Underline the selected text.', underline: true}]
  // },
  // {
  //   type: 'paragraph',
  //   children: [{text: 'Strikethrough: Strikethrough the selected text.', strikethrough: true}]
  // },
  // {
  //   type: 'paragraph',
  //   children: [{text: 'Subscript: Subscript the selected text.', superscript: true}]
  // },
  // {
  //   type: 'paragraph',
  //   children: [{text: 'Superscript: Superscript the selected text.', subscript: true}]
  // },
  // {type: 'heading-one', children: [{text: 'H1: Make the text a header with size H1. '}]},
  // {type: 'heading-two', children: [{text: 'H2: Make the text a header with size  H2.'}]},
  // {type: 'heading-three', children: [{text: 'H3: Make the text a header with size  H3.'}]},
  // {
  //   type: 'unordered-list',
  //   children: [{type: 'list-item', children: [{text: 'Bullet List: Insert a bullet list.'}]}]
  // },
  // {
  //   type: 'ordered-list',
  //   children: [{type: 'list-item', children: [{text: 'Numbered List: Insert a numbered list.'}]}]
  // },
  // {
  //   type: 'table',
  //   children: [
  //     {
  //       type: 'table-row',
  //       children: [
  //         {
  //           type: 'table-cell',
  //           borderColor: '#000000',
  //           children: [{type: 'paragraph', children: [{text: ''}]}],
  //           backgroundColor: '#f31212'
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [{type: 'paragraph', children: [{text: ''}]}],
  //           backgroundColor: '#f31212'
  //         }
  //       ]
  //     },
  //     {
  //       type: 'table-row',
  //       children: [
  //         {
  //           type: 'table-cell',
  //           borderColor: '#000000',
  //           children: [{type: 'paragraph', children: [{text: ''}]}],
  //           backgroundColor: '#f31212'
  //         },
  //         {
  //           type: 'table-cell',
  //           children: [{type: 'paragraph', children: [{text: ''}]}],
  //           backgroundColor: '#f31212'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {type: 'paragraph', children: [{text: 'Emojis: 😄'}]}

  {
    type: 'paragraph',
    children: [{type: 'link', url: 'http://google.com', children: [{text: 'Links: Add links.'}]}]
  },
  {
    type: 'paragraph',
    children: [
      {text: 'Bold: ', bold: true},
      // {bold: true, text: 'Make', color: '#c21414'},
      {bold: true, text: ' the selected text bold.'}
    ]
  }
]

/**
 *   these are just examples on how to pass custom toolbars
 */
const toolbars = {
  ImageToolbar: ({url, onChange, onSubmit}: CustomImageToolbarProps): ReactNode => {
    return (
      <>
        <form className="image-toolbar">
          <div className="form-group">
            <h4>Image Uploader</h4>
            <div className="input-group">
              <input name="url" value={url} onChange={e => onChange(e.target.value)} />
            </div>
          </div>
          <div className="toolbar" role="toolbar">
            <button
              className={`${url ? 'insert' : 'disabled'}`}
              onClick={e => {
                e.preventDefault()
                onSubmit()
              }}>
              Insert
            </button>
          </div>
        </form>
      </>
    )
  }
}

const DreifussWysiwygEditorDemo = () => (
  <div style={{display: 'flex'}}>
    <div style={{minHeight: 400, padding: 30}}>
      <h1>RichText Component Demo</h1>
      <DreifussWysiwygEditor
        enablePlugins={{
          basicElements: true,
          basicMarks: true,
          list: true,
          todoList: true,
          quote: true,
          quotationMarks: true,
          codeBlock: true,
          color: true,
          bgColor: true,
          align: true,
          table: {tableBorderColor: true, tableBgColor: true},
          emoji: true,
          link: true,
          image: true,
          media: true,
          dnd: false
        }}
        onChange={e => {
          // console.log(e)
        }}
        id="two"
        value={value}
      />
    </div>
  </div>
)

render(<DreifussWysiwygEditorDemo />, document.getElementById('root'))
