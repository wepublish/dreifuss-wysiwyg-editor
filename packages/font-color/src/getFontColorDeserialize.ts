import {getNodeDeserializer} from '@udecode/slate-plugins-common'
import {Deserialize, getSlatePluginOptions} from '@udecode/slate-plugins-core'
import {ELEMENT_FONT_COLOR} from './defaults'

export const getFontColorLeafDeserialize = (): Deserialize => editor => {
  const options = getSlatePluginOptions(editor, ELEMENT_FONT_COLOR)

  return {
    leaf: getNodeDeserializer({
      type: options.type,
      getNode: el => ({
        type: options.type,
        color: el.getAttribute('color')
      }),
      rules: [{nodeNames: 'span'}],
      ...options.deserialize
    })
  }
}
