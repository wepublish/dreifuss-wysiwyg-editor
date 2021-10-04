'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var plateToolbar = require('@udecode/plate-toolbar');
var table = require('@dreifuss-wysiwyg-editor/table');
var plateAlignment = require('@udecode/plate-alignment');
var plateHeading = require('@udecode/plate-heading');
var plateHighlight = require('@udecode/plate-highlight');
var plateParagraph = require('@udecode/plate-paragraph');
var plateCodeBlock = require('@udecode/plate-code-block');
var plateBlockQuote = require('@udecode/plate-block-quote');
var plateMediaEmbed = require('@udecode/plate-media-embed');
var plateBasicMarks = require('@udecode/plate-basic-marks');
var plateFindReplace = require('@udecode/plate-find-replace');
var link = require('@dreifuss-wysiwyg-editor/link');
var plateList = require('@udecode/plate-list');
var image = require('@dreifuss-wysiwyg-editor/image');
var common = require('@dreifuss-wysiwyg-editor/common');
var plateBasicElements = require('@udecode/plate-basic-elements');
var plateBlockQuoteUi = require('@udecode/plate-block-quote-ui');
var plateCodeBlockUi = require('@udecode/plate-code-block-ui');
var plateCommon = require('@udecode/plate-common');
var plateKbd = require('@udecode/plate-kbd');
var linkUi = require('@dreifuss-wysiwyg-editor/link-ui');
var imageUi = require('@dreifuss-wysiwyg-editor/image-ui');
var plateListUi = require('@udecode/plate-list-ui');
var plateMediaEmbedUi = require('@udecode/plate-media-embed-ui');
var tableUi = require('@dreifuss-wysiwyg-editor/table-ui');
var plateStyledComponents = require('@udecode/plate-styled-components');
var fontColor = require('@dreifuss-wysiwyg-editor/font-color');
var fontColorUi = require('@dreifuss-wysiwyg-editor/font-color-ui');
var characterCountUi = require('@dreifuss-wysiwyg-editor/character-count-ui');
var plateCore = require('@udecode/plate-core');
var quotationMarkUi = require('@dreifuss-wysiwyg-editor/quotation-mark-ui');
var quotationMark = require('@dreifuss-wysiwyg-editor/quotation-mark');
var plateMdSerializer = require('@udecode/plate-md-serializer');
var plateAlignmentUi = require('@udecode/plate-alignment-ui');

let DividerType;

(function (DividerType) {
  DividerType["horizontal"] = "Horizontal";
  DividerType["vertical"] = "Vertical";
})(DividerType || (DividerType = {}));

const Divider = props => /*#__PURE__*/jsxRuntime.jsx("hr", {
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
    [plateAlignment.ELEMENT_ALIGN_CENTER]: {
      type: 'align-center'
    },
    [plateAlignment.ELEMENT_ALIGN_JUSTIFY]: {
      type: 'align-justified'
    },
    [plateAlignment.ELEMENT_ALIGN_LEFT]: {
      type: 'align-left'
    },
    [plateAlignment.ELEMENT_ALIGN_RIGHT]: {
      type: 'align-right'
    },
    [plateBlockQuote.ELEMENT_BLOCKQUOTE]: {
      type: 'block-quote'
    },
    [plateCodeBlock.ELEMENT_CODE_BLOCK]: {
      type: 'code-block'
    },
    [plateCodeBlock.ELEMENT_CODE_LINE]: {
      type: 'code-line'
    },
    [plateParagraph.ELEMENT_PARAGRAPH]: {
      type: 'paragraph',
      defaultType: 'paragraph'
    },
    [plateHeading.ELEMENT_H1]: {
      type: 'heading-one',
      defaultType: 'heading-one'
    },
    [plateHeading.ELEMENT_H2]: {
      type: 'heading-two',
      defaultType: 'heading-two'
    },
    [plateHeading.ELEMENT_H3]: {
      type: 'heading-three',
      defaultType: 'heading-three'
    },
    [plateList.ELEMENT_UL]: {
      type: 'unordered-list',
      defaultType: 'unordered-list'
    },
    [plateList.ELEMENT_LI]: {
      type: 'list-item',
      defaultType: 'list-item'
    },
    [link.ELEMENT_LINK]: {
      hotkey: ['ctrl+v', 'mod+v']
    },
    [plateMediaEmbed.ELEMENT_MEDIA_EMBED]: {},
    // [ELEMENT_MENTION]: {},
    [plateList.ELEMENT_OL]: {
      type: 'ordered-list',
      defaultType: 'ordered-list'
    },
    [plateList.ELEMENT_LIC]: {
      type: 'list-item-cell'
    },
    [table.ELEMENT_TABLE]: {},
    [table.ELEMENT_TD]: {
      type: 'table-cell',
      defaultType: 'table-cell'
    },
    [table.ELEMENT_TR]: {
      type: 'table-row',
      defaultType: 'table-row'
    },
    [table.ELEMENT_TH]: {},
    [plateList.ELEMENT_TODO_LI]: {},
    [plateBasicMarks.MARK_BOLD]: { ...plateBasicMarks.DEFAULTS_BOLD
    },
    [plateBasicMarks.MARK_CODE]: { ...plateBasicMarks.DEFAULTS_CODE
    },
    [plateHighlight.MARK_HIGHLIGHT]: { ...plateHighlight.DEFAULTS_HIGHLIGHT
    },
    [plateBasicMarks.MARK_ITALIC]: { ...plateBasicMarks.DEFAULTS_ITALIC
    },
    [plateFindReplace.MARK_SEARCH_HIGHLIGHT]: { ...plateHighlight.DEFAULTS_HIGHLIGHT
    },
    [plateBasicMarks.MARK_STRIKETHROUGH]: { ...plateBasicMarks.DEFAULTS_STRIKETHROUGH
    },
    [plateBasicMarks.MARK_SUBSCRIPT]: { ...plateBasicMarks.DEFAULTS_SUBSCRIPT
    },
    [plateBasicMarks.MARK_SUPERSCRIPT]: { ...plateBasicMarks.DEFAULTS_SUPERSCRIPT
    },
    [plateBasicMarks.MARK_UNDERLINE]: { ...plateBasicMarks.DEFAULTS_UNDERLINE
    },
    [image.ELEMENT_IMAGE]: {}
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
    [plateAlignment.ELEMENT_ALIGN_CENTER]: plateCommon.withProps(plateStyledComponents.StyledElement, {
      styles: {
        root: {
          textAlign: 'center'
        }
      }
    }),
    [plateAlignment.ELEMENT_ALIGN_JUSTIFY]: plateCommon.withProps(plateStyledComponents.StyledElement, {
      styles: {
        root: {
          textAlign: 'justify'
        }
      }
    }),
    [plateAlignment.ELEMENT_ALIGN_LEFT]: plateCommon.withProps(plateStyledComponents.StyledElement, {
      styles: {
        root: {
          textAlign: 'left'
        }
      }
    }),
    [plateAlignment.ELEMENT_ALIGN_RIGHT]: plateCommon.withProps(plateStyledComponents.StyledElement, {
      styles: {
        root: {
          textAlign: 'right'
        }
      }
    }),
    [plateBlockQuote.ELEMENT_BLOCKQUOTE]: plateBlockQuoteUi.BlockquoteElement,
    [plateCodeBlock.ELEMENT_CODE_BLOCK]: plateCodeBlockUi.CodeBlockElement,
    [plateCodeBlock.ELEMENT_CODE_LINE]: plateCodeBlockUi.CodeLineElement,
    [plateHeading.ELEMENT_H1]: plateCommon.withProps(plateStyledComponents.StyledElement, {
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
    [plateHeading.ELEMENT_H2]: plateCommon.withProps(plateStyledComponents.StyledElement, {
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
    [plateHeading.ELEMENT_H3]: plateCommon.withProps(plateStyledComponents.StyledElement, {
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
    [plateHeading.ELEMENT_H4]: plateCommon.withProps(plateStyledComponents.StyledElement, {
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
    [plateHeading.ELEMENT_H5]: plateCommon.withProps(plateStyledComponents.StyledElement, {
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
    [plateHeading.ELEMENT_H6]: plateCommon.withProps(plateStyledComponents.StyledElement, {
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
    [plateList.ELEMENT_LI]: plateCommon.withProps(plateStyledComponents.StyledElement, {
      as: 'li'
    }),
    [link.ELEMENT_LINK]: linkUi.LinkElement,
    [plateMediaEmbed.ELEMENT_MEDIA_EMBED]: plateMediaEmbedUi.MediaEmbedElement,
    // [ELEMENT_MENTION]: MentionElement,
    [plateList.ELEMENT_UL]: plateCommon.withProps(plateStyledComponents.StyledElement, {
      as: 'ul',
      styles: {
        root: {
          margin: 0,
          paddingInlineStart: '24px'
        }
      }
    }),
    [plateList.ELEMENT_OL]: plateCommon.withProps(plateStyledComponents.StyledElement, {
      as: 'ol',
      styles: {
        root: {
          margin: 0,
          paddingInlineStart: '24px'
        }
      }
    }),
    [plateParagraph.ELEMENT_PARAGRAPH]: plateCommon.withProps(plateStyledComponents.StyledElement, {
      as: 'p',
      styles: {
        root: {
          margin: 0,
          padding: '4px 0'
        }
      }
    }),
    [table.ELEMENT_TABLE]: tableUi.TableElement,
    [table.ELEMENT_TD]: tableUi.TableDataElement,
    [table.ELEMENT_TH]: plateCommon.withProps(plateStyledComponents.StyledElement, {
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
    [table.ELEMENT_TR]: plateCommon.withProps(plateStyledComponents.StyledElement, {
      as: 'tr'
    }),
    [plateList.ELEMENT_TODO_LI]: plateListUi.TodoListElement,
    [plateBasicMarks.MARK_BOLD]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
      as: 'strong'
    }),
    [plateBasicMarks.MARK_CODE]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
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
    [plateHighlight.MARK_HIGHLIGHT]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
      as: 'mark',
      styles: {
        root: {
          backgroundColor: '#FEF3B7'
        }
      }
    }),
    [plateBasicMarks.MARK_ITALIC]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
      as: 'em'
    }),
    [plateKbd.MARK_KBD]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
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
    [plateFindReplace.MARK_SEARCH_HIGHLIGHT]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
      as: 'span',
      styles: {
        root: {
          backgroundColor: '#fff59d'
        }
      }
    }),
    [plateBasicMarks.MARK_STRIKETHROUGH]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
      as: 's'
    }),
    [plateBasicMarks.MARK_SUBSCRIPT]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
      as: 'sub'
    }),
    [plateBasicMarks.MARK_SUPERSCRIPT]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
      as: 'sup'
    }),
    [plateBasicMarks.MARK_UNDERLINE]: plateCommon.withProps(plateStyledComponents.StyledLeaf, {
      as: 'u'
    }),
    [fontColor.ELEMENT_FONT_COLOR]: fontColorUi.RenderFontColorLeaf,
    [image.ELEMENT_IMAGE]: plateCommon.withProps(imageUi.ImageElement, {
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

const ToolbarBasicElementsButtons = () => /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
  children: [/*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarElement, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateHeading.ELEMENT_H1),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.H1Icon, {})
  }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarElement, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateHeading.ELEMENT_H2),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.H2Icon, {})
  }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarElement, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateHeading.ELEMENT_H3),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.H3Icon, {})
  }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarElement, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBlockQuote.ELEMENT_BLOCKQUOTE),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.BlockQuoteIcon, {})
  }), /*#__PURE__*/jsxRuntime.jsx(plateCodeBlockUi.ToolbarCodeBlock, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateCodeBlock.ELEMENT_CODE_BLOCK),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.BlockCodeIcon, {})
  })]
});
const ToolbarListButtons = () => /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
  children: [/*#__PURE__*/jsxRuntime.jsx(plateListUi.ToolbarList, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateList.ELEMENT_UL),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.ListULIcon, {})
  }), /*#__PURE__*/jsxRuntime.jsx(plateListUi.ToolbarList, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateList.ELEMENT_OL),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.ListOLIcon, {})
  })]
});
const ToolbarAlignButtons = () => /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
  children: [/*#__PURE__*/jsxRuntime.jsx(plateAlignmentUi.ToolbarAlign, {
    icon: /*#__PURE__*/jsxRuntime.jsx(common.AlignLeftIcon, {})
  }), /*#__PURE__*/jsxRuntime.jsx(plateAlignmentUi.ToolbarAlign, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateAlignment.ELEMENT_ALIGN_CENTER),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.AlignCenterIcon, {})
  }), /*#__PURE__*/jsxRuntime.jsx(plateAlignmentUi.ToolbarAlign, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateAlignment.ELEMENT_ALIGN_RIGHT),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.AlignRightIcon, {})
  }), /*#__PURE__*/jsxRuntime.jsx(plateAlignmentUi.ToolbarAlign, {
    type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateAlignment.ELEMENT_ALIGN_JUSTIFY),
    icon: /*#__PURE__*/jsxRuntime.jsx(common.AlignJustifyIcon, {})
  })]
});
const ToolbarBasicMarksButtons = () => {
  return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBasicMarks.MARK_BOLD),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.BoldIcon, {})
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBasicMarks.MARK_ITALIC),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.ItalicIcon, {})
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBasicMarks.MARK_UNDERLINE),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.UnderlineIcon, {})
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBasicMarks.MARK_STRIKETHROUGH),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.StrikeThroughIcon, {})
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBasicMarks.MARK_CODE),
      icon: 'code'
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBasicMarks.MARK_SUPERSCRIPT),
      clear: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBasicMarks.MARK_SUBSCRIPT),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.SuperscriptIcon, {})
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBasicMarks.MARK_SUBSCRIPT),
      clear: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateBasicMarks.MARK_SUPERSCRIPT),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.SubscriptIcon, {})
    })]
  });
};
const ToolbarTableButtons = () => /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
  children: [/*#__PURE__*/jsxRuntime.jsx(tableUi.ToolbarTable, {
    icon: /*#__PURE__*/jsxRuntime.jsx(common.BorderAllIcon, {}),
    transform: table.insertTable
  }), /*#__PURE__*/jsxRuntime.jsx(tableUi.ToolbarTable, {
    icon: /*#__PURE__*/jsxRuntime.jsx(common.BorderClearIcon, {}),
    transform: table.deleteTable
  }), /*#__PURE__*/jsxRuntime.jsx(tableUi.ToolbarTable, {
    icon: /*#__PURE__*/jsxRuntime.jsx(common.BorderBottomIcon, {}),
    transform: table.addRow
  }), /*#__PURE__*/jsxRuntime.jsx(tableUi.ToolbarTable, {
    icon: /*#__PURE__*/jsxRuntime.jsx(common.BorderTopIcon, {}),
    transform: table.deleteRow
  }), /*#__PURE__*/jsxRuntime.jsx(tableUi.ToolbarTable, {
    icon: /*#__PURE__*/jsxRuntime.jsx(common.BorderLeftIcon, {}),
    transform: table.addColumn
  }), /*#__PURE__*/jsxRuntime.jsx(tableUi.ToolbarTable, {
    icon: /*#__PURE__*/jsxRuntime.jsx(common.BorderRightIcon, {}),
    transform: table.deleteColumn
  }), /*#__PURE__*/jsxRuntime.jsx(tableUi.TableBorderColorToolbar, {}), /*#__PURE__*/jsxRuntime.jsx(tableUi.TableBgColorToolbar, {})]
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
  const editor = plateCore.useStoreEditorState(plateCore.useEventEditorId('focus'));
  return /*#__PURE__*/jsxRuntime.jsxs(plateToolbar.BalloonToolbar, {
    direction: "top",
    hiddenDelay: 0,
    theme: "light",
    arrow: arrow,
    children: [/*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(editor, plateBasicMarks.MARK_BOLD),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.BoldIcon, {}) // @ts-ignore
      ,
      tooltip: {
        content: 'Bold (⌘B)',
        ...tooltip
      }
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(editor, plateBasicMarks.MARK_ITALIC),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.ItalicIcon, {}) // @ts-ignore
      ,
      tooltip: {
        content: 'Italic (⌘I)',
        ...tooltip
      }
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarMark, {
      type: plateCore.getPlatePluginType(editor, plateBasicMarks.MARK_UNDERLINE),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.UnderlineIcon, {}) // @ts-ignore
      ,
      tooltip: {
        content: 'Underline (⌘U)',
        ...tooltip
      }
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarElement, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateHeading.ELEMENT_H1),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.H1Icon, {})
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarElement, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateHeading.ELEMENT_H2),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.H2Icon, {})
    }), /*#__PURE__*/jsxRuntime.jsx(plateToolbar.ToolbarElement, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateHeading.ELEMENT_H3),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.H3Icon, {})
    }), /*#__PURE__*/jsxRuntime.jsx(plateListUi.ToolbarList, {
      type: plateCore.getPlatePluginType(plateCore.useEditorRef(), plateList.ELEMENT_UL),
      icon: /*#__PURE__*/jsxRuntime.jsx(common.ListULIcon, {})
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
  const charCount = characterCountUi.getCharacterCount(id);
  react.useEffect(() => {
    if (props !== null && props !== void 0 && props.charactersCount) props.charactersCount(charCount);
  }, [charCount]);
  const plugins = [...plateBasicElements.createBasicElementPlugins(), plateCore.createReactPlugin(), plateCore.createHistoryPlugin(), link.createLinkPlugin(), plateList.createListPlugin(), plateBasicMarks.createBoldPlugin(), plateBasicMarks.createCodePlugin(), plateAlignment.createAlignPlugin(), table.createTablePlugin(), plateBasicMarks.createItalicPlugin(), plateList.createTodoListPlugin(), fontColor.createFontColorPlugin(), plateParagraph.createParagraphPlugin(), plateHighlight.createHighlightPlugin(), plateCodeBlock.createCodeBlockPlugin(), plateBasicMarks.createUnderlinePlugin(), plateBasicMarks.createSubscriptPlugin(), plateMediaEmbed.createMediaEmbedPlugin(), plateBlockQuote.createBlockquotePlugin(), plateBasicMarks.createSuperscriptPlugin(), plateBasicMarks.createStrikethroughPlugin(), plateHeading.createHeadingPlugin({
    levels: 3
  }), plateMdSerializer.createDeserializeMDPlugin(), image.createImagePlugin()];
  return /*#__PURE__*/jsxRuntime.jsxs(plateCore.Plate, {
    id: props.id,
    onChange: props.onChange,
    plugins: plugins,
    components: components,
    options: options,
    editableProps: editableProps,
    initialValue: JSON.parse(JSON.stringify(props.value || props.initialValue)),
    children: [/*#__PURE__*/jsxRuntime.jsx(ToolbarBalloon, {}), !props.displayOnly && /*#__PURE__*/jsxRuntime.jsxs(plateToolbar.HeadingToolbar, {
      children: [/*#__PURE__*/jsxRuntime.jsx(ToolbarBasicElementsButtons, {}), /*#__PURE__*/jsxRuntime.jsx(common.Modal, {
        type: quotationMark.ELEMENT_QUOTATION_MARK,
        Icon: '«»',
        children: /*#__PURE__*/jsxRuntime.jsx(quotationMarkUi.QuotationMarksMenu, {})
      }), /*#__PURE__*/jsxRuntime.jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsxRuntime.jsx(ToolbarListButtons, {}), /*#__PURE__*/jsxRuntime.jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsxRuntime.jsx(ToolbarBasicMarksButtons, {}), /*#__PURE__*/jsxRuntime.jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsxRuntime.jsx(fontColorUi.FontColorToolbar, {}), /*#__PURE__*/jsxRuntime.jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsxRuntime.jsx(ToolbarAlignButtons, {}), /*#__PURE__*/jsxRuntime.jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsxRuntime.jsx(ToolbarTableButtons, {}), /*#__PURE__*/jsxRuntime.jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsxRuntime.jsx(common.Modal, {
        type: link.ELEMENT_LINK,
        Icon: /*#__PURE__*/jsxRuntime.jsx(common.LinkIcon, {}),
        children: /*#__PURE__*/jsxRuntime.jsx(linkUi.ToolbarLink, {})
      }), /*#__PURE__*/jsxRuntime.jsx(Divider, {
        type: DividerType.vertical
      }), /*#__PURE__*/jsxRuntime.jsx(common.Modal, {
        type: image.ELEMENT_IMAGE,
        Icon: /*#__PURE__*/jsxRuntime.jsx(common.ImageIcon, {}),
        children: /*#__PURE__*/jsxRuntime.jsx(imageUi.ToolbarImage, {
          CustomComponent: toolbars === null || toolbars === void 0 ? void 0 : toolbars.ImageToolbar
        })
      })]
    }), showCharactersCount && /*#__PURE__*/jsxRuntime.jsxs("p", {
      style: {
        textAlign: 'right'
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(common.CharactersCountIcon, {}), " ", /*#__PURE__*/jsxRuntime.jsx(characterCountUi.CharCountToolbar, {
        id: id
      })]
    })]
  });
}

exports.DreifussWysiwygEditor = DreifussWysiwygEditor;
//# sourceMappingURL=index.js.map
