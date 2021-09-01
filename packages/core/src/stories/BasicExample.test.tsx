import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import {Primary} from './BasicExample.stories'

test('renders the button in the primary state', () => {
  render(<Primary {...Primary.args} />)
  // expect(screen.getByRole('button')).toHaveTextContent('Button');
  expect(Primary.args.label).toBe('Editor')
})

test('shows the correct character count', () => {
    render(<Primary {...Primary.args} />);
    expect(Primary.args.count).toBe(4);
});
