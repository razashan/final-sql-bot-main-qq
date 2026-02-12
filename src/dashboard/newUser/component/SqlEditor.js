import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
// import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import from @mui/material
// import CssBaseline from "@mui/material/CssBaseline"; // Add CssBaseline for consistent styling
import {
  CompletionContext,
  autocompletion,
  CompletionSource,
} from "@codemirror/autocomplete";
import { sql, SQLDialect } from "@codemirror/lang-sql";
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
import { EditorView, keymap } from "@codemirror/view";
import { tags } from "@lezer/highlight";
import { HighlightStyle } from "@codemirror/language";

// const lightTheme = createTheme(); // You can customize the theme using the createTheme function
// const darkTheme = createTheme({ palette: { mode: "dark" } }); // Adjust the theme for dark mode
const KEYWORDS = [
  "select",
  "from",
  "where",
  "and",
  "or",
  "not",
  "in",
  "between",
  "exists",
  "like",
  "distinct",
  "case",
  "when",
  "then",
  "else",
  "end",
  "all",
  "any",
  "is",
  "null",
  "join",
  "inner",
  "left",
  "right",
  "full",
  "outer",
  "on",
  "group by",
  "having",
  "order by",
  "asc",
  "desc",
  "limit",
  "offset",
  "union",
  "intersect",
  "except",
  "insert",
  "into",
  "values",
  "update",
  "set",
  "delete",
  "create",
  "table",
  "alter",
  "drop",
  "index",
  "primary key",
  "foreign key",
  "references",
  "default",
  "check",
  "constraint",
  "unique",
  "truncate",
  "procedure",
  "function",
  "begin",
  "end",
  "declare",
  "if",
  "else",
  "while",
  "for",
  "foreach",
  "cursor",
  "open",
  "fetch",
  "close",
  "commit",
  "rollback",
  "savepoint",
  "grant",
  "revoke",
  "with",
];

const TENSORS = ["images", "labels"];

const dialect = SQLDialect.define({
  keywords: KEYWORDS.join(" "),
  builtin: TENSORS.join(" "),
});

const SqlEditor = ({ onQueryChange, value }) => {
 
  const codeTheme = EditorView.theme(
    {
      "&": {
        fontFamily: "monospace",
        fontSize: "14px",
      },
      ".cm-line-like": {
        backgroundColor: "#191C22",
        color: "white",
      },
      ".cm-content": {
        caretColor: "white",
      },
      ".cm-gutters": {
        backgroundColor: "#191C22",
      },
      "&.cm-focused .cm-cursor": {
        borderLeftColor: "#0e9",
      },
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#074",
      },
      ".cm-gutters": {
        backgroundColor: "#191C22",
        color: "#ddd",
        border: "none",
      },
    },
    { dark: true }
  );

  
  return (
    <div>
      <CodeMirror
        indentWithTab={false}
        value={value}
        onChange={onQueryChange}
        theme={codeTheme}
        extensions={[sql({ dialect }), keymap.of(vscodeKeymap)]}
      />
    </div>
    // <ThemeProvider theme={theme}>
    //   <CssBaseline /> {/* Add CssBaseline to apply baseline styles */}
    //   <button onClick={() => setTheme(lightTheme)}>Light</button>
    //   <button onClick={() => setTheme(darkTheme)}>Dark</button>
    //   <div>
    //     <h1>Hello CodeSandbox</h1>
    //     <h2>Start editing to see some magic happen!</h2>

    //   </div>
    // </ThemeProvider>
  );
};

export default SqlEditor;
