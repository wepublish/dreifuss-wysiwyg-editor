import {RangeBeforeOptions} from '@udecode/slate-plugins-common'

export interface CharacterCountNodeData {
  url: string
}

export interface WithCharacterCountOptions {
  /**
   * Allow custom config for rangeBeforeOptions.
   */
  rangeBeforeOptions?: RangeBeforeOptions

  /**
   * Callback to validate an url.
   */
  isUrl?: (text: string) => boolean
}
