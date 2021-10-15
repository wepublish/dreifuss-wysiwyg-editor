import {PlatePluginOptions} from '@udecode/plate-core'

export const ELEMENT_FONT_COLOR = 'color'

export const DEFAULT_FONT_COLOR = '#000'

export const DEFAULTS_FONT_COLOR: Partial<PlatePluginOptions> = {
  getNodeProps: ({element}) => ({color: element?.color})
}
