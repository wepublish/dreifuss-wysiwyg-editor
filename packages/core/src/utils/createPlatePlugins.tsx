import {createTablePlugin} from '@dreifuss-wysiwyg-editor/table'
import {createAlignPlugin} from '@dreifuss-wysiwyg-editor/alignment'
import {createHeadingPlugin} from '@udecode/plate-heading'
import {createHighlightPlugin} from '@udecode/plate-highlight'
import {createParagraphPlugin} from '@udecode/plate-paragraph'
import {createCodeBlockPlugin} from '@udecode/plate-code-block'
import {createBlockquotePlugin} from '@udecode/plate-block-quote'
import {createMediaEmbedPlugin, ELEMENT_MEDIA_EMBED} from '@udecode/plate-media-embed'
import {
  optionsExitBreakPlugin,
  optionsResetBlockTypePlugin,
  optionsSoftBreakPlugin
} from './createPlateOptions'
import {createBasicElementPlugins} from '@udecode/plate-basic-elements'
import {createListPlugin, createTodoListPlugin} from '@udecode/plate-list'
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
import {createDndPlugin} from '@udecode/plate-dnd'
import {createNodeIdPlugin} from '@udecode/plate-node-id'
import {createExitBreakPlugin, createSoftBreakPlugin} from '@udecode/plate-break'
import {createResetNodePlugin} from '@udecode/plate-reset-node'
import {EnablePluginsProps} from '../DreifussWysiwygEditor'

export function plugins(enabledOptions: EnablePluginsProps, {findReplace}) {
  const pluginsMap = {
    heading: createHeadingPlugin({levels: 3}),
    list: createListPlugin(),
    todoList: createTodoListPlugin(),
    quote: createBlockquotePlugin(),
    code: createCodePlugin(),
    codeBlock: createCodeBlockPlugin(),
    color: createFontColorPlugin(),
    bgColor: createFontBackgroundColorPlugin(),
    align: createAlignPlugin(),
    table: createTablePlugin(),
    link: createLinkPlugin(),
    image: createImagePlugin(),
    media: createMediaEmbedPlugin(),
    highlight: createHighlightPlugin()
  }

  const enabledPlugins = [
    createReactPlugin(),
    createHistoryPlugin(),
    createParagraphPlugin(),
    findReplace,
    /** dnd */
    createNodeIdPlugin(),
    createDndPlugin(),
    createResetNodePlugin(optionsResetBlockTypePlugin),
    /** break */
    createExitBreakPlugin(optionsExitBreakPlugin),
    createSoftBreakPlugin(optionsSoftBreakPlugin),
    /** backspace */
    createSelectOnBackspacePlugin({allow: [ELEMENT_MEDIA_EMBED, ELEMENT_IMAGE]})
  ]

  for (const key in enabledOptions) {
    if (enabledOptions.basicMarks) {
      enabledPlugins.push(
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createSubscriptPlugin(),
        createSuperscriptPlugin(),
        createStrikethroughPlugin(),
        ...createBasicElementPlugins()
      )
    }
    if (pluginsMap[key]) enabledPlugins.push(pluginsMap[key])
  }

  return enabledPlugins
}
