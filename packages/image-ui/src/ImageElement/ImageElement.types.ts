import {ImageNodeData} from '@dreifuss-wysiwyg-editor/image'
import {StyledElementProps} from '@udecode/plate-styled-components'
import {CSSProp} from 'styled-components'

export interface ImageElementStyleProps extends ImageElementProps {
  selected?: boolean
  focused?: boolean
}

export interface ImageElementStyles {
  figure: CSSProp
  img: CSSProp
  figcaption: CSSProp
  caption: CSSProp
  handle: CSSProp
  optionsToolbar: CSSProp
  optionsToolbarButton: CSSProp
}

export interface ImageElementProps extends StyledElementProps<ImageNodeData, ImageElementStyles> {
  caption?: {
    disabled?: boolean

    /**
     * Caption alignment.
     */
    align?: 'left' | 'center' | 'right'

    /**
     * Caption placeholder.
     */
    placeholder?: string
  }

  /**
   * Whether the image is draggable.
   */
  draggable?: boolean
}
