import * as React from 'react'
import {CSSProp} from 'styled-components'

export const MediaEmbedUrlInput = ({
  url,
  onChange,
  ...props
}: {
  className?: string
  css?: CSSProp
  url: string
  onChange: Function
}) => {
  const [value, setValue] = React.useState(url)

  const transformUrl = (newUrl = '') => {
    // if not starting with http, assume pasting of full iframe embed code
    if (newUrl.substring(0, 4) !== 'http') {
      const regexMatchSrc = /src=".*?"/
      const regexGroupQuotes = /"([^"]*)"/

      const src = newUrl.match(regexMatchSrc)?.[0]
      const returnString = src?.match(regexGroupQuotes)?.[1]

      if (returnString) {
        newUrl = returnString
      }
    }
    return newUrl
  }

  return (
    <input
      placeholder={!value ? 'Please add a valid embed url' : undefined}
      value={value}
      onClick={e => e.stopPropagation()}
      onChange={e => {
        const newUrl = transformUrl(e.target.value)
        setValue(newUrl)
        onChange(newUrl)
      }}
      {...props}
    />
  )
}
