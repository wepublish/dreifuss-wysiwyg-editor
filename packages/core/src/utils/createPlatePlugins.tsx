import {createTablePlugin} from '@dreifuss-wysiwyg-editor/table'
import {createAlignPlugin} from '@dreifuss-wysiwyg-editor/alignment'
import {createHeadingPlugin} from '@udecode/plate-heading'
import {createHighlightPlugin} from '@udecode/plate-highlight'
import {createParagraphPlugin} from '@udecode/plate-paragraph'
import {
  createPlateOptions,
  optionsExitBreakPlugin,
  optionsSoftBreakPlugin
} from './createPlateOptions'
import {createListPlugin} from '@udecode/plate-list'
import {createHistoryPlugin, createReactPlugin} from '@udecode/plate-core'
import {createImagePlugin, ELEMENT_IMAGE} from '@dreifuss-wysiwyg-editor/image'
import {createLinkPlugin} from '@dreifuss-wysiwyg-editor/link'
import {createFontColorPlugin, createFontBackgroundColorPlugin} from '@dreifuss-wysiwyg-editor/font'
import {createSelectOnBackspacePlugin} from '@udecode/plate-select'
import {
  createBoldPlugin,
  createItalicPlugin,
  createCodePlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin
} from '@udecode/plate-basic-marks'
import {createExitBreakPlugin, createSoftBreakPlugin} from '@udecode/plate-break'
import {EnablePluginsProps} from '../DreifussWysiwygEditor'

export function plugins(enabledOptions: EnablePluginsProps, {findReplace}) {
  const pluginsMap = {
    search: findReplace,
    list: createListPlugin(),
    color: createFontColorPlugin(),
    bgColor: createFontBackgroundColorPlugin(),
    align: createAlignPlugin(),
    table: createTablePlugin(),
    link: createLinkPlugin(),
    image: createImagePlugin(),
    highlight: createHighlightPlugin()
  }
  const options = createPlateOptions(enabledOptions)

  const enabledPlugins = [
    createReactPlugin(),
    createHistoryPlugin(),
    createParagraphPlugin(),
    createHeadingPlugin({levels: 3}),
    /** break */
    createExitBreakPlugin(optionsExitBreakPlugin(options)),
    createSoftBreakPlugin(optionsSoftBreakPlugin),
    /** backspace */
    createSelectOnBackspacePlugin({allow: [ELEMENT_IMAGE]})
  ]

  if (enabledOptions.basicMarks) {
    enabledPlugins.push(
      createCodePlugin(),
      createBoldPlugin(),
      createItalicPlugin(),
      createUnderlinePlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createStrikethroughPlugin()
    )
  }
  // Filter options to be enabled,
  // And add their plugins if exist.
  Object.entries(enabledOptions)
    .filter(option => !!option[1])
    .map(option => {
      const [plugin] = option
      if (pluginsMap[plugin]) {
        enabledPlugins.push(pluginsMap[plugin])
      }
    })

  return enabledPlugins
}
