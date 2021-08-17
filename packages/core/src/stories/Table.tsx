import React from 'react'
import PropTypes from 'prop-types'
import DreifussWysiwygEditor from '../DreifussWysiwygEditor'

const value = [
  {
    type: 'table',
    children: [
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            borderColor: '#000000',
            children: [{type: 'paragraph', children: [{text: ''}]}],
            backgroundColor: '#f31212'
          },
          {
            type: 'table-cell',
            children: [{type: 'paragraph', children: [{text: ''}]}],
            backgroundColor: '#f31212'
          }
        ]
      },
      {
        type: 'table-row',
        children: [
          {
            type: 'table-cell',
            borderColor: '#000000',
            children: [{type: 'paragraph', children: [{text: ''}]}],
            backgroundColor: '#f31212'
          },
          {
            type: 'table-cell',
            children: [{type: 'paragraph', children: [{text: ''}]}],
            backgroundColor: '#f31212'
          }
        ]
      }
    ]
  }
]

export const Table = () => {
  return (
    <DreifussWysiwygEditor
      // onChange={(data: any) => {

      // }}
      initialValue={value}
    />
  )
}
