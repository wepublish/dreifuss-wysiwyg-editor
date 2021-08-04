import React from 'react'

export const RenderFontColorLeaf = ({attributes, children, leaf}: any) => (
  <span {...attributes} style={{color: leaf?.color}}>
    {children}
  </span>
)
