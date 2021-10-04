"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULTS_TD = exports.DEFAULTS_TH = exports.KEYS_TABLE = exports.ELEMENT_TD = exports.ELEMENT_TR = exports.ELEMENT_TH = exports.ELEMENT_TABLE = void 0;
exports.ELEMENT_TABLE = 'table';
exports.ELEMENT_TH = 'th';
exports.ELEMENT_TR = 'tr';
exports.ELEMENT_TD = 'td';
exports.KEYS_TABLE = [exports.ELEMENT_TABLE, exports.ELEMENT_TH, exports.ELEMENT_TR, exports.ELEMENT_TD];
exports.DEFAULTS_TH = {
    getNodeProps: ({ element }) => {
        var _a, _b;
        return ({
            colSpan: (_a = element === null || element === void 0 ? void 0 : element.attributes) === null || _a === void 0 ? void 0 : _a.colspan,
            rowSpan: (_b = element === null || element === void 0 ? void 0 : element.attributes) === null || _b === void 0 ? void 0 : _b.rowspan
        });
    }
};
exports.DEFAULTS_TD = {
    getNodeProps: ({ element }) => {
        var _a, _b;
        return ({
            colSpan: (_a = element === null || element === void 0 ? void 0 : element.attributes) === null || _a === void 0 ? void 0 : _a.colspan,
            rowSpan: (_b = element === null || element === void 0 ? void 0 : element.attributes) === null || _b === void 0 ? void 0 : _b.rowspan
        });
    }
};
//# sourceMappingURL=defaults.js.map