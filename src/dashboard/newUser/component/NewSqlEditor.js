import React, { useState } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

const NewSqlEditor = ({ onQueryChange, value }) => {
  return (
    <Editor
      //   height="400px"
      defaultLanguage="sql"
      defaultValue=""
      theme="vs-dark"
      onChange={onQueryChange}
      value={value}
    />
  );
};

export default NewSqlEditor;
