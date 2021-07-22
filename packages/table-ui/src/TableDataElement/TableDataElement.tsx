import * as React from 'react'

export const TableDataElement = (props: any) => {
  const {element} = props
  return (
    <td
      {...props.attributes}
      className={props.className}
      style={{
        backgroundColor: 'rgb(255, 255, 255)',
        border: '1px solid rgb(193, 199, 208)',
        padding: '8px',
        minWidth: '48px',
        selectors: {
          '> *': {
            margin: 0
          }
        },
        borderColor:
          element.borderColor === 'transparent'
            ? `rgb(0, 0, 0, 0.5)`
            : (element.borderColor as string)
      }}>
      {props.children}
    </td>
  )
}
