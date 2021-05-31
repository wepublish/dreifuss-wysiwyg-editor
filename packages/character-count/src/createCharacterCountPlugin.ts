import {getRenderElement, getSlatePluginTypes, SlatePlugin} from '@udecode/slate-plugins-core'
import {CHARACTER_COUNT} from './defaults'
import {WithCharacterCountOptions} from './types'
import {withCharacterCount} from './withCharacterCount'

/**
 * Enables support for hyperlinks.
 */
export const createCharacterCountPlugin = (options?: WithCharacterCountOptions): SlatePlugin => ({
  pluginKeys: CHARACTER_COUNT,
  renderElement: getRenderElement(CHARACTER_COUNT),
  inlineTypes: getSlatePluginTypes(CHARACTER_COUNT),
  withOverrides: withCharacterCount(options)
})
