import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import spinner from "../../../Assets/spinner.gif";
import { monacoApi } from "../../../Components/monaco/api.monaco";
import { toast } from "sonner";
import { themes } from "../../../lib/themes.js";
import { useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types
const CodeExecution = ({ language, code = null, status = false, setCode }) => {
  const [editorCode, setEditorCode] = useState(code || "");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const editorRef = useRef(null);
  const choosedTheme = useSelector((state) => state.themeReducer);
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  async function showValue() {
    setIsLoading(true);
    try {
      const res = await monacoApi(language, editorRef.current.getValue());
      if (res.stderr) {
        setIsError(true);
        setOutput(res.stderr);
      } else {
        setIsError(false);
      }
      setOutput(res.output);
    } catch (error) {
      toast.error("Error: " + error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const clearOutput = () => {
    setOutput("");
    setIsError(false);
    toast.success("Output cleared successfully!");
  };
  const themeId = choosedTheme.replace(/\s+/g, "_").toLowerCase();
  const definedThemes = new Set();

  return (
    <div className="flex space-x-2">
      <div
        className={` pr-4 rounded ${
          language === "javascript" ||
          language === "php" ||
          language === "python"
            ? "w-1/2"
            : "w-full"
        }`}
        style={{
          border: `1px solid ${
            themes.find((theme) => theme.name === choosedTheme)?.colors[2]
          }`,
        }}
      >
        <Editor
          height="65vh"
          language={
            language === "react"
              ? "javascriptreact"
              : language === "laravel"
              ? "php"
              : language === "css"
              ? "css"
              : language
          }
          defaultValue={
            code ||
            (language === "javascript"
              ? `// ${language} code here`
              : language === "python"
              ? `# ${language} code here`
              : language === "laravel"
              ? `<?php\n// ${language} code here`
              : language === "css"
              ? `/* ${language} code here */`
              : `// ${language} code here`)
          }
          value={editorCode}
          onChange={(newValue) => {
            setEditorCode(newValue);
            setCode(newValue);
          }}
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
          onMount={handleEditorDidMount}
        />
      </div>
      {(language === "javascript" ||
        language === "php" ||
        language === "python") && (
        <div
          className={`relative  text-start p-2 me-2 rounded w-1/2 h-[65vh]`}
          style={{
            border: isError
              ? "red 1px solid"
              : `1px solid ${
                  themes.find((theme) => theme.name === choosedTheme)?.colors[2]
                }`,
          }}
        >
          {isLoading && (
            <div
              className="absolute top-0 left-0 right-0 opacity-75 p-2 rounded-t h-full flex justify-center items-center"
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                )?.colors[0],
                color: themes.find((theme) => theme.name === choosedTheme)
                  ?.textColor,
              }}
            >
              <img
                src={spinner}
                alt="Loading..."
                className="w-10 h-10 mx-auto"
              />
            </div>
          )}

          <div>
            <div className="w-full flex justify-between items-center text-sm">
              <button
                className="border border-blue-500 ms-3 text-blue-500 rounded px-4 py-2 cursor-pointer hover:border-blue-600 hover:text-blue-600 transition duration-300"
                onClick={showValue}
              >
                Run Code
              </button>
              <button
                className="flex justify-center items-center space-x-2 cursor-pointer hover:text-blue-500 transition duration-300 rounded px-4 py-2"
                style={{
                  border: `1px solid ${
                    themes.find((theme) => theme.name === choosedTheme)
                      .colors[2]
                  }`,
                }}
                onClick={clearOutput}
              >
                <p>Clear Output</p>
              </button>
            </div>

            <div className="text-start overflow-y-auto text-sm h-[60vh] m-2">
              <div>
                <span
                  className={`whitespace-pre-wrap `}
                  style={{
                    color: isError
                      ? "red"
                      : themes.find((theme) => theme.name === choosedTheme)
                          ?.textColor,
                  }}
                >
                  {output}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeExecution;
