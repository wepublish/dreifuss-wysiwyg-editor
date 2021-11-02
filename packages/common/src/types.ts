import {AnyObject, SPEditor, TNode} from '@udecode/plate-core'
import {BaseEditor} from 'slate'
import {HistoryEditor} from 'slate-history'
import {ReactEditor} from 'slate-react'

export type TEditor = BaseEditor & SPEditor & ReactEditor & HistoryEditor

export type EditorValue = TNode<AnyObject>[]
