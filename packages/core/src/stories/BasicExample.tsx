import React from 'react'
import PropTypes from 'prop-types'
import DreifussWysiwygEditor from '../DreifussWysiwygEditor'

const value = [
  {
    type: 'paragraph',
    children: [{type: 'link', url: 'http://google.com', children: [{text: 'Links: Add links.'}]}]
  },
  {type: 'paragraph', children: [{text: 'Bold: Make the selected text bold.', bold: true}]},
  {type: 'paragraph', children: [{text: 'Italic: Make the selected text italic.', italic: true}]},
  {
    type: 'paragraph',
    children: [{text: 'Underline: Underline the selected text.', underline: true}]
  }
]

export const BasicExample = () => {
  return (
    <DreifussWysiwygEditor
      // onChange={(data: any) => {

      // }}
      initialValue={value}
    />
  )
}

BasicExample.charCount = value.length

BasicExample.propTypes = {
  /**
   * BasicExample contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func
}

BasicExample.defaultProps = {
  onClick: undefined,
  displayName: 'd'
}
