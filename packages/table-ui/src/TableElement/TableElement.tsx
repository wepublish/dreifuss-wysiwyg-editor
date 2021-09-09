import * as React from 'react'
import {StyledElementProps} from '@udecode/plate-styled-components'
import {getTableElementStyles} from './TableElement.styles'

export const TableElement = (props: StyledElementProps) => {
  const {attributes, children, nodeProps} = props

  const {root} = getTableElementStyles(props)

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // TODO: fix css attr
    <table {...attributes} css={root.css} className={root.className} {...nodeProps}>
      <tbody>{children}</tbody>
    </table>
  )
}
