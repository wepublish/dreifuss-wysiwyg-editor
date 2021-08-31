import {getRenderElement, getSlatePluginTypes, SlatePlugin} from '@udecode/plate-core'
import {ELEMENT_LINK} from './defaults'
import {getLinkDeserialize} from './getLinkDeserialize'
import {WithLinkOptions} from './types'
import {withLink} from './withLink'
import {onKeyDown} from './transforms'

/**
 * Enables support for hyperlinks.
 */
export const createLinkPlugin = (options?: WithLinkOptions): SlatePlugin => ({
  pluginKeys: ELEMENT_LINK,
  renderElement: getRenderElement(ELEMENT_LINK),
  deserialize: getLinkDeserialize(),
  inlineTypes: getSlatePluginTypes(ELEMENT_LINK),
  withOverrides: withLink(options),
  onKeyDown
})
