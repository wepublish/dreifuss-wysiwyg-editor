import React from 'react'
import {Table} from './Table'

export default {
    title: 'Example/Table',
    component: Table,
    argTypes: {
      backgroundColor: {control: 'color'}
    }
}

const Template = args => <Table {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
}
