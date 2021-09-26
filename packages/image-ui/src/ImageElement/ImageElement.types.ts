import {ImageNodeData} from '@dreifuss-wysiwyg-editor/image'
import {StyledElementProps} from '@udecode/plate-styled-components'
import {CSSProp} from 'styled-components'

export interface ImageElementStyleProps extends ImageElementProps {
  selected?: boolean
  focused?: boolean
}

export interface ImageElementStyles {
  img: CSSProp
}

export type ImageElementProps = StyledElementProps<ImageNodeData, ImageElementStyles>
