import ReactDOM from 'react-dom'
import React, {useState, useMemo} from 'react'
import {Node, createEditor} from 'slate'
import {Slate, Editable} from 'slate-react'
import {renderElement, renderLeaf, withSchema} from './elements'
import {withHistory} from 'slate-history'
import './index.css'

import initialValue from './initialValue'
import {TableChart} from '@styled-icons/material'
import {insertTable} from './elements/table'
import {useEventEditorId, useStoreEditorState} from '@udecode/plate-core'

const Editor = () => {
  const [value, setValue] = useState<Node[]>(initialValue)

  const editor = withSchema(useStoreEditorState(useEventEditorId('focus')))

  return (
    <div className="editor-box">
      <Slate editor={editor} value={value} onChange={setValue}>
        <div className="toolbar">
          <Button
            icon={<TableChart />}
            onMouseDown={() => {
              insertTable(editor)
            }}
          />
        </div>
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
      </Slate>
    </div>
  )
}

ReactDOM.render(<Editor />, document.getElementById('root'))
