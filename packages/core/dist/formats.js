"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFormats = exports.TextFormats = exports.InlineFormats = exports.BlockFormats = exports.TextFormat = exports.InlineFormat = exports.BlockFormat = void 0;
var BlockFormat;
(function (BlockFormat) {
    BlockFormat["H1"] = "heading-one";
    BlockFormat["H2"] = "heading-two";
    BlockFormat["H3"] = "heading-three";
    BlockFormat["Paragraph"] = "paragraph";
    BlockFormat["UnorderedList"] = "unordered-list";
    BlockFormat["OrderedList"] = "ordered-list";
    BlockFormat["ListItem"] = "list-item";
    BlockFormat["Table"] = "table";
    BlockFormat["TableRow"] = "table-row";
    BlockFormat["TableCell"] = "table-cell";
})(BlockFormat = exports.BlockFormat || (exports.BlockFormat = {}));
var InlineFormat;
(function (InlineFormat) {
    InlineFormat["Link"] = "link";
})(InlineFormat = exports.InlineFormat || (exports.InlineFormat = {}));
var TextFormat;
(function (TextFormat) {
    TextFormat["Bold"] = "bold";
    TextFormat["Italic"] = "italic";
    TextFormat["Underline"] = "underline";
    TextFormat["Strikethrough"] = "strikethrough";
    TextFormat["Superscript"] = "superscript";
    TextFormat["Subscript"] = "subscript";
})(TextFormat = exports.TextFormat || (exports.TextFormat = {}));
exports.BlockFormats = Object.values(BlockFormat);
exports.InlineFormats = Object.values(InlineFormat);
exports.TextFormats = Object.values(TextFormat);
exports.ListFormats = [BlockFormat.UnorderedList, BlockFormat.OrderedList];
//# sourceMappingURL=formats.js.map