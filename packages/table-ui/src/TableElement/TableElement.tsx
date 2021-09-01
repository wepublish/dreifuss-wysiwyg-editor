import * as React from 'react'
import {StyledElementProps} from '@udecode/plate-styled-components'
// import {getTableElementStyles} from './TableElement.styles'

export const TableElement = (props: StyledElementProps) => {
  const {attributes, children, nodeProps} = props

  // const {root} = getTableElementStyles(props)

  return (
    <table
      {...attributes}
      style={{margin: '10px 0', borderCollapse: 'collapse', width: '100%'}}
      // TODO: let the .styles file work and use the commented following lines
      // css={root.css}
      // className={root.className}
      {...nodeProps}>
      <tbody>{children}</tbody>
    </table>
  )
}
