import * as React from 'react'
import {LinkNodeData} from '@dreifuss-wysiwyg-editor/link'
import {StyledElementProps} from '@udecode/plate-styled-components'
import {getLinkElementStyles} from './LinkElement.styles'

export const LinkElement = (props: StyledElementProps<LinkNodeData>) => {
  const {attributes, children, element, nodeProps} = props

  const {root} = getLinkElementStyles(props)

  return (
    // TODO: check this
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <a {...attributes} href={element.url} css={root.css} className={root.className} {...nodeProps}>
      {children}
    </a>
  )
}
