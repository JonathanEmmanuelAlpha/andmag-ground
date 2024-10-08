import React, { useCallback, useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-bright.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = [
  [
    "bold",
    "italic",
    { color: [] },
    { background: [] },
    { list: "ordered" },
    { list: "bullet" },
    { align: [] },
    "link",
    "blockquote",
    "code-block",
    "formula",
  ],
];

function SimpleTextEditor({ onReady, initialDelta }) {
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (!quill || typeof onReady !== "function") return;

    onReady(quill);
  }, [quill, onReady]);

  useEffect(() => {
    if (!quill || !initialDelta) return;

    quill.setContents(initialDelta);
  }, [quill, initialDelta]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const languages = [
      "javascript",
      "typescript",
      "jsx",
      "js",
      "c",
      "h",
      "hpp",
      "cpp",
      "hpp",
      "java",
      "python",
      "html",
      "css",
      "scss",
      "csharp",
      "ruby",
      "xml",
      "kotlin",
    ];
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        syntax: {
          highlight: (text) => hljs.highlightAuto(text, languages).value,
        },
        toolbar: TOOLBAR_OPTIONS,
      },
    });

    setQuill(q);
  }, []);

  return (
    <div className="simple-text-editor-container">
      <div ref={wrapperRef} style={{ width: "100%" }} />
    </div>
  );
}

export default SimpleTextEditor;
