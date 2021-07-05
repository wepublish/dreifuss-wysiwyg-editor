import {SlatePluginOptions} from '@udecode/slate-plugins-core'

export const ELEMENT_BORDER_COLOR = 'borderColor'

export const DEFAULTS_BORDER_COLOR: Partial<SlatePluginOptions> = {
  getNodeProps: ({element}) => ({borderColor: element?.borderColor})
}
