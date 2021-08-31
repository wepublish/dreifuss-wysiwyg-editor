import * as React from 'react'
import {
  ClassName,
  getRootClassNames,
  RootStyleSet,
  StyledElementProps
} from '@udecode/plate-ui-fluent'
import {styled} from '@uifabric/utilities'
import {getTableElementStyles} from './TableElement.styles'

const getClassNames = getRootClassNames()

/**
 * TableElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */
export const TableElementBase = ({
  attributes,
  children,
  className,
  styles,
  nodeProps
}: StyledElementProps) => {
  const classNames = getClassNames(styles, {
    className
  })

  return (
    <table {...attributes} className={classNames.root} {...nodeProps}>
      <tbody>{children}</tbody>
    </table>
  )
}

/**
 * TableElement
 */
export const TableElement = styled<StyledElementProps, ClassName, RootStyleSet>(
  TableElementBase,
  getTableElementStyles,
  undefined,
  {
    scope: 'TableElement'
  }
)
