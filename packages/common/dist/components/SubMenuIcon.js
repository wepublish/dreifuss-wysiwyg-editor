"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const plate_core_1 = require("@udecode/plate-core");
const plate_toolbar_1 = require("@udecode/plate-toolbar");
const SubMenuIcon = (props) => {
    const editor = plate_core_1.useStoreEditorState(plate_core_1.useEventEditorId('focus'));
    return (jsx_runtime_1.jsx(plate_toolbar_1.ToolbarElement, Object.assign({}, props, { onMouseDown: e => e.preventDefault(), type: plate_core_1.getPlatePluginType(editor, props.type) }), void 0));
};
exports.SubMenuIcon = SubMenuIcon;
//# sourceMappingURL=SubMenuIcon.js.map