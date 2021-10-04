"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlateOptions = void 0;
const plate_alignment_1 = require("@udecode/plate-alignment");
const plate_basic_marks_1 = require("@udecode/plate-basic-marks");
const plate_block_quote_1 = require("@udecode/plate-block-quote");
const plate_code_block_1 = require("@udecode/plate-code-block");
const plate_find_replace_1 = require("@udecode/plate-find-replace");
const plate_heading_1 = require("@udecode/plate-heading");
const plate_highlight_1 = require("@udecode/plate-highlight");
const link_1 = require("@dreifuss-wysiwyg-editor/link");
const plate_list_1 = require("@udecode/plate-list");
const plate_media_embed_1 = require("@udecode/plate-media-embed");
// import {ELEMENT_MENTION} from '@udecode/plate-mention'
const plate_paragraph_1 = require("@udecode/plate-paragraph");
const table_1 = require("@dreifuss-wysiwyg-editor/table");
const image_1 = require("@dreifuss-wysiwyg-editor/image");
/**
 * Get slate plugins options.
 * @param overrides merge into the default options
 */
const createPlateOptions = (overrides) => {
    const options = {
        [plate_alignment_1.ELEMENT_ALIGN_CENTER]: {
            type: 'align-center'
        },
        [plate_alignment_1.ELEMENT_ALIGN_JUSTIFY]: {
            type: 'align-justified'
        },
        [plate_alignment_1.ELEMENT_ALIGN_LEFT]: {
            type: 'align-left'
        },
        [plate_alignment_1.ELEMENT_ALIGN_RIGHT]: {
            type: 'align-right'
        },
        [plate_block_quote_1.ELEMENT_BLOCKQUOTE]: {
            type: 'block-quote'
        },
        [plate_code_block_1.ELEMENT_CODE_BLOCK]: {
            type: 'code-block'
        },
        [plate_code_block_1.ELEMENT_CODE_LINE]: {
            type: 'code-line'
        },
        [plate_paragraph_1.ELEMENT_PARAGRAPH]: {
            type: 'paragraph',
            defaultType: 'paragraph'
        },
        [plate_heading_1.ELEMENT_H1]: {
            type: 'heading-one',
            defaultType: 'heading-one'
        },
        [plate_heading_1.ELEMENT_H2]: {
            type: 'heading-two',
            defaultType: 'heading-two'
        },
        [plate_heading_1.ELEMENT_H3]: {
            type: 'heading-three',
            defaultType: 'heading-three'
        },
        [plate_list_1.ELEMENT_UL]: {
            type: 'unordered-list',
            defaultType: 'unordered-list'
        },
        [plate_list_1.ELEMENT_LI]: {
            type: 'list-item',
            defaultType: 'list-item'
        },
        [link_1.ELEMENT_LINK]: {
            hotkey: ['ctrl+v', 'mod+v']
        },
        [plate_media_embed_1.ELEMENT_MEDIA_EMBED]: {},
        // [ELEMENT_MENTION]: {},
        [plate_list_1.ELEMENT_OL]: {
            type: 'ordered-list',
            defaultType: 'ordered-list'
        },
        [plate_list_1.ELEMENT_LIC]: {
            type: 'list-item-cell'
        },
        [table_1.ELEMENT_TABLE]: {},
        [table_1.ELEMENT_TD]: {
            type: 'table-cell',
            defaultType: 'table-cell'
        },
        [table_1.ELEMENT_TR]: {
            type: 'table-row',
            defaultType: 'table-row'
        },
        [table_1.ELEMENT_TH]: {},
        [plate_list_1.ELEMENT_TODO_LI]: {},
        [plate_basic_marks_1.MARK_BOLD]: {
            ...plate_basic_marks_1.DEFAULTS_BOLD
        },
        [plate_basic_marks_1.MARK_CODE]: {
            ...plate_basic_marks_1.DEFAULTS_CODE
        },
        [plate_highlight_1.MARK_HIGHLIGHT]: {
            ...plate_highlight_1.DEFAULTS_HIGHLIGHT
        },
        [plate_basic_marks_1.MARK_ITALIC]: {
            ...plate_basic_marks_1.DEFAULTS_ITALIC
        },
        [plate_find_replace_1.MARK_SEARCH_HIGHLIGHT]: {
            ...plate_highlight_1.DEFAULTS_HIGHLIGHT
        },
        [plate_basic_marks_1.MARK_STRIKETHROUGH]: {
            ...plate_basic_marks_1.DEFAULTS_STRIKETHROUGH
        },
        [plate_basic_marks_1.MARK_SUBSCRIPT]: {
            ...plate_basic_marks_1.DEFAULTS_SUBSCRIPT
        },
        [plate_basic_marks_1.MARK_SUPERSCRIPT]: {
            ...plate_basic_marks_1.DEFAULTS_SUPERSCRIPT
        },
        [plate_basic_marks_1.MARK_UNDERLINE]: {
            ...plate_basic_marks_1.DEFAULTS_UNDERLINE
        },
        [image_1.ELEMENT_IMAGE]: {}
    };
    if (overrides) {
        Object.keys(overrides).forEach(key => {
            options[key] = overrides[key];
        });
    }
    Object.keys(options).forEach(key => {
        if (!options[key].type) {
            options[key].type = key;
        }
    });
    return options;
};
exports.createPlateOptions = createPlateOptions;
//# sourceMappingURL=createPlateOptions.js.map