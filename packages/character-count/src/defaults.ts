import {SlatePluginOptions} from '@udecode/slate-plugins-core'

export const CHARACTER_COUNT = 'characterCount'

export const DEFAULTS_CHARACTER_COUNT: Partial<SlatePluginOptions> = {
  getNodeProps: ({element}) => ({url: element?.url})
}
