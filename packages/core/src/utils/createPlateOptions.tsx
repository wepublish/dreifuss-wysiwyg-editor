import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_LEFT,
  ELEMENT_ALIGN_RIGHT
} from '@dreifuss-wysiwyg-editor/alignment'
import {
  MARK_BOLD,
  DEFAULTS_BOLD,
  MARK_CODE,
  DEFAULTS_CODE as DEFAULTS_MARK_CODE,
  MARK_ITALIC,
  DEFAULTS_ITALIC,
  MARK_STRIKETHROUGH,
  DEFAULTS_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  DEFAULTS_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  DEFAULTS_SUPERSCRIPT,
  MARK_UNDERLINE,
  DEFAULTS_UNDERLINE
} from '@udecode/plate-basic-marks'
import {MARK_BG_COLOR, MARK_COLOR} from '@dreifuss-wysiwyg-editor/font'
import {ELEMENT_BLOCKQUOTE} from '@udecode/plate-block-quote'
import {ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE} from '@udecode/plate-code-block'
import {PlatePluginOptions} from '@udecode/plate-core'
import {MARK_SEARCH_HIGHLIGHT} from '@dreifuss-wysiwyg-editor/find-replace'
import {ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, KEYS_HEADING} from '@udecode/plate-heading'
import {DEFAULTS_HIGHLIGHT, MARK_HIGHLIGHT} from '@udecode/plate-highlight'
import {ELEMENT_LINK} from '@dreifuss-wysiwyg-editor/link'
import {ELEMENT_LI, ELEMENT_OL, ELEMENT_TODO_LI, ELEMENT_UL, ELEMENT_LIC} from '@udecode/plate-list'
import {ELEMENT_MEDIA_EMBED} from '@udecode/plate-media-embed'
import {ELEMENT_PARAGRAPH} from '@udecode/plate-paragraph'
import {ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR} from '@dreifuss-wysiwyg-editor/table'
import {ELEMENT_IMAGE} from '@dreifuss-wysiwyg-editor/image'
import {ExitBreakPluginOptions, SoftBreakPluginOptions} from '@udecode/plate-break'
import {isBlockAboveEmpty, isSelectionAtBlockStart} from '@udecode/plate-common'
import {ResetBlockTypePluginOptions} from '@udecode/plate-reset-node'
import {EnablePluginsProps} from '../DreifussWysiwygEditor'
import {FunctionComponent} from 'react'

export type DefaultPlatePluginKey =
  | typeof ELEMENT_ALIGN_CENTER
  | typeof ELEMENT_ALIGN_JUSTIFY
  | typeof ELEMENT_ALIGN_LEFT
  | typeof ELEMENT_ALIGN_RIGHT
  | typeof ELEMENT_BLOCKQUOTE
  | typeof ELEMENT_CODE_BLOCK
  | typeof ELEMENT_CODE_LINE
  | typeof ELEMENT_H1
  | typeof ELEMENT_H2
  | typeof ELEMENT_H3
  | typeof ELEMENT_LI
  | typeof ELEMENT_LINK
  | typeof ELEMENT_MEDIA_EMBED
  | typeof ELEMENT_OL
  | typeof ELEMENT_PARAGRAPH
  | typeof ELEMENT_TABLE
  | typeof ELEMENT_TD
  | typeof ELEMENT_TH
  | typeof ELEMENT_TODO_LI
  | typeof ELEMENT_TR
  | typeof ELEMENT_UL
  | typeof ELEMENT_LIC
  | typeof MARK_BOLD
  | typeof MARK_CODE
  | typeof MARK_HIGHLIGHT
  | typeof MARK_ITALIC
  | typeof MARK_SEARCH_HIGHLIGHT
  | typeof MARK_STRIKETHROUGH
  | typeof MARK_SUBSCRIPT
  | typeof MARK_SUPERSCRIPT
  | typeof MARK_UNDERLINE
  | typeof ELEMENT_IMAGE
  | typeof MARK_COLOR
  | typeof MARK_BG_COLOR

/**
 * Get slate plugins options.
 * @param overrides merge into the default options
 */
export const createPlateOptions = (
  enabledOptions: EnablePluginsProps = {},
  overrides?: Partial<Record<DefaultPlatePluginKey | T, FunctionComponent<any>>>
) => {
  const options: Omit<
    Record<DefaultPlatePluginKey, Partial<PlatePluginOptions>>,
    typeof ELEMENT_PARAGRAPH
  > = {
    [ELEMENT_ALIGN_CENTER]: {},
    [ELEMENT_ALIGN_JUSTIFY]: {},
    [ELEMENT_ALIGN_LEFT]: {},
    [ELEMENT_ALIGN_RIGHT]: {},
    [ELEMENT_BLOCKQUOTE]: {
      type: 'block-quote'
    },
    [ELEMENT_CODE_BLOCK]: {
      type: 'code-block'
    },
    [ELEMENT_CODE_LINE]: {
      type: 'code-line'
    },
    [ELEMENT_H1]: {
      type: 'heading-one',
      defaultType: 'heading-one'
    },
    [ELEMENT_H2]: {
      type: 'heading-two',
      defaultType: 'heading-two'
    },
    [ELEMENT_H3]: {
      type: 'heading-three',
      defaultType: 'heading-three'
    },
    [ELEMENT_UL]: {
      type: 'unordered-list',
      defaultType: 'unordered-list'
    },
    [ELEMENT_LI]: {
      type: 'list-item',
      defaultType: 'list-item'
    },
    [ELEMENT_LINK]: {
      hotkey: ['ctrl+v', 'mod+v']
    },
    [ELEMENT_MEDIA_EMBED]: {},
    [ELEMENT_OL]: {
      type: 'ordered-list',
      defaultType: 'ordered-list'
    },
    [ELEMENT_LIC]: {
      type: 'list-item-cell'
    },
    [ELEMENT_TABLE]: {},
    [ELEMENT_TD]: {
      type: 'table-cell',
      defaultType: 'table-cell'
    },
    [ELEMENT_TR]: {
      type: 'table-row',
      defaultType: 'table-row'
    },
    [ELEMENT_TH]: {},
    [ELEMENT_TODO_LI]: {},
    [MARK_BOLD]: {
      ...DEFAULTS_BOLD
    },
    [MARK_CODE]: {
      ...DEFAULTS_MARK_CODE
    },
    [MARK_HIGHLIGHT]: {
      ...DEFAULTS_HIGHLIGHT
    },
    [MARK_ITALIC]: {
      ...DEFAULTS_ITALIC
    },
    [MARK_SEARCH_HIGHLIGHT]: {
      ...DEFAULTS_HIGHLIGHT
    },
    [MARK_STRIKETHROUGH]: {
      ...DEFAULTS_STRIKETHROUGH
    },
    [MARK_SUBSCRIPT]: {
      ...DEFAULTS_SUBSCRIPT
    },
    [MARK_SUPERSCRIPT]: {
      ...DEFAULTS_SUPERSCRIPT
    },
    [MARK_UNDERLINE]: {
      ...DEFAULTS_UNDERLINE
    },
    [ELEMENT_IMAGE]: {},
    [MARK_COLOR]: {},
    [MARK_BG_COLOR]: {}
  }

  const workingOptions: Record<DefaultPlatePluginKey, Partial<PlatePluginOptions>> = {
    [ELEMENT_PARAGRAPH]: {
      type: 'paragraph',
      defaultType: 'paragraph'
    }
  }

  const optionsMap = {
    align: [ELEMENT_ALIGN_CENTER, ELEMENT_ALIGN_LEFT, ELEMENT_ALIGN_RIGHT, ELEMENT_ALIGN_JUSTIFY],
    list: [ELEMENT_UL, ELEMENT_OL, ELEMENT_LI],
    todoList: [ELEMENT_TODO_LI],
    table: [ELEMENT_TABLE, ELEMENT_TR, ELEMENT_TH, ELEMENT_TD],
    image: [ELEMENT_IMAGE],
    color: [MARK_COLOR],
    bgColor: [MARK_BG_COLOR],
    media: [ELEMENT_MEDIA_EMBED],
    link: [ELEMENT_LINK],
    quote: [ELEMENT_BLOCKQUOTE],
    basicMarks: [
      MARK_BOLD,
      MARK_ITALIC,
      MARK_STRIKETHROUGH,
      MARK_SUBSCRIPT,
      MARK_SUPERSCRIPT,
      MARK_UNDERLINE
    ],
    basicElements: [
      ELEMENT_H1,
      ELEMENT_H2,
      ELEMENT_H3,
      ELEMENT_BLOCKQUOTE,
      ELEMENT_CODE_BLOCK,
      ELEMENT_CODE_LINE
    ]
  }

  for (const key in enabledOptions) {
    if (optionsMap[key]?.length > 1) {
      for (let i = 0; i < optionsMap[key].length; i++) {
        workingOptions[optionsMap[key][i]] = options[optionsMap[key][i]]
      }
    } else {
      if (optionsMap[key] && optionsMap[key]?.[0]) {
        workingOptions[optionsMap[key]?.[0]] = options[optionsMap[key]?.[0]]
      }
    }
  }

  // if (overrides) {
  //   Object.keys(overrides).forEach(key => {
  //     workingOptions[key] = overrides[key]
  //   })
  // }

  // Object.keys(workingOptions).forEach(key => {
  //   if (!workingOptions[key].type) {
  //     workingOptions[key].type = key
  //   }
  // })

  return workingOptions as Record<DefaultPlatePluginKey | T, PlatePluginOptions>
}

const resetBlockTypesCommonRule = (options: any): any => ({
  types: [options?.[ELEMENT_BLOCKQUOTE]?.type],
  defaultType: options?.[ELEMENT_PARAGRAPH]?.type
})

export const optionsResetBlockTypePlugin = (options: any): ResetBlockTypePluginOptions => ({
  rules: [
    {
      ...resetBlockTypesCommonRule(options),
      hotkey: 'Enter',
      predicate: isBlockAboveEmpty
    },
    {
      ...resetBlockTypesCommonRule(options),
      hotkey: 'Backspace',
      predicate: isSelectionAtBlockStart
    }
  ]
})

export const optionsSoftBreakPlugin = (options: EnablePluginsProps): SoftBreakPluginOptions => ({
  rules: [
    {hotkey: 'shift+enter'},
    {
      hotkey: 'enter',
      query: {
        allow: [
          options?.[ELEMENT_CODE_BLOCK]?.type,
          options?.[ELEMENT_BLOCKQUOTE]?.type,
          options?.[ELEMENT_TD]?.type
        ]
      }
    }
  ]
})

export const optionsExitBreakPlugin = (options: any): ExitBreakPluginOptions => {
  return {
    rules: [
      {
        hotkey: 'mod+enter'
      },
      {
        hotkey: 'mod+shift+enter',
        before: true
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING
        }
      },
      {
        hotkey: 'enter',
        query: {
          allow: [options?.[ELEMENT_IMAGE]?.type]
        }
      },
      {
        hotkey: 'enter',
        before: true,
        query: {
          start: true,
          allow: [options?.[ELEMENT_PARAGRAPH]?.type]
        }
      }
    ]
  }
}
