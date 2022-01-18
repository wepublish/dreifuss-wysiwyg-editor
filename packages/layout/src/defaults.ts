import {PlatePluginOptions} from '@udecode/plate-core'

export const ELEMENT_LAYOUT = 'layout'

export const ELEMENT_LAYOUT_AREA = 'layout-area'

export const KEYS_LAYOUT = [ELEMENT_LAYOUT, ELEMENT_LAYOUT_AREA]

export const DEFAULTS_LAYOUT: Partial<PlatePluginOptions> = {
  getNodeProps: ({element}) => ({
    type: element?.type,
    layout: element?.layout,
    children: element?.children
  })
}
