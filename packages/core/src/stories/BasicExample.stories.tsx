/* eslint-disable react/jsx-filename-extension */
import React from 'react'

import {BasicExample} from './BasicExample'

export default {
  title: 'Example/Editor',
  component: BasicExample,
  argTypes: {
    backgroundColor: {control: 'color'}
  }
}

const Template = args => <BasicExample {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button'
}
