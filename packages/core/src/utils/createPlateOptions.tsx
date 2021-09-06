import React from 'react'
import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_LEFT,
  ELEMENT_ALIGN_RIGHT
} from '@udecode/plate-alignment'
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
import {ELEMENT_BLOCKQUOTE} from '@udecode/plate-block-quote'
import {ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, DEFAULTS_CODE_BLOCK} from '@udecode/plate-code-block'
import {PlatePluginOptions} from '@udecode/plate-core'
import {MARK_SEARCH_HIGHLIGHT} from '@udecode/plate-find-replace'
import {ELEMENT_H1, ELEMENT_H2, ELEMENT_H3} from '@udecode/plate-heading'
import {DEFAULTS_HIGHLIGHT, MARK_HIGHLIGHT} from '@udecode/plate-highlight'
import {ELEMENT_LINK} from '@dreifuss-wysiwyg-editor/link'
import {ELEMENT_LI, ELEMENT_OL, ELEMENT_TODO_LI, ELEMENT_UL} from '@udecode/plate-list'
import {ELEMENT_MEDIA_EMBED} from '@udecode/plate-media-embed'
// import {ELEMENT_MENTION} from '@udecode/plate-mention'
import {ELEMENT_PARAGRAPH} from '@udecode/plate-paragraph'
import {ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR} from '@dreifuss-wysiwyg-editor/table'

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
  // | typeof ELEMENT_MENTION
  | typeof ELEMENT_OL
  | typeof ELEMENT_PARAGRAPH
  | typeof ELEMENT_TABLE
  | typeof ELEMENT_TD
  | typeof ELEMENT_TH
  | typeof ELEMENT_TODO_LI
  | typeof ELEMENT_TR
  | typeof ELEMENT_UL
  | typeof MARK_BOLD
  | typeof MARK_CODE
  | typeof MARK_HIGHLIGHT
  | typeof MARK_ITALIC
  | typeof MARK_SEARCH_HIGHLIGHT
  | typeof MARK_STRIKETHROUGH
  | typeof MARK_SUBSCRIPT
  | typeof MARK_SUPERSCRIPT
  | typeof MARK_UNDERLINE

/**
 * Get slate plugins options.
 * @param overrides merge into the default options
 */
export const createPlateOptions = <T extends string = string>(
  overrides?: Partial<Record<DefaultPlatePluginKey | T, Partial<PlatePluginOptions>>>
) => {
  const options: Record<DefaultPlatePluginKey, Partial<PlatePluginOptions>> = {
    [ELEMENT_ALIGN_CENTER]: {},
    [ELEMENT_ALIGN_JUSTIFY]: {},
    [ELEMENT_ALIGN_LEFT]: {},
    [ELEMENT_ALIGN_RIGHT]: {},
    [ELEMENT_BLOCKQUOTE]: {},
    [ELEMENT_CODE_BLOCK]: {...DEFAULTS_CODE_BLOCK},
    [ELEMENT_CODE_LINE]: {},
    [ELEMENT_PARAGRAPH]: {
      type: 'paragraph',
      defaultType: 'paragraph'
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
    // [ELEMENT_MENTION]: {},
    [ELEMENT_OL]: {
      type: 'ordered-list',
      defaultType: 'ordered-list'
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
    }
  }

  if (overrides) {
    Object.keys(overrides).forEach(key => {
      options[key] = overrides[key]
    })
  }

  Object.keys(options).forEach(key => {
    if (!options[key].type) {
      options[key].type = key
    }
  })

  return options as Record<DefaultPlatePluginKey | T, PlatePluginOptions>
}
