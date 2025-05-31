import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faShuffle,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { setCode } from "../../redux/action";
import spinner from "../../Assets/spinner.gif";
import { toast } from "sonner";
import { monacoApi } from "./api.monaco";
import EditorMaximize from "./EditorMaximize";
import { themes } from "../../lib/themes";
function EditorComponent() {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const themeId = choosedTheme.replace(/\s+/g, "_").toLowerCase();
  const definedThemes = new Set();
  const [isMaximized, setIsMaximized] = useState(false);
  const formData = useSelector((state) => state.collectionReducer);
  const [code, setCodeMonaco] = useState("");
  const [output, setOutput] = useState("");
  const [iserror, setIsError] = useState(false);
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  async function showValue() {
    setIsLoading(true);
    setCodeMonaco(editorRef.current.getValue());
    try {
      const res = await monacoApi(
        formData.language,
        editorRef.current.getValue()
      );
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
  return (
    <div
      style={{ height: "500px" }}
      className="p-4 min-w-6xl max-w-full mx-auto space-y-2 flex flex-col justify-center"
    >
      {isMaximized && <EditorMaximize setIsMaximized={setIsMaximized} />}

      <div className="flex">
        <div className="w-1/2 flex justify-start items-center">
          <h3 className="text-sm ">
            The Selected Language:{" "}
            <span className="text-blue-500">{formData.language}</span>
          </h3>
        </div>
        <div className="w-1/2 flex justify-end items-center space-x-2 text-sm text-blue-500">
          <button
            className=" rounded px-4 py-2 flex justify-center items-center space-x-2 cursor-pointer"
            onClick={() => setIsMaximized(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = themes.find(
                (theme) => theme.name === choosedTheme
              )?.colors[2];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = themes.find(
                (theme) => theme.name === choosedTheme
              )?.colors[1];
            }}
          >
            <p>Maximize the editor</p>
            <FontAwesomeIcon
              icon={faUpRightAndDownLeftFromCenter}
              className="text-xs"
            />
          </button>
        </div>
      </div>
      <div className="flex space-x-2">
        <div
          className="w-2/5  rounded overflow-hidden shadow"
          style={{
            backgroundColor: themes.find((t) => t.name === choosedTheme)
              .colors[2],
            color: themes.find((t) => t.name === choosedTheme).textColor,
            border: `1px solid ${
              themes.find((t) => t.name === choosedTheme).colors[2]
            }`,
          }}
        >
          <Editor
            height="65vh"
            language={formData.language === 'c#' ? "csharp":formData.language}
            defaultValue={
              formData.language === "javascript"
                ? `// ${formData.language} code here \n${formData.code}`
                : formData.language === "python"
                ? `# ${formData.language} code here\n${formData.code}`
                : formData.language === "php"
                ? `<?php\n// ${formData.language} code here\n${formData.code}`
                : formData.language === "c#"
                ? `\n// ${formData.language} code here\n${formData.code}`
                : `// ${formData.language} code here\n${formData.code}`
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
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="w-1/8 flex justify-center items-center">
          <div>
            <FontAwesomeIcon icon={faShuffle} className="text-blue-500" />
            <p className="text-xs">
              Your code is supposed as the #1 code snippet
            </p>
          </div>
        </div>
        <div
          className={`relative border text-start p-2 rounded w-2/5 h-[65vh] ${
            iserror ? "border-red-500" : "border-gray-700"
          }`}
          style={{
            color: iserror
              ? "red"
              : themes.find((t) => t.name === choosedTheme).textColor,
            border: `1px solid ${
              themes.find((t) => t.name === choosedTheme).colors[2]
            }`,
          }}
        >
          {isloading && (
            <div className="absolute top-0 left-0 right-0  text-white p-2 rounded-t h-[65vh] flex justify-center items-center">
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
                className="border border-blue-500 ms-3 text-blue-500 rounded px-4 py-2 cursor-pointer hover:border-blue-600 hover:text-blue-600transition duration-300"
                onClick={() => showValue()}
              >
                run code
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
            <div className="text-start overflow-hidden scroll-y-auto text-sm h-[65vh] m-2">
              <div>
                <span
                className={`whitespace-pre-wrap `}
                  style={{
                    color: iserror
                      ? "red"
                      : `${
                          themes.find((theme) => theme.name === choosedTheme)
                            .textColor
                        }`,
                  }}
                >
                  {output}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorComponent;
