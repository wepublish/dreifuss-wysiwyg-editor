import * as React from 'react'
import {LinkNodeData} from '@dreifuss-wysiwyg-editor/link'
import {StyledElementProps} from '@udecode/plate-styled-components'
import {getLinkElementStyles} from './LinkElement.styles'

export const LinkElement = (props: StyledElementProps<LinkNodeData>) => {
  const {attributes, children, element, nodeProps} = props

  const {root} = getLinkElementStyles(props)

  return (
    <a {...attributes} href={element.url} css={root.css} className={root.className} {...nodeProps}>
      {children}
    </a>
  )
}
