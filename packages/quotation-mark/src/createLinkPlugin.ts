import {getRenderElement, getSlatePluginTypes, SlatePlugin} from '@udecode/plate-core'
import {ELEMENT_QUOTATION_MARK} from './defaults'

export const createQuotationMarksPlugin = (): SlatePlugin => ({
  pluginKeys: ELEMENT_QUOTATION_MARK,
  renderElement: getRenderElement(ELEMENT_QUOTATION_MARK),
  inlineTypes: getSlatePluginTypes(ELEMENT_QUOTATION_MARK)
})
