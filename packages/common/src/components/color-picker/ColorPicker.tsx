import React, {useEffect} from 'react'
import {ColorPicker as BaseColorPicker, useColor} from 'react-color-palette'
import './styles.css'

export const ColorPicker = (props: any) => {
  const {type = 'hex', color = '#eee', onChange} = props
  const [currentColor, setCurrentColor] = useColor(type, color)

  useEffect(() => {
    if (currentColor && onChange) {
      onChange(currentColor)
    }
  }, [currentColor])

  return (
    <BaseColorPicker
      //   dark
      //   hideHSV
      width={456}
      height={228}
      color={currentColor}
      onChange={setCurrentColor}
    />
  )
}
