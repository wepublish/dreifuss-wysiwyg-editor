import {
  getRenderElement,
  getRenderLeaf,
  getPlatePluginTypes,
  PlatePlugin
} from '@udecode/plate-core'
import {ELEMENT_FONT_COLOR} from './defaults'
import {getFontColorLeafDeserialize} from './getFontColorDeserialize'

/**
 * Enables support for font color.
 */
export const createFontColorPlugin = (): PlatePlugin => ({
  pluginKeys: ELEMENT_FONT_COLOR,
  renderElement: getRenderElement(ELEMENT_FONT_COLOR),
  deserialize: getFontColorLeafDeserialize(),
  inlineTypes: getPlatePluginTypes(ELEMENT_FONT_COLOR),
  renderLeaf: getRenderLeaf(ELEMENT_FONT_COLOR)
})
