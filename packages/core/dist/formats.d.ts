export declare enum BlockFormat {
    H1 = "heading-one",
    H2 = "heading-two",
    H3 = "heading-three",
    Paragraph = "paragraph",
    UnorderedList = "unordered-list",
    OrderedList = "ordered-list",
    ListItem = "list-item",
    Table = "table",
    TableRow = "table-row",
    TableCell = "table-cell"
}
export declare enum InlineFormat {
    Link = "link"
}
export declare enum TextFormat {
    Bold = "bold",
    Italic = "italic",
    Underline = "underline",
    Strikethrough = "strikethrough",
    Superscript = "superscript",
    Subscript = "subscript"
}
export declare type Format = BlockFormat | InlineFormat | TextFormat;
export declare const BlockFormats: string[];
export declare const InlineFormats: string[];
export declare const TextFormats: string[];
export declare const ListFormats: string[];
//# sourceMappingURL=formats.d.ts.map