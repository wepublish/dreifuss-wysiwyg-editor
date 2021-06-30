import React, { useState, useEffect } from "react";
import { Editor, Transforms } from "slate";
import { useStoreEditor } from "@udecode/slate-plugins-core";

export enum TableElementFormat {
  Table = "table",
  TableRow = "table-row",
  TableCell = "table-cell",
}

export function TableBackgroundColorPicker({ editorId }: { editorId: string }) {
    const editor: any = useStoreEditor(editorId ?? "main");
  
    const [backgroundColor, setBackgroundColor] = useState<string>();
  
    useEffect(() => {
      const nodes: any = Editor.nodes(editor, {
        match: (node: any) => node.type === "table-cell",
      });
      for (const [node] of nodes) {
        setBackgroundColor(node.backgroundColor as string);
        return;
      }
    }, [editor.selection]);
  
    useEffect(() => {
      if (backgroundColor) {
        const nodes = Editor.nodes(editor, {
          match: (node: any) => node.type === TableElementFormat.TableCell,
        });
        for (const [, path] of nodes) {
          Transforms.setNodes(
            editor,
            //@ts-ignore
            { backgroundColor: backgroundColor ?? "#000" },
            {
              at: path,
              match: (node: any) => node.type === TableElementFormat.TableCell,
            }
          );
          return;
        }
      }
    }, [backgroundColor]);
  
    return (
      <input
        type="color"
        name="backgroundColor"
        style={{ cursor: "pointer" }}
        onChange={(e) => setBackgroundColor(e.target.value)}
        value={backgroundColor}
      />
    );
}
