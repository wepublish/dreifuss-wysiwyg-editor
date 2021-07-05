import {
  getRenderElement,
  getRenderLeaf,
  getSlatePluginTypes,
  SlatePlugin
} from '@udecode/slate-plugins-core'
import {ELEMENT_BORDER_COLOR} from './defaults'
import {getBorderColorLeafDeserialize} from './getBorderColorDeserialize'

export const createFontColorPlugin = (): SlatePlugin => ({
  pluginKeys: ELEMENT_BORDER_COLOR,
  renderElement: getRenderElement(ELEMENT_BORDER_COLOR),
  deserialize: getBorderColorLeafDeserialize(),
  inlineTypes: getSlatePluginTypes(ELEMENT_BORDER_COLOR),
  renderLeaf: getRenderLeaf(ELEMENT_BORDER_COLOR)
})
