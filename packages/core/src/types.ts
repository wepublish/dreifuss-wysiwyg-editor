import {SPEditor} from '@udecode/slate-plugins-core'
import {HistoryEditor} from 'slate-history'
import {ReactEditor} from 'slate-react'

export type TEditor = SPEditor & ReactEditor & HistoryEditor

export type EditorValue = Node[]
