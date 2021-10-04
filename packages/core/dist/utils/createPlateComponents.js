"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlateComponents = void 0;
const plate_alignment_1 = require("@udecode/plate-alignment");
const plate_basic_marks_1 = require("@udecode/plate-basic-marks");
const plate_block_quote_1 = require("@udecode/plate-block-quote");
const plate_block_quote_ui_1 = require("@udecode/plate-block-quote-ui");
const plate_code_block_1 = require("@udecode/plate-code-block");
const plate_code_block_ui_1 = require("@udecode/plate-code-block-ui");
const plate_common_1 = require("@udecode/plate-common");
const plate_find_replace_1 = require("@udecode/plate-find-replace");
const plate_heading_1 = require("@udecode/plate-heading");
const plate_highlight_1 = require("@udecode/plate-highlight");
const plate_kbd_1 = require("@udecode/plate-kbd");
const link_1 = require("@dreifuss-wysiwyg-editor/link");
const link_ui_1 = require("@dreifuss-wysiwyg-editor/link-ui");
const image_ui_1 = require("@dreifuss-wysiwyg-editor/image-ui");
const plate_list_1 = require("@udecode/plate-list");
const plate_list_ui_1 = require("@udecode/plate-list-ui");
const plate_media_embed_1 = require("@udecode/plate-media-embed");
const plate_media_embed_ui_1 = require("@udecode/plate-media-embed-ui");
// import {ELEMENT_MENTION} from '@udecode/plate-mention'
// import {MentionElement} from '@udecode/plate-mention-ui'
const plate_paragraph_1 = require("@udecode/plate-paragraph");
const table_1 = require("@dreifuss-wysiwyg-editor/table");
const table_ui_1 = require("@dreifuss-wysiwyg-editor/table-ui");
const plate_styled_components_1 = require("@udecode/plate-styled-components");
const font_color_1 = require("@dreifuss-wysiwyg-editor/font-color");
const font_color_ui_1 = require("@dreifuss-wysiwyg-editor/font-color-ui");
const image_1 = require("@dreifuss-wysiwyg-editor/image");
const createPlateComponents = (overrides) => {
    const components = {
        [plate_alignment_1.ELEMENT_ALIGN_CENTER]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            styles: {
                root: {
                    textAlign: 'center'
                }
            }
        }),
        [plate_alignment_1.ELEMENT_ALIGN_JUSTIFY]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            styles: {
                root: {
                    textAlign: 'justify'
                }
            }
        }),
        [plate_alignment_1.ELEMENT_ALIGN_LEFT]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            styles: {
                root: {
                    textAlign: 'left'
                }
            }
        }),
        [plate_alignment_1.ELEMENT_ALIGN_RIGHT]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            styles: {
                root: {
                    textAlign: 'right'
                }
            }
        }),
        [plate_block_quote_1.ELEMENT_BLOCKQUOTE]: plate_block_quote_ui_1.BlockquoteElement,
        [plate_code_block_1.ELEMENT_CODE_BLOCK]: plate_code_block_ui_1.CodeBlockElement,
        [plate_code_block_1.ELEMENT_CODE_LINE]: plate_code_block_ui_1.CodeLineElement,
        [plate_heading_1.ELEMENT_H1]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'h1',
            styles: {
                root: {
                    margin: '2em 0 4px',
                    fontSize: '1.875em',
                    fontWeight: 500,
                    lineHeight: '1.3'
                }
            }
        }),
        [plate_heading_1.ELEMENT_H2]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'h2',
            styles: {
                root: {
                    margin: '1.4em 0 1px',
                    fontSize: '1.5em',
                    fontWeight: 500,
                    lineHeight: '1.3'
                }
            }
        }),
        [plate_heading_1.ELEMENT_H3]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'h3',
            styles: {
                root: {
                    margin: '1em 0 1px',
                    color: '#434343',
                    fontSize: '1.25em',
                    fontWeight: 500,
                    lineHeight: '1.3'
                }
            }
        }),
        [plate_heading_1.ELEMENT_H4]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'h4',
            styles: {
                root: {
                    margin: '0.75em 0 0',
                    color: '#666666',
                    fontSize: '1.1em',
                    fontWeight: 500,
                    lineHeight: '1.3'
                }
            }
        }),
        [plate_heading_1.ELEMENT_H5]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'h5',
            styles: {
                root: {
                    margin: '0.75em 0 0',
                    color: '#666666',
                    fontSize: '1.1em',
                    fontWeight: 500,
                    lineHeight: '1.3'
                }
            }
        }),
        [plate_heading_1.ELEMENT_H6]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'h6',
            styles: {
                root: {
                    margin: '0.75em 0 0',
                    color: '#666666',
                    fontSize: '1.1em',
                    fontWeight: 500,
                    lineHeight: '1.3'
                }
            }
        }),
        [plate_list_1.ELEMENT_LI]: plate_common_1.withProps(plate_styled_components_1.StyledElement, { as: 'li' }),
        [link_1.ELEMENT_LINK]: link_ui_1.LinkElement,
        [plate_media_embed_1.ELEMENT_MEDIA_EMBED]: plate_media_embed_ui_1.MediaEmbedElement,
        // [ELEMENT_MENTION]: MentionElement,
        [plate_list_1.ELEMENT_UL]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'ul',
            styles: {
                root: {
                    margin: 0,
                    paddingInlineStart: '24px'
                }
            }
        }),
        [plate_list_1.ELEMENT_OL]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'ol',
            styles: {
                root: {
                    margin: 0,
                    paddingInlineStart: '24px'
                }
            }
        }),
        [plate_paragraph_1.ELEMENT_PARAGRAPH]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'p',
            styles: {
                root: {
                    margin: 0,
                    padding: '4px 0'
                }
            }
        }),
        [table_1.ELEMENT_TABLE]: table_ui_1.TableElement,
        [table_1.ELEMENT_TD]: table_ui_1.TableDataElement,
        [table_1.ELEMENT_TH]: plate_common_1.withProps(plate_styled_components_1.StyledElement, {
            as: 'th',
            styles: {
                root: {
                    backgroundColor: 'rgb(244, 245, 247)',
                    border: '1px solid rgb(193, 199, 208)',
                    padding: '8px',
                    minWidth: '48px',
                    textAlign: 'left',
                    selectors: {
                        '> *': {
                            margin: 0
                        }
                    }
                }
            }
        }),
        [table_1.ELEMENT_TR]: plate_common_1.withProps(plate_styled_components_1.StyledElement, { as: 'tr' }),
        [plate_list_1.ELEMENT_TODO_LI]: plate_list_ui_1.TodoListElement,
        [plate_basic_marks_1.MARK_BOLD]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, { as: 'strong' }),
        [plate_basic_marks_1.MARK_CODE]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, {
            as: 'code',
            styles: {
                root: {
                    whiteSpace: 'pre-wrap',
                    fontSize: '85%',
                    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;',
                    backgroundColor: 'rgba(135,131,120,0.15)',
                    borderRadius: '3px',
                    padding: '0.2em 0.4em',
                    lineHeight: 'normal'
                }
            }
        }),
        [plate_highlight_1.MARK_HIGHLIGHT]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, {
            as: 'mark',
            styles: {
                root: {
                    backgroundColor: '#FEF3B7'
                }
            }
        }),
        [plate_basic_marks_1.MARK_ITALIC]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, { as: 'em' }),
        [plate_kbd_1.MARK_KBD]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, {
            as: 'kbd',
            styles: {
                root: {
                    whiteSpace: 'pre-wrap',
                    fontSize: '75%',
                    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    borderRadius: '3px',
                    padding: '0.2em 0.4em',
                    marginRight: '0.2em',
                    lineHeight: 'normal',
                    boxShadow: '2px 2px 3px 0px rgba(0,0,0,0.75)'
                }
            }
        }),
        [plate_find_replace_1.MARK_SEARCH_HIGHLIGHT]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, {
            as: 'span',
            styles: {
                root: {
                    backgroundColor: '#fff59d'
                }
            }
        }),
        [plate_basic_marks_1.MARK_STRIKETHROUGH]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, { as: 's' }),
        [plate_basic_marks_1.MARK_SUBSCRIPT]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, { as: 'sub' }),
        [plate_basic_marks_1.MARK_SUPERSCRIPT]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, { as: 'sup' }),
        [plate_basic_marks_1.MARK_UNDERLINE]: plate_common_1.withProps(plate_styled_components_1.StyledLeaf, { as: 'u' }),
        [font_color_1.ELEMENT_FONT_COLOR]: font_color_ui_1.RenderFontColorLeaf,
        [image_1.ELEMENT_IMAGE]: plate_common_1.withProps(image_ui_1.ImageElement, { caption: { disabled: true } })
    };
    if (overrides) {
        Object.keys(overrides).forEach(key => {
            components[key] = overrides[key];
        });
    }
    return components;
};
exports.createPlateComponents = createPlateComponents;
//# sourceMappingURL=createPlateComponents.js.map