import {getNodeDeserializer} from '@udecode/slate-plugins-common'
import {Deserialize, getSlatePluginOptions} from '@udecode/slate-plugins-core'
import {ELEMENT_QUOTATION_MARK} from './defaults'

export const getLinkDeserialize = (): Deserialize => editor => {
  const options = getSlatePluginOptions(editor, ELEMENT_QUOTATION_MARK)

  return {
    element: getNodeDeserializer({
      type: options.type,
      getNode: el => ({
        type: options.type,
        url: el.getAttribute('href')
      }),
      rules: [{nodeNames: 'A'}],
      ...options.deserialize
    })
  }
}
