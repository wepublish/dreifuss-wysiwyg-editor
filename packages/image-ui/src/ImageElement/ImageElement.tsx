import React, {ChangeEventHandler, useCallback, useEffect, useMemo, useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import {setNodes} from '@udecode/plate-common'
import {useEventEditorId, useStoreEditorState} from '@udecode/plate-core'
import {Node} from 'slate'
import {ReactEditor, useFocused, useSelected} from 'slate-react'
import {getImageElementStyles} from './ImageElement.styles'
import {ImageElementProps} from './ImageElement.types'
import {ImageSizeType} from '@dreifuss-wysiwyg-editor/image'

export const imageSizeMap = {
  [ImageSizeType.large]: '100%',
  [ImageSizeType.medium]: '50%',
  [ImageSizeType.small]: '30%'
}

export const ImageElement = (props: ImageElementProps) => {
  const {
    attributes,
    children,
    element,
    nodeProps,
    caption = {},
    align = 'center',
    draggable
  } = props

  const {placeholder = 'Write a caption...'} = caption

  const {
    url,
    size = ImageSizeType.large,
    caption: nodeCaption = [{children: [{text: ''}]}]
  } = element
  const focused = useFocused()
  const selected = useSelected()
  const editor = useStoreEditorState(useEventEditorId('focus'))

  const [imageSize, setSize] = useState<ImageSizeType>(size || ImageSizeType.large)

  useEffect(() => {
    const path = ReactEditor.findPath(editor, element)
    setNodes(editor, {size: imageSize}, {at: path})
  }, [imageSize])

  const styles = getImageElementStyles({...props, align, focused, selected})

  const onChangeCaption: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    e => {
      const path = ReactEditor.findPath(editor as ReactEditor, element)
      setNodes(editor, {caption: [{text: e.target.value}]}, {at: path})
    },
    [editor, element]
  )

  const captionString = useMemo(() => {
    return Node.string(nodeCaption[0]) || ''
  }, [nodeCaption])

  const ImageSizeButton = ({label, type}: {label: string; type: ImageSizeType}) => (
    <button
      css={styles.optionsToolbarButton?.css}
      className={styles.optionsToolbarButton?.className}
      onClick={() => setSize(type)}>
      {label}
    </button>
  )

  return (
    <div {...attributes} css={styles.root.css} className={styles.root.className}>
      <div contentEditable={false}>
        <figure css={styles.figure?.css} className={`group ${styles.figure?.className}`}>
          <div css={styles.optionsToolbar.css} className={styles.optionsToolbar.className}>
            <ImageSizeButton type={ImageSizeType.fullScreen} label="screen" />
            <ImageSizeButton type={ImageSizeType.large} label="lg" />
            <ImageSizeButton type={ImageSizeType.medium} label="md" />
            <ImageSizeButton type={ImageSizeType.small} label="sm" />
          </div>
          <img
            data-testid="ImageElementImage"
            css={styles.img?.css}
            style={{width: imageSizeMap[imageSize]}}
            className={styles.img?.className}
            src={url}
            alt={captionString}
            draggable={draggable}
            {...nodeProps}
          />
          {!caption.disabled && (captionString.length || selected) && (
            <figcaption
              style={{width: imageSizeMap[imageSize]}}
              css={styles.figcaption?.css}
              className={styles.figcaption?.className}>
              <TextareaAutosize
                css={styles.caption?.css}
                className={styles.caption?.className}
                value={nodeCaption[0].text}
                placeholder={placeholder}
                onChange={onChangeCaption}
              />
            </figcaption>
          )}
        </figure>
      </div>
      {children}
    </div>
  )
}
