import {FunctionComponent} from 'react'
import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_LEFT,
  ELEMENT_ALIGN_RIGHT
} from '@dreifuss-wysiwyg-editor/alignment'
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from '@udecode/plate-basic-marks'
import {ELEMENT_BLOCKQUOTE} from '@udecode/plate-block-quote'
import {BlockquoteElement} from '@udecode/plate-block-quote-ui'
import {ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE} from '@udecode/plate-code-block'
import {CodeBlockElement, CodeLineElement} from '@udecode/plate-code-block-ui'
import {withProps} from '@udecode/plate-common'
import {MARK_SEARCH_HIGHLIGHT} from '@dreifuss-wysiwyg-editor/find-replace'
import {ELEMENT_H1, ELEMENT_H2, ELEMENT_H3} from '@udecode/plate-heading'
import {MARK_HIGHLIGHT} from '@udecode/plate-highlight'
import {MARK_KBD} from '@udecode/plate-kbd'
import {ELEMENT_LINK} from '@dreifuss-wysiwyg-editor/link'
import {LinkElement} from '@dreifuss-wysiwyg-editor/link-ui'
import {ImageElement} from '@dreifuss-wysiwyg-editor/image-ui'
import {ELEMENT_LI, ELEMENT_OL, ELEMENT_TODO_LI, ELEMENT_UL} from '@udecode/plate-list'
import {TodoListElement} from '@udecode/plate-list-ui'
import {ELEMENT_MEDIA_EMBED} from '@udecode/plate-media-embed'
import {MediaEmbedElement} from '@dreifuss-wysiwyg-editor/media-embed-ui'
import {ELEMENT_PARAGRAPH} from '@udecode/plate-paragraph'
import {ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR} from '@dreifuss-wysiwyg-editor/table'
import {TableElement, TableDataElement} from '@dreifuss-wysiwyg-editor/table-ui'
import {StyledElement, StyledLeaf} from '@udecode/plate-styled-components'
import {DefaultPlatePluginKey} from './createPlateOptions'
import {RenderFontLeaf} from '@dreifuss-wysiwyg-editor/font-ui'
import {MARK_COLOR, MARK_BG_COLOR} from '@dreifuss-wysiwyg-editor/font'
import {ELEMENT_IMAGE} from '@dreifuss-wysiwyg-editor/image'
import {EnablePluginsProps} from '../DreifussWysiwygEditor'

export const createPlateComponents = (
  enablePlugins: EnablePluginsProps,
  overrides?: Partial<Record<DefaultPlatePluginKey | T, FunctionComponent<any>>>
) => {
  const components: any = {
    [ELEMENT_ALIGN_CENTER]: withProps(StyledElement, {
      styles: {
        root: {
          textAlign: 'center'
        }
      }
    }),
    [ELEMENT_ALIGN_JUSTIFY]: withProps(StyledElement, {
      styles: {
        root: {
          textAlign: 'justify',
          whiteSpace: 'pre-line'
        }
      }
    }),
    [ELEMENT_ALIGN_LEFT]: withProps(StyledElement, {
      styles: {
        root: {
          textAlign: 'left'
        }
      }
    }),
    [ELEMENT_ALIGN_RIGHT]: withProps(StyledElement, {
      styles: {
        root: {
          textAlign: 'right'
        }
      }
    }),
    [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
    [ELEMENT_CODE_BLOCK]: CodeBlockElement,
    [ELEMENT_CODE_LINE]: CodeLineElement,
    [ELEMENT_H1]: withProps(StyledElement, {
      as: 'h1',
      styles: {
        root: {
          margin: '2em 0 4px',
          fontSize: '1.875em',
          fontWeight: 500,
          lineHeight: '1.3'
        }
      }
    }),
    [ELEMENT_H2]: withProps(StyledElement, {
      as: 'h2',
      styles: {
        root: {
          margin: '1.4em 0 1px',
          fontSize: '1.5em',
          fontWeight: 500,
          lineHeight: '1.3'
        }
      }
    }),
    [ELEMENT_H3]: withProps(StyledElement, {
      as: 'h3',
      styles: {
        root: {
          margin: '1em 0 1px',
          color: '#434343',
          fontSize: '1.25em',
          fontWeight: 500,
          lineHeight: '1.3'
        }
      }
    }),
    [ELEMENT_LI]: withProps(StyledElement, {as: 'li'}),
    [ELEMENT_LINK]: LinkElement,
    [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
    [ELEMENT_UL]: withProps(StyledElement, {
      as: 'ul',
      styles: {
        root: {
          margin: 0,
          paddingInlineStart: '24px'
        }
      }
    }),
    [ELEMENT_OL]: withProps(StyledElement, {
      as: 'ol',
      styles: {
        root: {
          margin: 0,
          paddingInlineStart: '24px'
        }
      }
    }),
    [ELEMENT_TABLE]: TableElement,
    [ELEMENT_TD]: TableDataElement,
    [ELEMENT_TH]: withProps(StyledElement, {
      as: 'th',
      styles: {
        root: {
          backgroundColor: 'rgb(244, 245, 247)',
          border: '1px solid rgb(193, 199, 208)',
          padding: '8px',
          minWidth: '48px',
          textAlign: 'left',
          selectors: {
            '> *': {
              margin: 0
            }
          }
        }
      }
    }),
    [ELEMENT_TR]: withProps(StyledElement, {as: 'tr'}),
    [ELEMENT_TODO_LI]: TodoListElement,
    [MARK_BOLD]: withProps(StyledLeaf, {as: 'strong'}),
    [MARK_CODE]: withProps(StyledLeaf, {
      as: 'code',
      styles: {
        root: {
          whiteSpace: 'pre-wrap',
          fontSize: '85%',
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;',
          backgroundColor: 'rgba(135,131,120,0.15)',
          borderRadius: '3px',
          padding: '0.2em 0.4em',
          lineHeight: 'normal'
        }
      }
    }),
    [MARK_HIGHLIGHT]: withProps(StyledLeaf, {
      as: 'mark',
      styles: {
        root: {
          backgroundColor: '#FEF3B7'
        }
      }
    }),
    [MARK_ITALIC]: withProps(StyledLeaf, {as: 'em'}),
    [MARK_KBD]: withProps(StyledLeaf, {
      as: 'kbd',
      styles: {
        root: {
          whiteSpace: 'pre-wrap',
          fontSize: '75%',
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;',
          backgroundColor: 'white',
          border: '1px solid black',
          borderRadius: '3px',
          padding: '0.2em 0.4em',
          marginRight: '0.2em',
          lineHeight: 'normal',
          boxShadow: '2px 2px 3px 0px rgba(0,0,0,0.75)'
        }
      }
    }),
    [MARK_STRIKETHROUGH]: withProps(StyledLeaf, {as: 's'}),
    [MARK_SUBSCRIPT]: withProps(StyledLeaf, {as: 'sub'}),
    [MARK_SUPERSCRIPT]: withProps(StyledLeaf, {as: 'sup'}),
    [MARK_UNDERLINE]: withProps(StyledLeaf, {as: 'u'}),
    [ELEMENT_IMAGE]: withProps(ImageElement, {}),
    [MARK_COLOR]: RenderFontLeaf,
    [MARK_BG_COLOR]: RenderFontLeaf,
    [MARK_SEARCH_HIGHLIGHT]: withProps(StyledLeaf, {
      as: 'span',
      styles: {
        root: {
          backgroundColor: '#fff59d'
        }
      }
    })
  }

  const enabledComponents = {
    [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
      as: 'p',
      styles: {
        root: {
          margin: 0,
          padding: '4px 0'
        }
      }
    })
  }

  const componentsMap = {
    search: [MARK_SEARCH_HIGHLIGHT],
    align: [ELEMENT_ALIGN_CENTER, ELEMENT_ALIGN_LEFT, ELEMENT_ALIGN_RIGHT, ELEMENT_ALIGN_JUSTIFY],
    list: [ELEMENT_UL, ELEMENT_OL, ELEMENT_LI],
    todoList: [ELEMENT_TODO_LI],
    table: [ELEMENT_TABLE, ELEMENT_TR, ELEMENT_TH, ELEMENT_TD],
    image: [ELEMENT_IMAGE],
    color: [MARK_COLOR],
    bgColor: [MARK_BG_COLOR],
    media: [ELEMENT_MEDIA_EMBED],
    link: [ELEMENT_LINK],
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

  for (const key in enablePlugins) {
    if (componentsMap[key]) {
      for (let i = 0; i < componentsMap[key].length; i++) {
        enabledComponents[componentsMap[key][i]] = components[componentsMap[key][i]]
      }
    }
  }

  return enabledComponents as any
}
