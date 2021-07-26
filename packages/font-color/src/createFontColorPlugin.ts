import {
  getRenderElement,
  getRenderLeaf,
  getSlatePluginTypes,
  SlatePlugin
} from '@udecode/slate-plugins-core'
import {ELEMENT_FONT_COLOR} from './defaults'
import {getFontColorLeafDeserialize} from './getFontColorDeserialize'
// import {WithFontColorOptions} from './types'
// import {withFontColor} from './withFontColor'

/**
 * Enables support for font color.
 */
export const createFontColorPlugin = (): SlatePlugin => ({
  pluginKeys: ELEMENT_FONT_COLOR,
  renderElement: getRenderElement(ELEMENT_FONT_COLOR),
  deserialize: getFontColorLeafDeserialize(),
  inlineTypes: getSlatePluginTypes(ELEMENT_FONT_COLOR),
  renderLeaf: getRenderLeaf(ELEMENT_FONT_COLOR)
})