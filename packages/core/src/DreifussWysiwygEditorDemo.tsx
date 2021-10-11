import React from 'react'
import {render} from 'react-dom'
import {DreifussWysiwygEditor} from './index'

const value: any = [
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

const DreifussWysiwygEditorDemo = () => (
  <div style={{display: 'flex'}}>
    <div style={{minHeight: 400, padding: 30}}>
      <h1>RichText Component Demo</h1>
      <DreifussWysiwygEditor
        onChange={e => {
          console.log(e)
        }}
        initialValue={value}
      />
    </div>

    <div style={{minHeight: 400, padding: 30}}>
      <h1>RichText Component Demo</h1>
      <DreifussWysiwygEditor
        onChange={e => {
          console.log(e)
        }}
        id="two"
        initialValue={value}
      />
    </div>
  </div>
)

render(<DreifussWysiwygEditorDemo />, document.getElementById('root'))
