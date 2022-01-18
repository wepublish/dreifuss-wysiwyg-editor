import React, {createContext} from 'react'
import {Transforms} from 'slate'
import {ToolbarButton} from '@udecode/plate-toolbar'
import {useEventEditorId, useStoreEditorRef} from '@udecode/plate-core'
import {InlineDialog, TrashIcon, Divider, DividerType} from '@dreifuss-wysiwyg-editor/common'
import {ReactEditor, RenderElementProps, useFocused, useSelected} from 'slate-react'

function makeLayoutIcon(ratios: number[]) {
  const size = 16

  return (
    <div
      role="img"
      style={{
        display: 'grid',
        gridTemplateColumns: ratios.map(r => `${r}fr`).join(' '),
        gap: 2,
        width: size,
        height: size
      }}>
      {ratios.map((_, i) => {
        return <div key={i} style={{backgroundColor: 'currentcolor', borderRadius: 1}} />
      })}
    </div>
  )
}

const LayoutOptionsContext = createContext<[number, ...number[]][]>([])

export const LayoutOptionsProvider = LayoutOptionsContext.Provider

export const LayoutContainer = ({
  attributes,
  children,
  element
}: RenderElementProps & {element: {type: 'layout'; layout: any}}) => {
  const {spacing} = {
    spacing: {medium: 10, small: 10}
  }
  const focused = useFocused()
  const selected = useSelected()
  const editor = useStoreEditorRef(useEventEditorId('focus'))

  const layout = element.layout

  // TODO: use this
  // const layoutOptions = useContext(LayoutOptionsContext)

  const layoutOptions = [
    [1, 1],
    [1, 1, 1],
    [2, 1],
    [1, 2],
    [1, 2, 1],
    [1, 1, 1, 1],
    [1, 2, 2, 1]
  ]

  return (
    <div
      style={{
        position: 'relative',
        marginBottom: spacing.medium,
        marginTop: spacing.medium
      }}
      {...attributes}>
      <div
        style={{
          columnGap: spacing.small,
          display: 'grid',
          gridTemplateColumns: layout.map(x => `${x}fr`).join(' ')
        }}>
        {children}
      </div>
      {focused && selected && (
        <InlineDialog isRelative>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            {layoutOptions.map((layoutOption, i) => (
              <>
                <ToolbarButton
                  onMouseDown={event => {
                    event.preventDefault()
                    const path = ReactEditor.findPath(editor, element)
                    Transforms.setNodes(
                      editor,
                      {
                        type: 'layout',
                        layout: layoutOption
                      },
                      {at: path}
                    )
                  }}
                  icon={makeLayoutIcon(layoutOption)}
                  active={true}
                />
              </>
            ))}
            <Divider type={DividerType.vertical} />
            <ToolbarButton
              icon={<TrashIcon />}
              onMouseDown={event => {
                event.preventDefault()

                const path = ReactEditor.findPath(editor, element)
                Transforms.removeNodes(editor, {at: path})
              }}
              active={true}
            />
          </div>
        </InlineDialog>
      )}
    </div>
  )
}

export const LayoutArea = ({attributes, children}: RenderElementProps) => {
  const {colors, radii, spacing} = {
    spacing: {medium: 10},
    colors: {border: 'black'},
    radii: {
      small: 10,
      medium: 10
    }
  }

  return (
    <div
      style={{
        border: `2px dashed ${colors.border}`,
        borderRadius: radii.small,
        paddingLeft: spacing.medium,
        paddingRight: spacing.medium
      }}
      {...attributes}>
      {children}
    </div>
  )
}
