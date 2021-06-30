import React from 'react'
import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_LEFT,
  ELEMENT_ALIGN_RIGHT
} from '@udecode/slate-plugins-alignment'
import {
  DEFAULTS_BOLD,
  DEFAULTS_CODE,
  DEFAULTS_ITALIC,
  DEFAULTS_STRIKETHROUGH,
  DEFAULTS_SUBSCRIPT,
  DEFAULTS_SUPERSCRIPT,
  DEFAULTS_UNDERLINE,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from '@udecode/slate-plugins-basic-marks'
import {DEFAULTS_BLOCKQUOTE, ELEMENT_BLOCKQUOTE} from '@udecode/slate-plugins-block-quote'
import {
  DEFAULTS_CODE_BLOCK,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE
} from '@udecode/slate-plugins-code-block'
import {SlatePluginOptions} from '@udecode/slate-plugins-core'
import {MARK_SEARCH_HIGHLIGHT} from '@udecode/slate-plugins-find-replace'
import {ELEMENT_H1, ELEMENT_H2, ELEMENT_H3} from '@udecode/slate-plugins-heading'
import {DEFAULTS_HIGHLIGHT, MARK_HIGHLIGHT} from '@udecode/slate-plugins-highlight'
import {ELEMENT_IMAGE} from '@udecode/slate-plugins-image'
import {MARK_KBD} from '@udecode/slate-plugins-kbd'
import {ELEMENT_LINK} from '@udecode/slate-plugins-link'
import {
  DEFAULTS_TODO_LIST,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL
} from '@udecode/slate-plugins-list'
import {ELEMENT_MEDIA_EMBED} from '@udecode/slate-plugins-media-embed'
import {ELEMENT_MENTION} from '@udecode/slate-plugins-mention'
import {ELEMENT_PARAGRAPH} from '@udecode/slate-plugins-paragraph'
import {
  DEFAULTS_TH,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR
} from '@udecode/slate-plugins-table'

export type DefaultSlatePluginKey =
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
  | typeof ELEMENT_IMAGE
  | typeof ELEMENT_LI
  | typeof ELEMENT_LINK
  | typeof ELEMENT_MEDIA_EMBED
  | typeof ELEMENT_MENTION
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
export const createSlatePluginsOptions = <T extends string = string>(
  overrides?: Partial<Record<DefaultSlatePluginKey | T, Partial<SlatePluginOptions>>>
) => {
  const options: Record<DefaultSlatePluginKey, Partial<SlatePluginOptions>> = {
    [ELEMENT_ALIGN_CENTER]: {},
    [ELEMENT_ALIGN_JUSTIFY]: {},
    [ELEMENT_ALIGN_LEFT]: {},
    [ELEMENT_ALIGN_RIGHT]: {},
    [ELEMENT_BLOCKQUOTE]: {},
    [ELEMENT_CODE_BLOCK]: {},
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
      type: 'link',
      defaultType: 'link'
    },
    [ELEMENT_MEDIA_EMBED]: {},
    [ELEMENT_MENTION]: {},
    [ELEMENT_OL]: {
      type: 'ordered-list',
      defaultType: 'ordered-list'
    },
    [ELEMENT_TABLE]: {},
    [ELEMENT_TD]: {
      type: 'table-cell',
      defaultType: 'table-cell',
      component: (props: any) => {
        const {element} = props
        return (
          <td
            {...props.attributes}
            className={props.className}
            style={{
              border: '1px solid',
              borderColor:
                element.borderColor === 'transparent'
                  ? `rgb(0, 0, 0, 0.5)`
                  : (element.borderColor as string)
            }}>
            {props.children}
          </td>
        )
      }
    },
    [ELEMENT_TR]: {
      type: 'table-row',
      defaultType: 'table-row'
    },
    [ELEMENT_TH]: {},
    [ELEMENT_TODO_LI]: {},
    [MARK_BOLD]: {},
    [MARK_CODE]: {},
    [MARK_HIGHLIGHT]: {},
    [MARK_ITALIC]: {},
    [MARK_SEARCH_HIGHLIGHT]: {},
    [MARK_STRIKETHROUGH]: {},
    [MARK_SUBSCRIPT]: {},
    [MARK_SUPERSCRIPT]: {},
    [MARK_UNDERLINE]: {},
    [ELEMENT_IMAGE]: {}
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

  return options as Record<DefaultSlatePluginKey | T, SlatePluginOptions>
}
