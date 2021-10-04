"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const index_1 = require("./index");
const value = [
    // {
    //   type: 'paragraph',
    //   children: [{type: 'link', url: 'http://google.com', children: [{text: 'Links: Add links.'}]}]
    // },
    { type: 'paragraph', children: [{ text: 'Bold: Make the selected text bold.', bold: true }] },
    { type: 'img', url: 'https://picsum.photos/1000/300', children: [{ text: '' }] },
    { type: 'paragraph', children: [{ text: '' }] } // {type: 'paragraph', children: [{text: 'Italic: Make the selected text italic.', italic: true}]},
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
];
/**
 *   these are just examples on how to pass custom toolbars
 */
const toolbars = {
    ImageToolbar: ({ onChange }) => {
        const [url, setURL] = react_1.useState('');
        return (jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: jsx_runtime_1.jsxs("form", Object.assign({ className: "image-toolbar" }, { children: [jsx_runtime_1.jsxs("div", Object.assign({ className: "form-group" }, { children: [jsx_runtime_1.jsx("h4", { children: "Image Uploader" }, void 0), jsx_runtime_1.jsx("div", Object.assign({ className: "input-group" }, { children: jsx_runtime_1.jsx("input", { name: "url", value: url, onChange: e => setURL(e.target.value) }, void 0) }), void 0)] }), void 0), jsx_runtime_1.jsx("div", Object.assign({ className: "toolbar", role: "toolbar" }, { children: jsx_runtime_1.jsx("button", Object.assign({ type: "submit", onClick: () => {
                                onChange(url);
                            } }, { children: "Insert" }), void 0) }), void 0)] }), void 0) }, void 0));
    }
};
const DreifussWysiwygEditorDemo = () => (jsx_runtime_1.jsxs("div", Object.assign({ style: { overflowX: 'hidden', minHeight: 400 } }, { children: [jsx_runtime_1.jsx("h1", { children: "RichText Component Demo" }, void 0), jsx_runtime_1.jsx(index_1.DreifussWysiwygEditor, { toolbars: toolbars, 
            // charactersCount={count => {
            //   console.log(count)
            // }}
            onChange: (data) => {
                // console.log(data)
                // console.log(JSON.stringify(data))
            }, initialValue: value }, void 0)] }), void 0));
react_dom_1.render(jsx_runtime_1.jsx(DreifussWysiwygEditorDemo, {}, void 0), document.getElementById('root'));
//# sourceMappingURL=DreifussWysiwygEditorDemo.js.map