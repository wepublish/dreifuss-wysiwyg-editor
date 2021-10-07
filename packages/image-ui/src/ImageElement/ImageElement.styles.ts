import {createStyles} from '@udecode/plate-styled-components'
import {css} from 'styled-components'
import tw from 'twin.macro'
import {ImageElementStyleProps} from './ImageElement.types'

export const getImageElementStyles = (props: ImageElementStyleProps) => {
  const {
    focused,
    selected,
    caption = {
      align: 'center'
    }
  } = props

  const color = 'rgb(157, 170, 182)'
  const colorActive = 'white'
  const background = 'rgb(36, 42, 49)'
  const borderColor = 'transparent'

  const marginTopLeft = 9

  return createStyles(
    {prefixClassNames: 'ImageElement', ...props},
    {
      root: [tw`py-2.5`],
      figure: [tw`m-0 relative inline-block`],
      img: [
        tw`max-w-full px-0 cursor-pointer w-full`,
        tw`borderRadius[3px] object-cover`,
        focused && selected && tw`boxShadow[0 0 0 1px rgb(59,130,249)]`
      ],
      caption: [
        tw`w-full border-none focus:outline-none mt-2 p-0 resize-none`,
        caption?.align === 'center' && tw`text-center`,
        caption?.align === 'right' && tw`text-right`,
        css`
          font: inherit;
          color: inherit;
          background-color: inherit;

          :focus {
            ::placeholder {
              opacity: 0;
            }
          }
        `
      ],
      optionsToolbar: [
        tw`flex items-center select-none box-content`,
        tw`color[rgb(68, 68, 68)] minHeight[28px]`,
        tw`absolute whitespace-nowrap py-0 px-1`,
        props.hidden && tw`invisible`,
        !props.hiddenDelay && tw`transition[top 75ms ease-out,left 75ms ease-out]`,
        css`
          color: ${color};
          background: ${background};
          z-index: 500;
          border: 1px solid ${borderColor};
          border-radius: 4px;
          margin-top: ${marginTopLeft}px;
          margin-left: ${marginTopLeft}px;
          .slate-ToolbarButton-active,
          .slate-ToolbarButton:hover {
            color: ${colorActive};
          }
        `
      ],
      optionsToolbarButton: [
        tw`bg-transparent text-gray-300 hover:text-white`,
        css`
          border: 0px;
        `
      ]
    }
  )
}
