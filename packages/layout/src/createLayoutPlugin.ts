import {getRenderElement, PlatePlugin} from '@udecode/plate-core'
import {KEYS_LAYOUT} from './defaults'
import {getLinkDeserialize} from './getLayoutDeserialize'
import {WithLinkOptions} from './types'
import {withLink} from './withLayout'

/**
 * Enables support for hyperlinks.
 */
export const createLayoutPlugin = (options?: WithLinkOptions): PlatePlugin => ({
  pluginKeys: KEYS_LAYOUT,
  renderElement: getRenderElement(KEYS_LAYOUT),
  deserialize: getLinkDeserialize(),
  // inlineTypes: getPlatePluginTypes(ELEMENT_LAYOUT),
  withOverrides: withLink()
})
