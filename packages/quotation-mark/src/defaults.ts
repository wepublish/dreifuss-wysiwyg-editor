import {SlatePluginOptions} from '@udecode/slate-plugins-core'

export const ELEMENT_QUOTATION_MARK = 'q'

export const DEFAULTS_LINK: Partial<SlatePluginOptions> = {
  getNodeProps: ({element}) => ({url: element?.url})
}
