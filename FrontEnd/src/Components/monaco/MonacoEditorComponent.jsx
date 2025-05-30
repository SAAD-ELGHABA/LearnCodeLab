import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { setCode } from "../../redux/action";
import { themes } from "../../lib/themes.js";
const MonacoEditorComponent = () => {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const themeId = choosedTheme.replace(/\s+/g, "_").toLowerCase();
  const definedThemes = new Set();
  const formData = useSelector((state) => state.collectionReducer);
  const dispatch = useDispatch();
  return (
    <div className="p-4 min-w-6xl max-w-full mx-auto   rounded overflow-hidden shadow">
      <div className="flex justify-center items-center space-x-2 text-sm  my-2  p-2 "
        style={{
          backgroundColor: themes.find((t) => t.name === choosedTheme)
            .colors[0],
          color: themes.find((t) => t.name === choosedTheme).textColor,
          border: `1px solid ${themes.find((t) => t.name === choosedTheme).colors[1]}`,
          borderRadius: "8px",
        }}
      >
        <FontAwesomeIcon icon={faCircleQuestion} />
        <p className="text-start">
          if your using one of the following technologies:
          (Bootstrap,react,laravel,algorithm,html,css) your not going to be able
          to use the monaco editor with its excution code dynamically..{" "}
          <span className="text-blue-400">learn more</span>
        </p>
      </div>
      <Editor
        height="65vh"
        language={
          formData.language === "react"
            ? "javascriptreact"
            : formData.language === "laravel"
            ? "php"
            : formData.language == "css"
            ? "css"
            : formData.language
        }
        defaultValue={
          formData.language === "javascript"
            ? `// ${formData.language} code here`
            : formData.language === "python"
            ? `# ${formData.language} code here`
            : formData.language === "laravel"
            ? `<?php\n// ${formData.language} code here`
            : formData.language === "css"
            ? `/* ${formData.language} code here */ `
            : `// ${formData.language} code here`
        }
        theme={themeId}
            beforeMount={(monaco) => {
              const currentTheme = themes.find((t) => t.name === choosedTheme);
              if (!currentTheme || definedThemes.has(themeId)) return;

              monaco.editor.defineTheme(themeId, {
                base:
                  choosedTheme === "Light" || choosedTheme === "Slik"
                    ? "vs"
                    : "vs-dark",
                inherit: true,
                rules: [
                  {
                    token: "",
                    foreground: currentTheme.textColor.replace("#", ""),
                  },
                  { token: "comment", foreground: "6A9955" },
                  { token: "keyword", foreground: "007acc" },
                  { token: "string", foreground: "ce9178" },
                ],
                colors: {
                  "editor.background": currentTheme.colors[0],
                  "editor.foreground": currentTheme.textColor,
                  "editorLineNumber.foreground": "#999999",
                  "editorCursor.foreground": currentTheme.textColor,
                  "editor.lineHighlightBackground": currentTheme.colors[1],
                  "editor.selectionBackground": currentTheme.colors[2] + "99",
                  "editor.inactiveSelectionBackground":
                    currentTheme.colors[2] + "44",
                },
              });

              definedThemes.add(themeId);
            }}
            options={{
              minimap: { enabled: false },
              padding: { top: 10, bottom: 5 },
              readOnly: status,
            }}
            readOnly={status}
            value={formData.code}
            onChange={(value) => dispatch(setCode(value))}
            // onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default MonacoEditorComponent;
