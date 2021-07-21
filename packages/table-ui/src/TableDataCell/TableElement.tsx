import * as React from 'react'
import {
  ClassName,
  getRootClassNames,
  RootStyleSet,
  StyledElementProps
} from '@udecode/slate-plugins-ui-fluent'
import {styled} from '@uifabric/utilities'
import {getTableDataCellStyles} from './TableElement.styles'

const getClassNames = getRootClassNames()

/**
 * TableDataCell with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */
export const TableDataCellBase = (props: any) => {
  const {element} = props

  const classNames = getClassNames(props.styles, {
    className: props.className
  })

  return (
    <td
      {...props.attributes}
      className={classNames.root}
      style={{
        // ...props.styles,
        padding: '8px',
        minWidth: '48px',
        selectors: {
          '> *': {
            margin: 0
          }
        },
        border: '1px solid',
        borderColor:
          element.borderColor === 'transparent'
            ? `rgb(0, 0, 0, 0.5)`
            : (element.borderColor as string)
      }}>
      {props.children}
    </td>
  )
}

/**
 * TableElement
 */
export const TableDataCell = styled<StyledElementProps, ClassName, RootStyleSet>(
  TableDataCellBase,
  getTableDataCellStyles,
  undefined,
  {
    scope: 'TableDataCell'
  }
)

export const TableData = (props: any) => {
  const {element} = props
  return (
    <td
      {...props.attributes}
      className={props.className}
      style={{
        border: '1px solid',
        borderColor:
          element.borderColor === 'transparent'
            ? `rgb(0, 0, 0, 0.5)`
            : (element.borderColor as string)
      }}>
      {props.children}
    </td>
  )
}
