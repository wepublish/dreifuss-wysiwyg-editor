import React from 'react'

export const RenderFontLeaf = ({attributes, children, leaf}: any) => (
  <span {...attributes} style={{color: leaf?.color, backgroundColor: leaf?.bgColor}}>
    {children}
  </span>
)
