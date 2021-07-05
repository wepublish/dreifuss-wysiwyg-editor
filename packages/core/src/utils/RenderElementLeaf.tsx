import React from 'react'
import {RenderFontColorLeaf} from '@dreifuss-wysiwyg-editor/slate-plugins-font-color-ui'

export const renderLeaf = ({attributes, children, leaf}) => {
  console.log(attributes, children, leaf)

  if (leaf?.color) {
    return <RenderFontColorLeaf {...attributes} />
  } else {
    return (
      <span
        {...attributes}
        style={{
          fontWeight: leaf.bold ? 'bold' : 'normal',
          fontStyle: leaf.italic ? 'italic' : 'normal',
          color: leaf?.color
        }}>
        {children}
      </span>
    )
  }
}
