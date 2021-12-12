import {getPlatePluginTypes, getRenderElement, PlatePlugin} from '@udecode/plate-core'
import {ELEMENT_IMAGE} from './defaults'
import {getImageDeserialize} from './getImageDeserialize'
import {WithImageUploadOptions} from './types'
import {withImageUpload} from './withImageUpload'

/**
 * Enables support for design.
 */
export const createDesignPlugin = (options?: WithImageUploadOptions): PlatePlugin => ({
  pluginKeys: ELEMENT_IMAGE,
  renderElement: getRenderElement(ELEMENT_IMAGE),
  deserialize: getImageDeserialize(),
  voidTypes: getPlatePluginTypes(ELEMENT_IMAGE),
  withOverrides: withImageUpload(options)
})
