import {SlatePluginOptions} from '@udecode/slate-plugins-core'

export const ELEMENT_LINK = 'link'

export const DEFAULTS_LINK: Partial<SlatePluginOptions> = {
  getNodeProps: ({element}) => ({url: element?.url})
}
