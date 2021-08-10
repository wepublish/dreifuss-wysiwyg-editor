import {getRenderElement, getSlatePluginTypes, SlatePlugin} from '@udecode/slate-plugins-core'
import {ELEMENT_QUOTATION_MARK} from './defaults'
import {getLinkDeserialize} from './getLinkDeserialize'
import {WithLinkOptions} from './types'
// import {withLink} from './withLink'

/**
 * Enables support for hyperlinks.
 */
export const createLinkPlugin = (options?: WithLinkOptions): SlatePlugin => ({
  pluginKeys: ELEMENT_QUOTATION_MARK,
  renderElement: getRenderElement(ELEMENT_QUOTATION_MARK),
  deserialize: getLinkDeserialize(),
  inlineTypes: getSlatePluginTypes(ELEMENT_QUOTATION_MARK)
  // withOverrides: withLink(options)
})
