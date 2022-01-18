import React, {HTMLAttributes, forwardRef} from 'react'

type Props = {
  /** Without using a 3rd-party position lib, like popper, you can place the
   * dialog within a relatively positioned element to center it. This can be
   * beneficial for simple scenarios and performance. */
  isRelative?: boolean
} & HTMLAttributes<HTMLDivElement>

const InlineDialog = forwardRef<HTMLDivElement, Props>(({isRelative, ...props}: any, ref) => {
  const relativeStyles = isRelative
    ? {
        left: '50%',
        margin: 10,
        transform: 'translateX(-50%)'
      }
    : {}

  return (
    <div
      ref={ref}
      contentEditable={false}
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: `rgba(9, 30, 66, 0.31) 0px 0px 1px, rgba(9, 30, 66, 0.25) 0px 4px 8px -2px`,
        padding: 10,
        position: 'absolute',
        userSelect: 'none',
        zIndex: 1,
        ...relativeStyles
      }}
      {...props}
    />
  )
})

export default InlineDialog

export {InlineDialog}
