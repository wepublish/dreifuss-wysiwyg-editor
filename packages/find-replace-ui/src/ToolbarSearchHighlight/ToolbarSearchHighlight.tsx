import * as React from 'react'

export interface ToolbarSearchHighlightProps {
  icon: any
  setSearch: any
}

export const ToolbarSearchHighlight = ({icon: Icon, setSearch}: ToolbarSearchHighlightProps) => (
  <div
    style={{
      position: 'relative'
    }}>
    <Icon
      size={18}
      style={{
        position: 'absolute',
        top: '0.5em',
        left: '0.5em',
        color: '#ccc'
      }}
    />
    <input
      data-testid="ToolbarSearchHighlightInput"
      type="search"
      placeholder="Search the text..."
      onChange={e => setSearch(e.target.value)}
      style={{
        boxSizing: 'border-box',
        fontSize: '0.85em',
        width: '100%',
        padding: '0.5em',
        paddingLeft: '2em',
        border: '2px solid #ddd',
        background: '#fafafa'
      }}
    />
  </div>
)
