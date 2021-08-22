/** @jsx jsx */

import {jsx} from '@udecode/slate-plugins-test-utils'
import {withReact} from 'slate-react'
import {withImageUpload} from '../../withImageUpload'

jsx

const input = (
  <editor>
    <hp>test</hp>
  </editor>
) as any

const output = (
  <editor>
    <hp>test</hp>
    <himg url="https://i.imgur.com/removed.png">
      <htext />
    </himg>
  </editor>
) as any

it('should insert image from the text', () => {
  const editor = withImageUpload()(withReact(input))

  const data = {
    getData: () => 'https://i.imgur.com/removed.png'
  }
  editor.insertData(data as any)

  expect(input.children).toEqual(output.children)
})
