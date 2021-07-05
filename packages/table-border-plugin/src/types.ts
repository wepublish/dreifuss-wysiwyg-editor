import {RangeBeforeOptions} from '@udecode/slate-plugins-common'

export interface BorderColorNodeData {
  color: string
}

export interface WithBorderColorOptions {
  /**
   * Allow custom config for rangeBeforeOptions.
   */
  rangeBeforeOptions?: RangeBeforeOptions
}
