import React, {ReactNode} from 'react'
import {render} from 'react-dom'
import {DreifussWysiwygEditor} from './index'
import {CustomImageToolbarProps} from '@dreifuss-wysiwyg-editor/image-ui'

const value: any = [
  {
    type: 'layout',
    layout: [1, 1],
    children: [
      {
        type: 'layout-area',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'hello'
              }
            ]
          }
        ]
      },
      {
        type: 'layout-area',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'hii'
              }
            ]
          }
        ]
      }
    ]
  },
  {type: 'action_item', checked: true, children: [{text: 'Slide to the right.'}]},
  {type: 'action_item', children: [{text: 'Criss-cross.'}]},
  {type: 'action_item', children: [{text: 'Third item'}]},
  {
    type: 'paragraph',
    children: [
      {text: ''},
      {type: 'link', url: 'http://google.com', children: [{text: 'Links: Add linkss.'}]},
      {text: ''}
    ]
  },
  {type: 'paragraph', children: [{text: 'Bold: Make the selected text bold. no?', code: true}]},
  {type: 'paragraph', children: [{text: 'Italic: Make the selected text italicc.', italic: true}]},
  {
    type: 'paragraph',
    children: [{text: 'Underline: Underline the selected textt.', underline: true}]
  },
  {
    type: 'paragraph',
    children: [{text: 'Strikethrough: Strikethrough the selected textt.', strikethrough: true}]
  },
  {
    type: 'paragraph',
    children: [{text: 'Subscript: Subscript the selected text.', superscript: true}]
  },
  {
    type: 'paragraph',
    children: [{text: 'Superscript: Superscript the selected text.', subscript: true}]
  },
  {type: 'heading-one', children: [{text: 'H1: Make the text a header with size H1. '}]},
  {type: 'heading-two', children: [{text: 'H2: Make the text a header with size  H2.'}]},
  {type: 'heading-three', children: [{text: 'H3: Make the text a header with size  H3.'}]},
  {
    type: 'unordered-list',
    children: [{type: 'list-item', children: [{text: 'Bullet List: Insert a bullet list.'}]}]
  },
  {
    type: 'ordered-list',
    children: [{type: 'list-item', children: [{text: 'Numbered List: Insert a numbered list.'}]}]
  },
  {
    type: 'table',
    children: [
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            borderColor: '#000000',
            children: [{type: 'paragraph', children: [{text: ''}]}],
            backgroundColor: 'lightgray'
          },
          {
            type: 'table-cell',
            children: [{type: 'paragraph', children: [{text: ''}]}],
            backgroundColor: 'lightgray'
          }
        ]
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            borderColor: '#000000',
            children: [{type: 'paragraph', children: [{text: ''}]}],
            backgroundColor: 'lightgray'
          },
          {
            type: 'table-cell',
            children: [{type: 'paragraph', children: [{text: ''}]}],
            backgroundColor: 'lightgray'
          }
        ]
      }
    ]
  },
  {type: 'paragraph', children: [{text: 'Emojis: 😄'}]},
  {
    type: 'paragraph',
    children: [
      {text: 'Bold: '},
      {text: 'Make', color: '#c21414'},
      {text: ' the selected text bold.'}
    ]
  },
  {type: 'paragraph', children: [{text: ''}]},
  {type: 'media_embed', url: 'https://youtu.be/6vcBKwnl_Y0', children: [{text: ''}]},
  {type: 'paragraph', children: [{text: ''}]}
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
      <h1>WePublish Rich Text Editor</h1>
      <DreifussWysiwygEditor
        enablePlugins={{
          layout: true,
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
          console.log(JSON.stringify(e))
        }}
        id="two"
        value={value}
      />
    </div>
  </div>
)

render(<DreifussWysiwygEditorDemo />, document.getElementById('root'))
