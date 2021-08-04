import React, {useEffect} from 'react'
import {ColorPicker as BaseColorPicker, useColor} from 'react-color-palette'
import './styles.css'

export const ColorPicker = (props: any) => {
  const {type = 'hex', color = '#eee', onChange, style = {}, hideHSV = true} = props

  const {width, height} = style

  const [currentColor, setCurrentColor] = useColor(type, color)

  useEffect(() => {
    if (currentColor && onChange) {
      onChange(currentColor)
    }
  }, [currentColor])

  return (
    <div style={style}>
      <BaseColorPicker
        hideHSV={hideHSV}
        //   dark
        //   hideHSV
        width={width ?? 400}
        height={height ?? 200}
        color={currentColor}
        onChange={setCurrentColor}
      />
    </div>
  )
}
