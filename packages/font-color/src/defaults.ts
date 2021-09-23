import {PlatePluginOptions} from '@udecode/plate-core'

export const ELEMENT_FONT_COLOR = 'color'

export const DEFAULTS_FONT_COLOR: Partial<PlatePluginOptions> = {
  getNodeProps: ({element}) => ({color: element?.color})
}
