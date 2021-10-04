"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTablePlugin = void 0;
const plate_core_1 = require("@udecode/plate-core");
const defaults_1 = require("./defaults");
const getTableDeserialize_1 = require("./getTableDeserialize");
const getTableOnKeyDown_1 = require("./getTableOnKeyDown");
const withTable_1 = require("./withTable");
/**
 * Enables support for tables.
 */
const createTablePlugin = () => ({
    pluginKeys: defaults_1.KEYS_TABLE,
    renderElement: plate_core_1.getRenderElement(defaults_1.KEYS_TABLE),
    deserialize: getTableDeserialize_1.getTableDeserialize(),
    onKeyDown: getTableOnKeyDown_1.getTableOnKeyDown(),
    withOverrides: withTable_1.withTable()
});
exports.createTablePlugin = createTablePlugin;
//# sourceMappingURL=createTablePlugin.js.map