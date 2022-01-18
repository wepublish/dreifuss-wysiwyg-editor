import {createTablePlugin} from '@dreifuss-wysiwyg-editor/table'
import {createAlignPlugin} from '@dreifuss-wysiwyg-editor/alignment'
import {createHeadingPlugin} from '@udecode/plate-heading'
import {createHighlightPlugin} from '@udecode/plate-highlight'
import {createParagraphPlugin} from '@udecode/plate-paragraph'
import {createCodeBlockPlugin} from '@udecode/plate-code-block'
import {createBlockquotePlugin} from '@udecode/plate-block-quote'
import {createMediaEmbedPlugin, ELEMENT_MEDIA_EMBED} from '@udecode/plate-media-embed'
import {
  createPlateOptions,
  optionsExitBreakPlugin,
  optionsResetBlockTypePlugin,
  optionsSoftBreakPlugin
} from './createPlateOptions'
import {createListPlugin, createTodoListPlugin} from '@udecode/plate-list'
import {createHistoryPlugin, createReactPlugin} from '@udecode/plate-core'
import {createImagePlugin, ELEMENT_IMAGE} from '@dreifuss-wysiwyg-editor/image'
import {createLinkPlugin} from '@dreifuss-wysiwyg-editor/link'
import {createFontColorPlugin, createFontBackgroundColorPlugin} from '@dreifuss-wysiwyg-editor/font'
import {createLayoutPlugin} from '@dreifuss-wysiwyg-editor/layout'
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
import {createDndPlugin} from '@udecode/plate-dnd'
import {createNodeIdPlugin} from '@udecode/plate-node-id'
import {createExitBreakPlugin, createSoftBreakPlugin} from '@udecode/plate-break'
import {createResetNodePlugin} from '@udecode/plate-reset-node'
import {EnablePluginsProps} from '../DreifussWysiwygEditor'

export function plugins(enabledOptions: EnablePluginsProps, {findReplace}) {
  const pluginsMap = {
    search: findReplace,
    list: createListPlugin(),
    todoList: createTodoListPlugin(),
    quote: createBlockquotePlugin(),
    codeBlock: createCodeBlockPlugin(),
    color: createFontColorPlugin(),
    bgColor: createFontBackgroundColorPlugin(),
    align: createAlignPlugin(),
    table: createTablePlugin(),
    link: createLinkPlugin(),
    image: createImagePlugin(),
    media: createMediaEmbedPlugin(),
    highlight: createHighlightPlugin(),
    dnd: createDndPlugin(),
    layout: createLayoutPlugin()
  }
  const options = createPlateOptions(enabledOptions)

  const enabledPlugins = [
    createReactPlugin(),
    createHistoryPlugin(),
    createParagraphPlugin(),
    createHeadingPlugin({levels: 3}),
    /** dnd */
    createNodeIdPlugin(),
    createResetNodePlugin(optionsResetBlockTypePlugin),
    /** break */
    createExitBreakPlugin(optionsExitBreakPlugin(options)),
    createSoftBreakPlugin(optionsSoftBreakPlugin),
    /** backspace */
    createSelectOnBackspacePlugin({allow: [ELEMENT_MEDIA_EMBED, ELEMENT_IMAGE]})
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
