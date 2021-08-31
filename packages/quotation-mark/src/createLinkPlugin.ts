import {getRenderElement, getPlatePluginTypes, PlatePlugin} from '@udecode/plate-core'
import {ELEMENT_QUOTATION_MARK} from './defaults'

export const createQuotationMarksPlugin = (): PlatePlugin => ({
  pluginKeys: ELEMENT_QUOTATION_MARK,
  renderElement: getRenderElement(ELEMENT_QUOTATION_MARK),
  inlineTypes: getPlatePluginTypes(ELEMENT_QUOTATION_MARK)
})
