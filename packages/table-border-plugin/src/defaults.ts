import {SlatePluginOptions} from '@udecode/slate-plugins-core'

export const ELEMENT_BORDER_COLOR = 'color'

export const DEFAULTS_BORDER_COLOR: Partial<SlatePluginOptions> = {
  getNodeProps: ({element}) => ({color: element?.color})
}