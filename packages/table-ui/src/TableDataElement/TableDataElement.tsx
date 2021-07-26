import * as React from 'react'

export const TableDataElement = (props: any) => {
  const {backgroundColor = 'transparent', borderColor} = props?.element
  return (
    <td
      {...props.attributes}
      className={props.className}
      style={{
        border: '1px solid rgb(193, 199, 208)',
        padding: '8px',
        minWidth: '48px',
        selectors: {
          '> *': {
            margin: 0
          }
        },
        borderColor: borderColor === 'transparent' ? `rgb(0, 0, 0, 0.5)` : (borderColor as string),
        backgroundColor:
          backgroundColor === 'transparent' ? `rgb(255, 255, 255)` : (backgroundColor as string)
      }}>
      {props.children}
    </td>
  )
}
