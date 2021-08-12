import * as React from 'react'
import {LinkNodeData} from '@udecode/plate-link'
import {StyledElementProps} from '@udecode/plate-styled-components'
import {getLinkElementStyles} from './LinkElement.styles'

export const LinkElement = (props: StyledElementProps<LinkNodeData>) => {
  const {attributes, children, element, nodeProps} = props

  const {root} = getLinkElementStyles(props)

  return (
    // @ts-ignore
    <a {...attributes} href={element.url} css={root.css} className={root.className} {...nodeProps}>
      {children}
    </a>
  )
}
