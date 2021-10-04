import { createContext, useState, useEffect } from 'react';
import { useStoreEditorState, useEventEditorId, getPlatePluginType } from '@udecode/plate-core';
import { ToolbarElement } from '@udecode/plate-toolbar';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useColor, ColorPicker as ColorPicker$1 } from 'react-color-palette';
import { Picker } from 'emoji-mart';
import isHotkey from 'is-hotkey';

const SubMenuIcon = props => {
  const editor = useStoreEditorState(useEventEditorId('focus'));
  return /*#__PURE__*/jsx(ToolbarElement, { ...props,
    onMouseDown: e => e.preventDefault(),
    type: getPlatePluginType(editor, props.type)
  });
};

const emptyFn = () => {
  /* do nothing */
};

const ModalContext = /*#__PURE__*/createContext({
  toggleMenu: emptyFn
});

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$2 = ".modal {\n    background: #fff;\n    border-radius: 4px;\n    width: 300px;\n    margin: 20px auto;\n    padding: 15px;\n    position: absolute;\n    top: 100%;\n    left: -50px;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n    z-index: 999;\n}\n\n.modal-container {\n    position: relative;\n}";
n(css$2,{});

// eslint-disable-next-line react/display-name
const Modal = ({
  children,
  Icon,
  type
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(false);
  };

  return /*#__PURE__*/jsx(ModalContext.Provider, {
    value: {
      toggleMenu
    },
    children: /*#__PURE__*/jsxs("div", {
      className: "modal-container",
      children: [/*#__PURE__*/jsx("div", {
        role: "presentation",
        onClick: () => setIsMenuOpen(!isMenuOpen),
        children: type ? /*#__PURE__*/jsx(SubMenuIcon, {
          type: type,
          icon: Icon
        }) : Icon
      }), isMenuOpen && /*#__PURE__*/jsx("div", {
        className: "modal",
        children: children
      })]
    })
  });
};

var css$1 = ".rcp-light {\n    --rcp-background: #ffffff;\n    --rcp-input-text: #111111;\n    --rcp-input-border: rgba(0, 0, 0, 0.1);\n    --rcp-input-label: #717171;\n  }\n  \n  .rcp-dark {\n    --rcp-background: #181818;\n    --rcp-input-text: #f3f3f3;\n    --rcp-input-border: rgba(255, 255, 255, 0.1);\n    --rcp-input-label: #999999;\n  }\n  \n  .rcp {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  \n    background-color: var(--rcp-background);\n    border-radius: 10px;\n    box-sizing: border-box;\n  }\n  \n  .rcp-body {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 20px;\n    width: 100%;\n  \n    padding: 20px;\n  }\n  \n  .rcp-saturation {\n    position: relative;\n  \n    width: 100%;\n    background-image: linear-gradient(transparent, black), linear-gradient(to right, white, transparent);\n    border-radius: 10px 10px 0 0;\n    \n    user-select: none;\n  }\n  \n  .rcp-saturation-cursor {\n    position: absolute;\n  \n    width: 20px;\n    height: 20px;\n  \n    border: 2px solid #ffffff;\n    border-radius: 50%;\n    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);\n    box-sizing: border-box;\n  \n    transform: translate(-10px, -10px);\n  }\n  \n  .rcp-hue {\n    position: relative;\n  \n    width: 100%;\n    height: 12px;\n    \n    background-image: linear-gradient(\n      to right,\n      rgb(255, 0, 0),\n      rgb(255, 255, 0),\n      rgb(0, 255, 0),\n      rgb(0, 255, 255),\n      rgb(0, 0, 255),\n      rgb(255, 0, 255),\n      rgb(255, 0, 0)\n    );\n    border-radius: 10px;\n  \n    user-select: none\n  }\n  \n  .rcp-hue-cursor {\n    position: absolute;\n  \n    width: 20px;\n    height: 20px;\n  \n    border: 2px solid #ffffff;\n    border-radius: 50%;\n    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 0.5px;\n    box-sizing: border-box;\n  \n    transform: translate(-10px, -4px);\n  }\n  \n  .rcp-alpha {\n    position: relative;\n  \n    width: 100%;\n    height: 12px;\n  \n    border-radius: 10px;\n  \n    user-select: none;\n  }\n  \n  .rcp-alpha-cursor {\n    position: absolute;\n  \n    width: 20px;\n    height: 20px;\n  \n    border: 2px solid #ffffff;\n    border-radius: 50%;\n    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 0.5px;\n    box-sizing: border-box;\n  \n    transform: translate(-10px, -4px);\n  }\n  \n  .rcp-fields {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 10px;\n  \n    width: 100%;\n  }\n  \n  .rcp-fields-element {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 5px;\n  \n    width: 100%;\n  }\n  \n  .hex-element {\n    grid-row: 1;\n  }\n  \n  .hex-element:nth-child(3n) {\n    grid-column: 1 / -1;\n  }\n  \n  .rcp-fields-element-input {\n    width: 100%;\n    \n    font-size: 14px;\n    font-weight: 600;\n  \n    color: var(--rcp-input-text);\n    text-align: center;\n  \n    background: none;\n    border: 2px solid;\n    border-color: var(--rcp-input-border);\n    border-radius: 5px;\n    box-sizing: border-box;\n    \n    outline: none;\n  \n    padding: 10px;\n  }\n  \n  .rcp-fields-element-label {\n    font-size: 14px;\n    font-weight: 600;\n  \n    color: var(--rcp-input-label);\n    text-transform: uppercase;\n  }";
n(css$1,{});

const ColorPicker = props => {
  const {
    type = 'hex',
    color = '#eee',
    onChange,
    style = {},
    hideHSV = true
  } = props;
  const {
    width,
    height
  } = style;
  const [currentColor, setCurrentColor] = useColor(type, color);
  useEffect(() => {
    if (currentColor && onChange) {
      onChange(currentColor);
    }
  }, [currentColor]);
  return /*#__PURE__*/jsx("div", {
    style: style,
    children: /*#__PURE__*/jsx(ColorPicker$1, {
      hideHSV: hideHSV //   dark
      //   hideHSV
      ,
      width: width !== null && width !== void 0 ? width : 400,
      height: height !== null && height !== void 0 ? height : 200,
      color: currentColor,
      onChange: setCurrentColor
    })
  });
};

function ImageIcon() {
  return /*#__PURE__*/jsx("svg", {
    "aria-hidden": "true",
    focusable: "false",
    "data-prefix": "far",
    "data-icon": "image",
    className: "svg-inline--fa fa-image fa-w-16",
    role: "img",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
    children: /*#__PURE__*/jsx("path", {
      fill: "currentColor",
      d: "M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"
    })
  });
}
function BorderColorIcon() {
  return /*#__PURE__*/jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    height: "20px",
    viewBox: "0 0 24 24",
    width: "20px",
    fill: "#000000",
    children: [/*#__PURE__*/jsx("g", {
      children: /*#__PURE__*/jsx("rect", {
        fill: "none",
        height: "24",
        width: "24"
      })
    }), /*#__PURE__*/jsx("g", {
      children: /*#__PURE__*/jsxs("g", {
        children: [/*#__PURE__*/jsx("path", {
          d: "M16.81,8.94l-3.75-3.75L4,14.25V18h3.75L16.81,8.94z M6,16v-0.92l7.06-7.06l0.92,0.92L6.92,16H6z"
        }), /*#__PURE__*/jsx("path", {
          d: "M19.71,6.04c0.39-0.39,0.39-1.02,0-1.41l-2.34-2.34C17.17,2.09,16.92,2,16.66,2c-0.25,0-0.51,0.1-0.7,0.29l-1.83,1.83 l3.75,3.75L19.71,6.04z"
        }), /*#__PURE__*/jsx("rect", {
          height: "4",
          width: "20",
          x: "2",
          y: "20"
        })]
      })
    })]
  });
}
function BackgroundColorIcon() {
  return /*#__PURE__*/jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    enableBackground: "new 0 0 24 24",
    height: "20px",
    viewBox: "0 0 24 24",
    width: "20px",
    fill: "#000000",
    children: [/*#__PURE__*/jsx("g", {
      children: /*#__PURE__*/jsx("rect", {
        fill: "none",
        height: "24",
        width: "24"
      })
    }), /*#__PURE__*/jsx("g", {
      children: /*#__PURE__*/jsx("path", {
        d: "M16.56,8.94L7.62,0L6.21,1.41l2.38,2.38L3.44,8.94c-0.59,0.59-0.59,1.54,0,2.12l5.5,5.5C9.23,16.85,9.62,17,10,17 s0.77-0.15,1.06-0.44l5.5-5.5C17.15,10.48,17.15,9.53,16.56,8.94z M5.21,10L10,5.21L14.79,10H5.21z M19,11.5c0,0-2,2.17-2,3.5 c0,1.1,0.9,2,2,2s2-0.9,2-2C21,13.67,19,11.5,19,11.5z M2,20h20v4H2V20z"
      })
    })]
  });
}
function CharactersCountIcon() {
  return /*#__PURE__*/jsx("svg", {
    style: {
      transform: 'rotate(360deg)'
    },
    width: "1.4em",
    height: "1.4em",
    focusable: "false",
    "aria-hidden": "true",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/jsx("path", {
      d: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 2v12h7V6H4m16 12V6h-1.24c.24.54.19 1.07.19 1.13c-.07.67-.54 1.37-.71 1.62l-2.33 2.55l3.32-.02l.01 1.22l-5.2-.03l-.04-1s3.05-3.23 3.2-3.52c.14-.28.71-1.95-.7-1.95c-1.23.05-1.09 1.3-1.09 1.3l-1.54.01s.01-.66.38-1.31H13v12h2.58l-.01-.86l.97-.01s.91-.16.92-1.05c.04-1-.81-1-.96-1c-.13 0-1.07.05-1.07.87h-1.52s.04-2.06 2.59-2.06c2.6 0 2.46 2.02 2.46 2.02s.04 1.25-1.11 1.72l.52.37H20M8.92 16h-1.5v-5.8l-1.8.56V9.53l3.14-1.12h.16V16z",
      fill: "#626262"
    })
  });
}
function FontColor({
  active
}) {
  return /*#__PURE__*/jsx("span", {
    style: {
      color: active ? 'rgb(0, 102, 204)' : 'inherit'
    },
    children: /*#__PURE__*/jsx("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1.2em",
      height: "1.2em",
      viewBox: "0 0 52.000000 52.000000",
      preserveAspectRatio: "xMidYMid meet",
      children: /*#__PURE__*/jsxs("g", {
        transform: "translate(0.000000,52.000000) scale(0.100000,-0.100000)",
        fill: "currentColor",
        stroke: "none",
        children: [/*#__PURE__*/jsx("path", {
          d: "M219 433 c-14 -38 -96 -254 -104 -275 -6 -15 -2 -18 22 -18 26 0 32\n5 43 40 l13 40 67 0 67 0 12 -40 c10 -35 16 -40 41 -40 17 0 30 1 30 3 0 1\n-27 72 -59 157 -58 151 -60 155 -90 158 -26 3 -33 -1 -42 -25z m64 -96 c9 -30\n17 -57 17 -60 0 -4 -20 -7 -44 -7 l-45 0 21 60 c11 33 23 60 27 60 4 0 15 -24\n24 -53z"
        }), /*#__PURE__*/jsx("path", {
          d: "M100 40 l0 -40 160 0 160 0 0 40 0 40 -160 0 -160 0 0 -40z"
        })]
      })
    })
  });
}
const H1Icon = () => /*#__PURE__*/jsx("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 16 16",
  className: "bi bi-type-h1",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/jsx("path", {
    d: "M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z"
  })
});
const H2Icon = () => /*#__PURE__*/jsx("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 16 16",
  className: "bi bi-type-h2",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/jsx("path", {
    d: "M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z"
  })
});
const H3Icon = () => /*#__PURE__*/jsx("svg", {
  width: "1em",
  height: "1em",
  viewBox: "0 0 16 16",
  className: "bi bi-type-h3",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/jsx("path", {
    d: "M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z"
  })
});
const ColorIcon = () => /*#__PURE__*/jsx("svg", {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "tint",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 352 512",
  children: /*#__PURE__*/jsx("path", {
    fill: "currentColor",
    d: "M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448c-61.75 0-112-50.25-112-112 0-8.84 7.16-16 16-16s16 7.16 16 16c0 44.11 35.89 80 80 80 8.84 0 16 7.16 16 16s-7.16 16-16 16z"
  })
});
const BgColorIcon = () => /*#__PURE__*/jsx("svg", {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "fill-drip",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 576 512",
  children: /*#__PURE__*/jsx("path", {
    fill: "currentColor",
    d: "M512 320s-64 92.65-64 128c0 35.35 28.66 64 64 64s64-28.65 64-64-64-128-64-128zm-9.37-102.94L294.94 9.37C288.69 3.12 280.5 0 272.31 0s-16.38 3.12-22.62 9.37l-81.58 81.58L81.93 4.76c-6.25-6.25-16.38-6.25-22.62 0L36.69 27.38c-6.24 6.25-6.24 16.38 0 22.62l86.19 86.18-94.76 94.76c-37.49 37.48-37.49 98.26 0 135.75l117.19 117.19c18.74 18.74 43.31 28.12 67.87 28.12 24.57 0 49.13-9.37 67.87-28.12l221.57-221.57c12.5-12.5 12.5-32.75.01-45.25zm-116.22 70.97H65.93c1.36-3.84 3.57-7.98 7.43-11.83l13.15-13.15 81.61-81.61 58.6 58.6c12.49 12.49 32.75 12.49 45.24 0s12.49-32.75 0-45.24l-58.6-58.6 58.95-58.95 162.44 162.44-48.34 48.34z"
  })
});
const BoldIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M321.1 242.4C340.1 220.1 352 191.6 352 160c0-70.59-57.42-128-128-128L32 32.01c-17.67 0-32 14.31-32 32s14.33 32 32 32h16v320H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h224c70.58 0 128-57.41 128-128C384 305.3 358.6 264.8 321.1 242.4zM112 96.01H224c35.3 0 64 28.72 64 64s-28.7 64-64 64H112V96.01zM256 416H112v-128H256c35.3 0 64 28.71 64 63.1S291.3 416 256 416z"
  })
});
const ItalicIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M384 64.01c0 17.69-14.31 32-32 32h-58.67l-133.3 320H224c17.69 0 32 14.31 32 32s-14.31 32-32 32H32c-17.69 0-32-14.31-32-32s14.31-32 32-32h58.67l133.3-320H160c-17.69 0-32-14.31-32-32s14.31-32 32-32h192C369.7 32.01 384 46.33 384 64.01z"
  })
});
const UnderlineIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M416 448H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h384c17.69 0 32-14.31 32-32S433.7 448 416 448zM48 64.01H64v160c0 88.22 71.78 159.1 160 159.1s160-71.78 160-159.1v-160h16c17.69 0 32-14.32 32-32s-14.31-31.1-32-31.1l-96-.0049c-17.69 0-32 14.32-32 32s14.31 32 32 32H320v160c0 52.94-43.06 95.1-96 95.1S128 276.1 128 224v-160h16c17.69 0 32-14.31 32-32s-14.31-32-32-32l-96 .0049c-17.69 0-32 14.31-32 31.1S30.31 64.01 48 64.01z"
  })
});
const BlockQuoteIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M328 272C288.2 272 256 304.2 256 344C256 383.8 288.2 416 328 416c8.322 0 16.19-1.695 23.62-4.293C349.7 440.8 325.6 464 296 464c-13.25 0-24 10.75-24 24S282.8 512 296 512c57.34 0 104-46.66 104-104v-64C400 304.2 367.8 272 328 272zM328 368c-13.23 0-24-10.77-24-24c0-13.23 10.77-24 24-24S352 330.8 352 344C352 357.2 341.2 368 328 368zM504 272c-39.76 0-72 32.23-72 72c0 39.76 32.24 72 72 72c8.322 0 16.19-1.695 23.62-4.293C525.7 440.8 501.6 464 472 464c-13.25 0-24 10.75-24 24S458.8 512 472 512c57.34 0 104-46.66 104-104v-64C576 304.2 543.8 272 504 272zM504 368c-13.23 0-24-10.77-24-24c0-13.23 10.77-24 24-24s24 10.77 24 24C528 357.2 517.2 368 504 368zM320 168C320 128.2 287.8 96 248 96C239.7 96 231.8 97.7 224.4 100.3C226.3 71.17 250.4 48 280 48c13.25 0 24-10.75 24-24S293.3 0 280 0C222.7 0 176 46.66 176 104v64c0 39.77 32.24 72 72 72S320 207.8 320 168zM248 192C234.8 192 224 181.2 224 168C224 154.8 234.8 144 248 144S272 154.8 272 168C272 181.2 261.2 192 248 192zM72 96C63.68 96 55.81 97.7 48.38 100.3C50.32 71.17 74.39 48 104 48C117.3 48 128 37.25 128 24S117.3 0 104 0C46.66 0 0 46.66 0 104v64C0 207.8 32.24 240 72 240S144 207.8 144 168C144 128.2 111.8 96 72 96zM72 192C58.77 192 48 181.2 48 168c0-13.23 10.77-24 24-24S96 154.8 96 168C96 181.2 85.23 192 72 192z"
  })
});
const BlockCodeIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M169.5 119.6C160.5 109.9 145.3 109.4 135.6 118.5l-128 120C2.75 243 0 249.4 0 256S2.75 268.1 7.594 273.5l128 120C140.2 397.8 146.1 400 151.1 400c6.406 0 12.79-2.531 17.51-7.594c9.062-9.656 8.594-24.84-1.094-33.91L59.09 256l109.3-102.5C178.1 144.4 178.6 129.3 169.5 119.6zM390.4 .875c-12.81-3.531-25.97 3.969-29.5 16.75l-128 464c-3.531 12.78 3.969 26 16.75 29.5C251.8 511.7 253.9 512 256 512c10.53 0 20.19-6.969 23.12-17.62l128-464C410.7 17.59 403.2 4.375 390.4 .875zM632.4 238.5l-128-120c-9.656-9.062-24.88-8.594-33.91 1.094c-9.062 9.656-8.594 24.84 1.094 33.91L580.9 256l-109.3 102.5c-9.688 9.062-10.16 24.25-1.094 33.91C475.2 397.5 481.6 400 488 400c5.875 0 11.77-2.156 16.4-6.5l128-120C637.3 268.1 640 262.6 640 256S637.3 243 632.4 238.5z"
  })
});
const StrikeThroughIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M488 239.9L287.2 240c-8.262-2.459-42.31-12.21-42.31-12.21C161.5 203.7 138.4 182.8 146.2 138.5c9.719-55.4 81.72-64.51 140.5-55.43c16.77 2.564 36.75 7.908 62.84 16.8c12.69 4.344 26.62-2.299 31.03-14.82c4.414-12.53-2.336-26.21-15.06-30.54c-28.93-9.861-51.58-15.86-71.29-18.89C189.7 19.57 110.9 57.61 98.15 130.3C88.41 185.7 113 218.8 146.5 240L24 239.9c-13.25 0-24 10.75-24 23.1s10.75 23.1 24 23.1h464c13.25 0 24-10.75 24-23.1S501.3 239.9 488 239.9zM361.7 336c5.1 10.26 6.734 22.25 4.059 37.47c-9.719 55.38-81.69 64.48-140.7 55.42c-25.89-3.83-56.08-14.53-82.72-23.97L128.6 400.1c-12.72-4.438-26.63 2.111-31.14 14.61c-4.494 12.5 2.16 26.22 14.85 30.64l13.47 4.75c28.76 10.19 61.36 21.75 91.86 26.27C233.6 478.8 249 480 263.7 480c81.09 0 139.3-36.74 150.1-98.34c3.047-17.35 2.619-32.35-.2246-45.66H361.7z"
  })
});
const SuperscriptIcon = () => /*#__PURE__*/jsx("svg", {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "superscript",
  className: "svg-inline--fa fa-superscript fa-w-16",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512",
  children: /*#__PURE__*/jsx("path", {
    fill: "currentColor",
    d: "M496 160h-16V16a16 16 0 0 0-16-16h-48a16 16 0 0 0-14.29 8.83l-16 32A16 16 0 0 0 400 64h16v96h-16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM336 64h-67a16 16 0 0 0-13.14 6.87l-79.9 115-79.9-115A16 16 0 0 0 83 64H16A16 16 0 0 0 0 80v48a16 16 0 0 0 16 16h33.48l77.81 112-77.81 112H16a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h67a16 16 0 0 0 13.14-6.87l79.9-115 79.9 115A16 16 0 0 0 269 448h67a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16h-33.48l-77.81-112 77.81-112H336a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16z"
  })
});
const SubscriptIcon = () => /*#__PURE__*/jsx("svg", {
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "subscript",
  className: "svg-inline--fa fa-subscript fa-w-16",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512",
  children: /*#__PURE__*/jsx("path", {
    fill: "currentColor",
    d: "M496 448h-16V304a16 16 0 0 0-16-16h-48a16 16 0 0 0-14.29 8.83l-16 32A16 16 0 0 0 400 352h16v96h-16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM336 64h-67a16 16 0 0 0-13.14 6.87l-79.9 115-79.9-115A16 16 0 0 0 83 64H16A16 16 0 0 0 0 80v48a16 16 0 0 0 16 16h33.48l77.81 112-77.81 112H16a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h67a16 16 0 0 0 13.14-6.87l79.9-115 79.9 115A16 16 0 0 0 269 448h67a16 16 0 0 0 16-16v-48a16 16 0 0 0-16-16h-33.48l-77.81-112 77.81-112H336a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16z"
  })
});
const AlignLeftIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M16 208h416c8.801 0 16-7.199 16-15.1S440.8 176 432 176h-416C7.199 176 0 183.2 0 192S7.199 208 16 208zM16 80h256c8.801 0 16-7.199 16-15.1S280.8 48 272 48h-256C7.199 48 0 55.2 0 64S7.199 80 16 80zM16 336h256c8.801 0 16-7.199 16-15.1S280.8 304 272 304h-256C7.199 304 0 311.2 0 320S7.199 336 16 336zM432 432h-416c-8.801 0-16 7.199-16 16S7.199 464 16 464h416c8.801 0 16-7.199 16-15.1S440.8 432 432 432z"
  })
});
const AlignCenterIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M16 208h416c8.801 0 16-7.199 16-15.1S440.8 176 432 176h-416C7.199 176 0 183.2 0 192S7.199 208 16 208zM112 80h224c8.801 0 16-7.199 16-15.1S344.8 48 336 48h-224C103.2 48 96 55.2 96 64S103.2 80 112 80zM432 432h-416c-8.801 0-16 7.199-16 16S7.199 464 16 464h416c8.801 0 16-7.199 16-15.1S440.8 432 432 432zM112 304C103.2 304 96 311.2 96 320S103.2 336 112 336h224c8.801 0 16-7.199 16-15.1S344.8 304 336 304H112z"
  })
});
const AlignRightIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M176 80h256c8.801 0 16-7.199 16-15.1S440.8 48 432 48h-256C167.2 48 160 55.2 160 64S167.2 80 176 80zM432 432h-416c-8.799 0-16 7.199-16 16S7.201 464 16 464h416c8.801 0 16-7.199 16-15.1S440.8 432 432 432zM432 176h-416C7.201 176 0 183.2 0 192S7.201 208 16 208h416c8.801 0 16-7.199 16-15.1S440.8 176 432 176zM432 304h-256C167.2 304 160 311.2 160 320S167.2 336 176 336h256c8.801 0 16-7.199 16-15.1S440.8 304 432 304z"
  })
});
const AlignJustifyIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M432 432h-416c-8.801 0-16 7.199-16 16S7.199 464 16 464h416c8.801 0 16-7.199 16-15.1S440.8 432 432 432zM16 80h416c8.801 0 16-7.199 16-15.1S440.8 48 432 48h-416C7.199 48 0 55.2 0 64S7.199 80 16 80zM432 176h-416C7.199 176 0 183.2 0 192S7.199 208 16 208h416c8.801 0 16-7.199 16-15.1S440.8 176 432 176zM432 304h-416C7.199 304 0 311.2 0 320S7.199 336 16 336h416c8.801 0 16-7.199 16-15.1S440.8 304 432 304z"
  })
});
const FileImageIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M190.3 285.7l-26.36 40.67c-12-14.92-37.75-13.73-48.31 2.531l-46.69 72.02c-5.984 9.266-6.531 21.09-1.453 30.84C72.67 441.8 82.83 448 93.1 448h196c11.17 0 21.33-6.219 26.55-16.23c5.094-9.797 4.531-21.62-1.484-30.86l-74.66-115.2C229.3 268.5 201.4 268.5 190.3 285.7zM286.7 416L95.77 416l44.89-66.95l9.922 15.3c5.906 9.094 20.97 9.094 26.84 0l37.91-58.48L286.7 416zM96 280c13.25 0 24-10.75 24-24c0-13.26-10.75-24-24-24S72 242.7 72 256C72 269.3 82.75 280 96 280zM365.3 125.3l-106.5-106.5C246.7 6.742 230.5 0 213.5 0H64C28.65 0 0 28.65 0 64l.0065 384c0 35.35 28.65 64 64 64H320c35.35 0 64-28.65 64-64V170.5C384 153.5 377.3 137.3 365.3 125.3zM224 34.08c4.477 1.566 8.666 3.846 12.12 7.299l106.5 106.5C346.1 151.3 348.4 155.5 349.9 160H240C231.2 160 224 152.8 224 144V34.08zM352 448c0 17.64-14.36 32-32 32H64c-17.64 0-32-14.36-32-32V64c0-17.64 14.36-32 32-32h128v112C192 170.5 213.5 192 240 192H352V448z"
  })
});
const ListULIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M48.06 384C30.54 384 16 398.4 16 416s14.54 32 32.06 32C65.71 448 80 433.6 80 416S65.71 384 48.06 384zM176 112h320c8.801 0 16-7.201 16-15.1C512 87.2 504.8 80 496 80h-320C167.2 80 160 87.2 160 95.1C160 104.8 167.2 112 176 112zM48.06 224C30.54 224 16 238.4 16 256s14.54 32 32.06 32C65.71 288 80 273.6 80 256S65.71 224 48.06 224zM496 240h-320C167.2 240 160 247.2 160 256c0 8.799 7.201 16 16 16h320C504.8 272 512 264.8 512 256C512 247.2 504.8 240 496 240zM496 400h-320C167.2 400 160 407.2 160 416c0 8.799 7.201 16 16 16h320c8.801 0 16-7.201 16-16C512 407.2 504.8 400 496 400zM48.06 64C30.54 64 16 78.38 16 96s14.54 32 32.06 32C65.71 128 80 113.6 80 96S65.71 64 48.06 64z"
  })
});
const ListOLIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M208 112h288C504.8 112 512 104.8 512 96c0-8.801-7.199-16-16-16h-288C199.2 80 192 87.2 192 96C192 104.8 199.2 112 208 112zM32 224h96c8.844 0 16-7.156 16-16c0-8.842-7.156-15.1-16-15.1H96V48.01c0-5.734-3.062-11.02-8.031-13.88S76.91 31.29 71.94 34.18L36.38 54.91c-7.625 4.451-10.22 14.25-5.75 21.89C35.06 84.43 44.88 86.94 52.5 82.57L64 75.85V192H32c-8.844 0-16 7.156-16 15.1C16 216.8 23.16 224 32 224zM496 400h-288C199.2 400 192 407.2 192 416c0 8.799 7.201 16 16 16h288c8.801 0 16-7.201 16-16C512 407.2 504.8 400 496 400zM144 448H58.44l61.44-54.02c28.66-24.7 32.1-68.23 7.721-97.05C115.3 282.5 98.15 273.7 79.15 272.2c-19.31-1.625-37.5 4.484-51.91 16.91L13.46 301C6.777 306.8 6.027 316.9 11.78 323.6c5.781 6.719 15.94 7.438 22.56 1.688l13.78-11.88c7.875-6.781 17.81-10.17 28.5-9.25c10.44 .8125 19.88 5.609 26.53 13.5c13.31 15.72 11.5 38.61-4.281 52.22l-93.44 82.14c-5 4.391-6.75 11.44-4.406 17.66C3.371 475.9 9.342 480 15.1 480H144C152.8 480 160 472.8 160 464S152.8 448 144 448zM496 240h-288C199.2 240 192 247.2 192 256c0 8.799 7.201 16 16 16h288C504.8 272 512 264.8 512 256C512 247.2 504.8 240 496 240z"
  })
});
const BorderAllIcon = () => /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#000000",
  children: [/*#__PURE__*/jsx("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/jsx("path", {
    d: "M21 3H3v18h18V3zM11 19H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"
  })]
});
const BorderBottomIcon = () => /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#000000",
  children: [/*#__PURE__*/jsx("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/jsx("path", {
    d: "M3 11h2v2H3zm0 4h2v2H3zm0 4h18v2H3zm16-4h2v2h-2zM3 7h2v2H3zm16 4h2v2h-2zm0-8h2v2h-2zm-4 8h2v2h-2zm4-4h2v2h-2zm-4-4h2v2h-2zm-8 8h2v2H7zM3 3h2v2H3zm8 4h2v2h-2zM7 3h2v2H7zm4 8h2v2h-2zm0 4h2v2h-2zm0-12h2v2h-2z"
  })]
});
const BorderClearIcon = () => /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#000000",
  children: [/*#__PURE__*/jsx("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/jsx("path", {
    d: "M7 3h2v2H7zm0 16h2v2H7zM3 3h2v2H3zm16 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zM3 7h2v2H3zm0 12h2v2H3zm16 0h2v2h-2zm0-4h2v2h-2zM3 15h2v2H3zm0-4h2v2H3zm4 0h2v2H7zm8 0h2v2h-2zm-4 8h2v2h-2zm4 0h2v2h-2zm0-16h2v2h-2zm-4 0h2v2h-2zm0 4h2v2h-2zm0 8h2v2h-2zm0-4h2v2h-2z"
  })]
});
const BorderLeftIcon = () => /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#000000",
  children: [/*#__PURE__*/jsx("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/jsx("path", {
    d: "M11 3h2v2h-2zM3 3h2v18H3zm12 0h2v2h-2zm-4 16h2v2h-2zm0-4h2v2h-2zm4 4h2v2h-2zM11 7h2v2h-2zm0 4h2v2h-2zm8 4h2v2h-2zm0 4h2v2h-2zm0-12h2v2h-2zm0 4h2v2h-2zm0-8h2v2h-2zm-4 8h2v2h-2zm-8 8h2v2H7zm0-8h2v2H7zm0-8h2v2H7z"
  })]
});
const BorderRightIcon = () => /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#000000",
  children: [/*#__PURE__*/jsx("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/jsx("path", {
    d: "M3 3h2v2H3zm0 16h2v2H3zM15 3h2v2h-2zm0 16h2v2h-2zm0-8h2v2h-2zM3 15h2v2H3zm0-4h2v2H3zm0-4h2v2H3zm8 8h2v2h-2zm-4-4h2v2H7zm0-8h2v2H7zm12 0h2v18h-2zM7 19h2v2H7zm4-16h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 8h2v2h-2z"
  })]
});
const BorderTopIcon = () => /*#__PURE__*/jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  height: "24px",
  viewBox: "0 0 24 24",
  width: "24px",
  fill: "#000000",
  children: [/*#__PURE__*/jsx("path", {
    d: "M0 0h24v24H0V0z",
    fill: "none"
  }), /*#__PURE__*/jsx("path", {
    d: "M19 19h2v2h-2zM3 19h2v2H3zm8 0h2v2h-2zm-8-8h2v2H3zm0 4h2v2H3zm4 4h2v2H7zm4-12h2v2h-2zm0 4h2v2h-2zM3 7h2v2H3zm0-4h18v2H3zm8 12h2v2h-2zm4 4h2v2h-2zm-8-8h2v2H7zm8 0h2v2h-2zm4 4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z"
  })]
});
const LinkIcon = () => /*#__PURE__*/jsx("svg", {
  width: "1rem",
  height: "1rem",
  "aria-hidden": "true",
  focusable: "false",
  "data-prefix": "fas",
  "data-icon": "link",
  className: "svg-inline--fa fa-link fa-w-16",
  role: "img",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 512 512",
  children: /*#__PURE__*/jsx("path", {
    fill: "currentColor",
    d: "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
  })
});
const EmojiIcon = () => /*#__PURE__*/jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "currentColor",
  children: /*#__PURE__*/jsx("path", {
    d: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM120 223.4C123.3 181.3 152.2 152 175.1 152c23.86 0 52.79 29.25 56.06 71.38C232.8 232 221.2 235.3 217.1 227.9l-9.566-17C199.9 197.3 188.4 189.3 176 189.3c-12.23 0-23.73 8-31.48 21.62l-9.445 17C130.7 235.3 119.3 231.9 120 223.4zM370.8 346.3C342.3 380.4 300.4 399.1 256 399.1s-86.3-19.6-114.8-53.73c-13.56-16.38 10.98-36.75 24.54-20.5C188.2 352.6 221 367.9 256 367.9s67.81-15.42 90.21-42.17C359.8 309.5 384.4 330 370.8 346.3zM376.1 227.9l-9.445-17c-7.75-13.62-19.25-21.62-31.48-21.62c-12.35 0-23.86 8-31.48 21.62l-9.566 17c-4.117 7.375-15.67 3.95-14.94-4.55C283.3 181.3 312.3 152 336 152c23.86 0 52.76 29.25 56.03 71.38C392.7 232 381.1 235.3 376.1 227.9z"
  })
});

var css = "/* @import '~emoji-mart/css/emoji-mart.css'; */\n\n.emoji-mart-bar:last-child {\n  display: none;\n}\n\n.emoji-mart-scroll {\n  overflow-y: scroll;\n  overflow-x: hidden;\n  /* override height */\n  height: 12em;\n  padding: 0 6px 6px 6px;\n  will-change: transform;\n}\n";
n(css,{});

function EmojiPicker({
  setEmoji
}) {
  return /*#__PURE__*/jsx(Picker, {
    onSelect: ({
      native
    }) => setEmoji(native)
  });
}

async function getClipboardText() {
  return await navigator.clipboard.readText();
}

function verifyHotkey(e, keys) {
  return isHotkey(keys, e);
}
function getPluginHotkey(editor, pluginKey) {
  var _editor$options, _editor$options$plugi;

  return (_editor$options = editor.options) === null || _editor$options === void 0 ? void 0 : (_editor$options$plugi = _editor$options[pluginKey]) === null || _editor$options$plugi === void 0 ? void 0 : _editor$options$plugi.hotkey;
}

export { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BackgroundColorIcon, BgColorIcon, BlockCodeIcon, BlockQuoteIcon, BoldIcon, BorderAllIcon, BorderBottomIcon, BorderClearIcon, BorderColorIcon, BorderLeftIcon, BorderRightIcon, BorderTopIcon, CharactersCountIcon, ColorIcon, ColorPicker, EmojiIcon, EmojiPicker, FileImageIcon, FontColor, H1Icon, H2Icon, H3Icon, ImageIcon, ItalicIcon, LinkIcon, ListOLIcon, ListULIcon, Modal, ModalContext, StrikeThroughIcon, SubMenuIcon, SubscriptIcon, SuperscriptIcon, UnderlineIcon, getClipboardText, getPluginHotkey, verifyHotkey };
//# sourceMappingURL=index.es.js.map
