import {RangeBeforeOptions} from '@udecode/slate-plugins-common'

export interface FontColorNodeData {
  color: string
}

export interface WithFontColorOptions {
  /**
   * Allow custom config for rangeBeforeOptions.
   */
  rangeBeforeOptions?: RangeBeforeOptions
}
