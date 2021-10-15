import React from 'react'
import 'twin.macro'
import {DragIndicator} from '@styled-icons/material/DragIndicator'
import Tippy, {TippyProps} from '@tippyjs/react'
import {withDraggables} from '@udecode/plate-dnd'
import {ELEMENT_PARAGRAPH} from '@udecode/plate-paragraph'
import {ELEMENT_BLOCKQUOTE} from '@udecode/plate-block-quote'
import {ELEMENT_H1, ELEMENT_H2, ELEMENT_H3} from '@udecode/plate-heading'
import {ELEMENT_OL, ELEMENT_TODO_LI, ELEMENT_UL} from '@udecode/plate-list'
import {ELEMENT_CODE_BLOCK} from '@udecode/plate-code-block'
import {ELEMENT_MEDIA_EMBED} from '@udecode/plate-media-embed'
import {ELEMENT_TABLE} from '@dreifuss-wysiwyg-editor/table'
import {ELEMENT_IMAGE} from '@dreifuss-wysiwyg-editor/image'

import 'tippy.js/dist/tippy.css'

const GrabberTooltipContent = () => (
  <div style={{fontSize: 12}}>
    <div>
      Drag <span style={{color: 'rgba(255, 255, 255, 0.45)'}}>to move</span>
    </div>
  </div>
)

export const grabberTooltipProps: TippyProps = {
  content: <GrabberTooltipContent />,
  placement: 'bottom',
  arrow: false,
  offset: [0, 0],
  delay: [300, 0],
  duration: [0, 0],
  hideOnClick: true,
  theme: 'small'
}

export const withStyledDraggables = (components: any) => {
  return withDraggables(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      level: 0
    },
    {
      keys: [
        ELEMENT_PARAGRAPH,
        ELEMENT_BLOCKQUOTE,
        ELEMENT_TODO_LI,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_IMAGE,
        ELEMENT_OL,
        ELEMENT_UL,
        ELEMENT_TABLE,
        ELEMENT_MEDIA_EMBED,
        ELEMENT_CODE_BLOCK
      ],
      onRenderDragHandle: ({className, styles}: any) => {
        return (
          <Tippy {...grabberTooltipProps}>
            <button type="button" className={className} css={styles}>
              <DragIndicator
                style={{
                  width: 18,
                  height: 18,
                  color: 'rgba(55, 53, 47, 0.3)'
                }}
              />
            </button>
          </Tippy>
        )
      }
    },
    {
      key: ELEMENT_H1,
      styles: {
        gutterLeft: {
          padding: '2em 0 4px',
          fontSize: '1.875em'
        },
        blockToolbarWrapper: {
          height: '1.3em'
        }
      }
    },
    {
      key: ELEMENT_H2,
      styles: {
        gutterLeft: {
          padding: '1.4em 0 1px',
          fontSize: '1.5em'
        },
        blockToolbarWrapper: {
          height: '1.3em'
        }
      }
    },
    {
      key: ELEMENT_H3,
      styles: {
        gutterLeft: {
          padding: '1em 0 1px',
          fontSize: '1.25em'
        },
        blockToolbarWrapper: {
          height: '1.3em'
        }
      }
    },
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      styles: {
        gutterLeft: {
          padding: '4px 0 0'
        }
      }
    },
    {
      key: ELEMENT_BLOCKQUOTE,
      styles: {
        gutterLeft: {
          padding: '18px 0 0'
        }
      }
    },
    {
      key: ELEMENT_CODE_BLOCK,
      styles: {
        gutterLeft: {
          padding: '12px 0 0'
        }
      }
    }
  ])
}
