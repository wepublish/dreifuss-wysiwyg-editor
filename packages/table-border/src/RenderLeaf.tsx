import React from 'react'

export const RenderBorderColorLeaf = ({attributes, children, leaf}: any) => (
  <span {...attributes} style={{borderColor: leaf?.borderColor}}>
    {children}
  </span>
)