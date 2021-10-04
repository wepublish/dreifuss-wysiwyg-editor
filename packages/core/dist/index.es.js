import { useEffect } from 'react';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { ToolbarElement, ToolbarMark, BalloonToolbar, HeadingToolbar } from '@udecode/plate-toolbar';
import { ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TR, ELEMENT_TH, insertTable, deleteTable, addRow, deleteRow, addColumn, deleteColumn, createTablePlugin } from '@dreifuss-wysiwyg-editor/table';
import { ELEMENT_ALIGN_CENTER, ELEMENT_ALIGN_JUSTIFY, ELEMENT_ALIGN_LEFT, ELEMENT_ALIGN_RIGHT, createAlignPlugin } from '@udecode/plate-alignment';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, createHeadingPlugin } from '@udecode/plate-heading';
import { MARK_HIGHLIGHT, DEFAULTS_HIGHLIGHT, createHighlightPlugin } from '@udecode/plate-highlight';
import { ELEMENT_PARAGRAPH, createParagraphPlugin } from '@udecode/plate-paragraph';
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, createCodeBlockPlugin } from '@udecode/plate-code-block';
import { ELEMENT_BLOCKQUOTE, createBlockquotePlugin } from '@udecode/plate-block-quote';
import { ELEMENT_MEDIA_EMBED, createMediaEmbedPlugin } from '@udecode/plate-media-embed';
import { MARK_BOLD, DEFAULTS_BOLD, MARK_CODE, DEFAULTS_CODE, MARK_ITALIC, DEFAULTS_ITALIC, MARK_STRIKETHROUGH, DEFAULTS_STRIKETHROUGH, MARK_SUBSCRIPT, DEFAULTS_SUBSCRIPT, MARK_SUPERSCRIPT, DEFAULTS_SUPERSCRIPT, MARK_UNDERLINE, DEFAULTS_UNDERLINE, createBoldPlugin, createCodePlugin, createItalicPlugin, createUnderlinePlugin, createSubscriptPlugin, createSuperscriptPlugin, createStrikethroughPlugin } from '@udecode/plate-basic-marks';
import { MARK_SEARCH_HIGHLIGHT } from '@udecode/plate-find-replace';
import { ELEMENT_LINK, createLinkPlugin } from '@dreifuss-wysiwyg-editor/link';
import { ELEMENT_UL, ELEMENT_LI, ELEMENT_OL, ELEMENT_LIC, ELEMENT_TODO_LI, createListPlugin, createTodoListPlugin } from '@udecode/plate-list';
import { ELEMENT_IMAGE, createImagePlugin } from '@dreifuss-wysiwyg-editor/image';
import { H1Icon, H2Icon, H3Icon, BlockQuoteIcon, BlockCodeIcon, ListULIcon, ListOLIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, BoldIcon, ItalicIcon, UnderlineIcon, StrikeThroughIcon, SuperscriptIcon, SubscriptIcon, BorderAllIcon, BorderClearIcon, BorderBottomIcon, BorderTopIcon, BorderLeftIcon, BorderRightIcon, Modal, LinkIcon, ImageIcon, CharactersCountIcon } from '@dreifuss-wysiwyg-editor/common';
import { createBasicElementPlugins } from '@udecode/plate-basic-elements';
import { BlockquoteElement } from '@udecode/plate-block-quote-ui';
import { CodeBlockElement, CodeLineElement, ToolbarCodeBlock } from '@udecode/plate-code-block-ui';
import { withProps } from '@udecode/plate-common';
import { MARK_KBD } from '@udecode/plate-kbd';
import { LinkElement, ToolbarLink } from '@dreifuss-wysiwyg-editor/link-ui';
import { ImageElement, ToolbarImage } from '@dreifuss-wysiwyg-editor/image-ui';
import { TodoListElement, ToolbarList } from '@udecode/plate-list-ui';
import { MediaEmbedElement } from '@udecode/plate-media-embed-ui';
import { TableElement, TableDataElement, ToolbarTable, TableBorderColorToolbar, TableBgColorToolbar } from '@dreifuss-wysiwyg-editor/table-ui';
import { StyledElement, StyledLeaf } from '@udecode/plate-styled-components';
import { ELEMENT_FONT_COLOR, createFontColorPlugin } from '@dreifuss-wysiwyg-editor/font-color';
import { RenderFontColorLeaf, FontColorToolbar } from '@dreifuss-wysiwyg-editor/font-color-ui';
import { getCharacterCount, CharCountToolbar } from '@dreifuss-wysiwyg-editor/character-count-ui';
import { getPlatePluginType, useEditorRef, useStoreEditorState, useEventEditorId, createReactPlugin, createHistoryPlugin, Plate } from '@udecode/plate-core';
import { QuotationMarksMenu } from '@dreifuss-wysiwyg-editor/quotation-mark-ui';
import { ELEMENT_QUOTATION_MARK } from '@dreifuss-wysiwyg-editor/quotation-mark';
import { createDeserializeMDPlugin } from '@udecode/plate-md-serializer';
import { ToolbarAlign } from '@udecode/plate-alignment-ui';

let DividerType;

(function (DividerType) {
  DividerType["horizontal"] = "Horizontal";
  DividerType["vertical"] = "Vertical";
})(DividerType || (DividerType = {}));

const Divider = props => /*#__PURE__*/jsx("hr", {
  style: {
    margin: props.type === DividerType.vertical ? '0 10px' : '10px 0',
    height: props.type === DividerType.vertical ? '22px' : undefined,
    borderLeft: '1px solid black'
  }
});

/**
 * Get slate plugins options.
 * @param overrides merge into the default options
 */
const createPlateOptions = overrides => {
  const options = {
    [ELEMENT_ALIGN_CENTER]: {
      type: 'align-center'
    },
    [ELEMENT_ALIGN_JUSTIFY]: {
      type: 'align-justified'
    },
    [ELEMENT_ALIGN_LEFT]: {
      type: 'align-left'
    },
    [ELEMENT_ALIGN_RIGHT]: {
      type: 'align-right'
    },
    [ELEMENT_BLOCKQUOTE]: {
      type: 'block-quote'
    },
    [ELEMENT_CODE_BLOCK]: {
      type: 'code-block'
    },
    [ELEMENT_CODE_LINE]: {
      type: 'code-line'
    },
    [ELEMENT_PARAGRAPH]: {
      type: 'paragraph',
      defaultType: 'paragraph'
    },
    [ELEMENT_H1]: {
      type: 'heading-one',
      defaultType: 'heading-one'
    },
    [ELEMENT_H2]: {
      type: 'heading-two',
      defaultType: 'heading-two'
    },
    [ELEMENT_H3]: {
      type: 'heading-three',
      defaultType: 'heading-three'
    },
    [ELEMENT_UL]: {
      type: 'unordered-list',
      defaultType: 'unordered-list'
    },
    [ELEMENT_LI]: {
      type: 'list-item',
      defaultType: 'list-item'
    },
    [ELEMENT_LINK]: {
      hotkey: ['ctrl+v', 'mod+v']
    },
    [ELEMENT_MEDIA_EMBED]: {},
    // [ELEMENT_MENTION]: {},
    [ELEMENT_OL]: {
      type: 'ordered-list',
      defaultType: 'ordered-list'
    },
    [ELEMENT_LIC]: {
      type: 'list-item-cell'
    },
    [ELEMENT_TABLE]: {},
    [ELEMENT_TD]: {
      type: 'table-cell',
      defaultType: 'table-cell'
    },
    [ELEMENT_TR]: {
      type: 'table-row',
      defaultType: 'table-row'
    },
    [ELEMENT_TH]: {},
    [ELEMENT_TODO_LI]: {},
    [MARK_BOLD]: { ...DEFAULTS_BOLD
    },
    [MARK_CODE]: { ...DEFAULTS_CODE
    },
    [MARK_HIGHLIGHT]: { ...DEFAULTS_HIGHLIGHT
    },
    [MARK_ITALIC]: { ...DEFAULTS_ITALIC
    },
    [MARK_SEARCH_HIGHLIGHT]: { ...DEFAULTS_HIGHLIGHT
    },
    [MARK_STRIKETHROUGH]: { ...DEFAULTS_STRIKETHROUGH
    },
    [MARK_SUBSCRIPT]: { ...DEFAULTS_SUBSCRIPT
    },
    [MARK_SUPERSCRIPT]: { ...DEFAULTS_SUPERSCRIPT
    },
    [MARK_UNDERLINE]: { ...DEFAULTS_UNDERLINE
    },
    [ELEMENT_IMAGE]: {}
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

const createPlateComponents = overrides => {
  const components = {
    [ELEMENT_ALIGN_CENTER]: withProps(StyledElement, {
      styles: {
        root: {
          textAlign: 'center'
        }
      }
    }),
    [ELEMENT_ALIGN_JUSTIFY]: withProps(StyledElement, {
      styles: {
        root: {
          textAlign: 'justify'
        }
      }
    }),
    [ELEMENT_ALIGN_LEFT]: withProps(StyledElement, {
      styles: {
        root: {
          textAlign: 'left'
        }
      }
    }),
    [ELEMENT_ALIGN_RIGHT]: withProps(StyledElement, {
      styles: {
        root: {
          textAlign: 'right'
        }
      }
    }),
    [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
    [ELEMENT_CODE_BLOCK]: CodeBlockElement,
    [ELEMENT_CODE_LINE]: CodeLineElement,
    [ELEMENT_H1]: withProps(StyledElement, {
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
    [ELEMENT_H2]: withProps(StyledElement, {
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
    [ELEMENT_H3]: withProps(StyledElement, {
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
    [ELEMENT_H4]: withProps(StyledElement, {
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
    [ELEMENT_H5]: withProps(StyledElement, {
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
    [ELEMENT_H6]: withProps(StyledElement, {
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
    [ELEMENT_LI]: withProps(StyledElement, {
      as: 'li'
    }),
    [ELEMENT_LINK]: LinkElement,
    [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
    // [ELEMENT_MENTION]: MentionElement,
    [ELEMENT_UL]: withProps(StyledElement, {
      as: 'ul',
      styles: {
        root: {
          margin: 0,
          paddingInlineStart: '24px'
        }
      }
    }),
    [ELEMENT_OL]: withProps(StyledElement, {
      as: 'ol',
      styles: {
        root: {
          margin: 0,
          paddingInlineStart: '24px'
        }
      }
    }),
    [ELEMENT_PARAGRAPH]: withProps(StyledElement, {
      as: 'p',
      styles: {
        root: {
          margin: 0,
          padding: '4px 0'
        }
      }
    }),
    [ELEMENT_TABLE]: TableElement,
    [ELEMENT_TD]: TableDataElement,
    [ELEMENT_TH]: withProps(StyledElement, {
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
    [ELEMENT_TR]: withProps(StyledElement, {
      as: 'tr'
    }),
    [ELEMENT_TODO_LI]: TodoListElement,
    [MARK_BOLD]: withProps(StyledLeaf, {
      as: 'strong'
    }),
    [MARK_CODE]: withProps(StyledLeaf, {
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
    [MARK_HIGHLIGHT]: withProps(StyledLeaf, {
      as: 'mark',
      styles: {
        root: {
          backgroundColor: '#FEF3B7'
        }
      }
    }),
    [MARK_ITALIC]: withProps(StyledLeaf, {
      as: 'em'
    }),
    [MARK_KBD]: withProps(StyledLeaf, {
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
    [MARK_SEARCH_HIGHLIGHT]: withProps(StyledLeaf, {
      as: 'span',
      styles: {
        root: {
          backgroundColor: '#fff59d'
        }
      }
    }),
    [MARK_STRIKETHROUGH]: withProps(StyledLeaf, {
      as: 's'
    }),
    [MARK_SUBSCRIPT]: withProps(StyledLeaf, {
      as: 'sub'
    }),
    [MARK_SUPERSCRIPT]: withProps(StyledLeaf, {
      as: 'sup'
    }),
    [MARK_UNDERLINE]: withProps(StyledLeaf, {
      as: 'u'
    }),
    [ELEMENT_FONT_COLOR]: RenderFontColorLeaf,
    [ELEMENT_IMAGE]: withProps(ImageElement, {
      caption: {
        disabled: true
      }
    })
  };

  if (overrides) {
    Object.keys(overrides).forEach(key => {
      components[key] = overrides[key];
    });
  }

  return components;
};

const ToolbarBasicElementsButtons = () => /*#__PURE__*/jsxs(Fragment, {
  children: [/*#__PURE__*/jsx(ToolbarElement, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_H1),
    icon: /*#__PURE__*/jsx(H1Icon, {})
  }), /*#__PURE__*/jsx(ToolbarElement, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_H2),
    icon: /*#__PURE__*/jsx(H2Icon, {})
  }), /*#__PURE__*/jsx(ToolbarElement, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_H3),
    icon: /*#__PURE__*/jsx(H3Icon, {})
  }), /*#__PURE__*/jsx(ToolbarElement, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_BLOCKQUOTE),
    icon: /*#__PURE__*/jsx(BlockQuoteIcon, {})
  }), /*#__PURE__*/jsx(ToolbarCodeBlock, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_CODE_BLOCK),
    icon: /*#__PURE__*/jsx(BlockCodeIcon, {})
  })]
});
const ToolbarListButtons = () => /*#__PURE__*/jsxs(Fragment, {
  children: [/*#__PURE__*/jsx(ToolbarList, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_UL),
    icon: /*#__PURE__*/jsx(ListULIcon, {})
  }), /*#__PURE__*/jsx(ToolbarList, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_OL),
    icon: /*#__PURE__*/jsx(ListOLIcon, {})
  })]
});
const ToolbarAlignButtons = () => /*#__PURE__*/jsxs(Fragment, {
  children: [/*#__PURE__*/jsx(ToolbarAlign, {
    icon: /*#__PURE__*/jsx(AlignLeftIcon, {})
  }), /*#__PURE__*/jsx(ToolbarAlign, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_ALIGN_CENTER),
    icon: /*#__PURE__*/jsx(AlignCenterIcon, {})
  }), /*#__PURE__*/jsx(ToolbarAlign, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_ALIGN_RIGHT),
    icon: /*#__PURE__*/jsx(AlignRightIcon, {})
  }), /*#__PURE__*/jsx(ToolbarAlign, {
    type: getPlatePluginType(useEditorRef(), ELEMENT_ALIGN_JUSTIFY),
    icon: /*#__PURE__*/jsx(AlignJustifyIcon, {})
  })]
});
const ToolbarBasicMarksButtons = () => {
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(useEditorRef(), MARK_BOLD),
      icon: /*#__PURE__*/jsx(BoldIcon, {})
    }), /*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(useEditorRef(), MARK_ITALIC),
      icon: /*#__PURE__*/jsx(ItalicIcon, {})
    }), /*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(useEditorRef(), MARK_UNDERLINE),
      icon: /*#__PURE__*/jsx(UnderlineIcon, {})
    }), /*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(useEditorRef(), MARK_STRIKETHROUGH),
      icon: /*#__PURE__*/jsx(StrikeThroughIcon, {})
    }), /*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(useEditorRef(), MARK_CODE),
      icon: 'code'
    }), /*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(useEditorRef(), MARK_SUPERSCRIPT),
      clear: getPlatePluginType(useEditorRef(), MARK_SUBSCRIPT),
      icon: /*#__PURE__*/jsx(SuperscriptIcon, {})
    }), /*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(useEditorRef(), MARK_SUBSCRIPT),
      clear: getPlatePluginType(useEditorRef(), MARK_SUPERSCRIPT),
      icon: /*#__PURE__*/jsx(SubscriptIcon, {})
    })]
  });
};
const ToolbarTableButtons = () => /*#__PURE__*/jsxs(Fragment, {
  children: [/*#__PURE__*/jsx(ToolbarTable, {
    icon: /*#__PURE__*/jsx(BorderAllIcon, {}),
    transform: insertTable
  }), /*#__PURE__*/jsx(ToolbarTable, {
    icon: /*#__PURE__*/jsx(BorderClearIcon, {}),
    transform: deleteTable
  }), /*#__PURE__*/jsx(ToolbarTable, {
    icon: /*#__PURE__*/jsx(BorderBottomIcon, {}),
    transform: addRow
  }), /*#__PURE__*/jsx(ToolbarTable, {
    icon: /*#__PURE__*/jsx(BorderTopIcon, {}),
    transform: deleteRow
  }), /*#__PURE__*/jsx(ToolbarTable, {
    icon: /*#__PURE__*/jsx(BorderLeftIcon, {}),
    transform: addColumn
  }), /*#__PURE__*/jsx(ToolbarTable, {
    icon: /*#__PURE__*/jsx(BorderRightIcon, {}),
    transform: deleteColumn
  }), /*#__PURE__*/jsx(TableBorderColorToolbar, {}), /*#__PURE__*/jsx(TableBgColorToolbar, {})]
});
const ToolbarBalloon = () => {
  const arrow = true;
  const tooltip = {
    arrow,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: 'top'
  };
  const editor = useStoreEditorState(useEventEditorId('focus'));
  return /*#__PURE__*/jsxs(BalloonToolbar, {
    direction: "top",
    hiddenDelay: 0,
    theme: "light",
    arrow: arrow,
    children: [/*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(editor, MARK_BOLD),
      icon: /*#__PURE__*/jsx(BoldIcon, {}) // @ts-ignore
      ,
      tooltip: {
        content: 'Bold (⌘B)',
        ...tooltip
      }
    }), /*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(editor, MARK_ITALIC),
      icon: /*#__PURE__*/jsx(ItalicIcon, {}) // @ts-ignore
      ,
      tooltip: {
        content: 'Italic (⌘I)',
        ...tooltip
      }
    }), /*#__PURE__*/jsx(ToolbarMark, {
      type: getPlatePluginType(editor, MARK_UNDERLINE),
      icon: /*#__PURE__*/jsx(UnderlineIcon, {}) // @ts-ignore
      ,
      tooltip: {
        content: 'Underline (⌘U)',
        ...tooltip
      }
    }), /*#__PURE__*/jsx(ToolbarElement, {
      type: getPlatePluginType(useEditorRef(), ELEMENT_H1),
      icon: /*#__PURE__*/jsx(H1Icon, {})
    }), /*#__PURE__*/jsx(ToolbarElement, {
      type: getPlatePluginType(useEditorRef(), ELEMENT_H2),
      icon: /*#__PURE__*/jsx(H2Icon, {})
    }), /*#__PURE__*/jsx(ToolbarElement, {
      type: getPlatePluginType(useEditorRef(), ELEMENT_H3),
      icon: /*#__PURE__*/jsx(H3Icon, {})
    }), /*#__PURE__*/jsx(ToolbarList, {
      type: getPlatePluginType(useEditorRef(), ELEMENT_UL),
      icon: /*#__PURE__*/jsx(ListULIcon, {})
    })]
  });
};

function DreifussWysiwygEditor(props) {
  var _ref, _props$displayOnly;

  const {
    id = 'main',
    showCharactersCount = true,
    toolbars
  } = props;
  const components = createPlateComponents();
  const options = createPlateOptions();
  const editableProps = {
    placeholder: "What's on your mind?",
    spellCheck: false,
    autoFocus: true,
    readOnly: (_ref = (_props$displayOnly = props.displayOnly) !== null && _props$displayOnly !== void 0 ? _props$displayOnly : props.disabled) !== null && _ref !== void 0 ? _ref : false,
    style: props.displayOneLine ? {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: 'inherit'
    } : {}
  };
  const charCount = getCharacterCount(id);
  useEffect(() => {
    if (props !== null && props !== void 0 && props.charactersCount) props.charactersCount(charCount);
  }, [charCount]);
  const plugins = [...createBasicElementPlugins(), createReactPlugin(), createHistoryPlugin(), createLinkPlugin(), createListPlugin(), createBoldPlugin(), createCodePlugin(), createAlignPlugin(), createTablePlugin(), createItalicPlugin(), createTodoListPlugin(), createFontColorPlugin(), createParagraphPlugin(), createHighlightPlugin(), createCodeBlockPlugin(), createUnderlinePlugin(), createSubscriptPlugin(), createMediaEmbedPlugin(), createBlockquotePlugin(), createSuperscriptPlugin(), createStrikethroughPlugin(), createHeadingPlugin({
    levels: 3
  }), createDeserializeMDPlugin(), createImagePlugin()];
  return /*#__PURE__*/jsxs(Plate, {
    id: props.id,
    onChange: props.onChange,
    plugins: plugins,
    components: components,
    options: options,
    editableProps: editableProps,
    initialValue: JSON.parse(JSON.stringify(props.value || props.initialValue)),
    children: [/*#__PURE__*/jsx(ToolbarBalloon, {}), !props.displayOnly && /*#__PURE__*/jsxs(HeadingToolbar, {
      children: [/*#__PURE__*/jsx(ToolbarBasicElementsButtons, {}), /*#__PURE__*/jsx(Modal, {
        type: ELEMENT_QUOTATION_MARK,
        Icon: '«»',
        children: /*#__PURE__*/jsx(QuotationMarksMenu, {})
      }), /*#__PURE__*/jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsx(ToolbarListButtons, {}), /*#__PURE__*/jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsx(ToolbarBasicMarksButtons, {}), /*#__PURE__*/jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsx(FontColorToolbar, {}), /*#__PURE__*/jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsx(ToolbarAlignButtons, {}), /*#__PURE__*/jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsx(ToolbarTableButtons, {}), /*#__PURE__*/jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsx(Modal, {
        type: ELEMENT_LINK,
        Icon: /*#__PURE__*/jsx(LinkIcon, {}),
        children: /*#__PURE__*/jsx(ToolbarLink, {})
      }), /*#__PURE__*/jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsx(Modal, {
        type: ELEMENT_IMAGE,
        Icon: /*#__PURE__*/jsx(ImageIcon, {}),
        children: /*#__PURE__*/jsx(ToolbarImage, {
          CustomComponent: toolbars === null || toolbars === void 0 ? void 0 : toolbars.ImageToolbar
        })
      })]
    }), showCharactersCount && /*#__PURE__*/jsxs("p", {
      style: {
        textAlign: 'right'
      },
      children: [/*#__PURE__*/jsx(CharactersCountIcon, {}), " ", /*#__PURE__*/jsx(CharCountToolbar, {
        id: id
      })]
    })]
  });
}

export { DreifussWysiwygEditor };
//# sourceMappingURL=index.es.js.map
