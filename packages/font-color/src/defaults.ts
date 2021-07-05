import {SlatePluginOptions} from '@udecode/slate-plugins-core'

export const ELEMENT_FONT_COLOR = 'color'

export const DEFAULTS_FONT_COLOR: Partial<SlatePluginOptions> = {
  getNodeProps: ({element}) => ({color: element?.color})
}
