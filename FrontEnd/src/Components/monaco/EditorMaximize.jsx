import { faBroom, faMinimize } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import spinner from "../../Assets/spinner.gif";
import { useDispatch, useSelector } from "react-redux";
import { setCode } from "../../redux/action";
import { monacoApi } from "./api.monaco";
import { toast } from "sonner";
import { themes } from "../../lib/themes.js";
// eslint-disable-next-line react/prop-types
function EditorMaximize({ setIsMaximized }) {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const themeId = choosedTheme.replace(/\s+/g, "_").toLowerCase();
  const definedThemes = new Set();
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
      className=" h-screen w-screen flex justify-center items-center fixed top-0 left-0"
      style={{ zIndex: "1000" }}
    >
      <div
        className="flex flex-col w-full h-full  "
        style={{
          backgroundColor: themes.find((theme) => theme.name === choosedTheme)
            .colors[1],
          color: themes.find((theme) => theme.name === choosedTheme).textColor,
        }}
      >
        <div className=" text-sm text-blue-500 ">
          <button
            className="fixed bottom-4 left-1/2 -translate-x-1/2 transform bg-gray-900 hover:bg-gray-800 text-white rounded px-4 py-2 flex justify-center items-center space-x-2 cursor-pointer z-50 shadow-lg"
            onClick={() => setIsMaximized(false)}
          >
            <p>Minimize the editor</p>
            <FontAwesomeIcon icon={faMinimize} />
          </button>
        </div>
        <div className="flex justify-between items-center h-full">
          <div className="w-1/2 border border-gray-700 rounded overflow-hidden shadow">
            <Editor
              height="100vh"
              language={formData.language}
              defaultValue={
                formData.language === "javascript"
                  ? `// ${formData.language} code here`
                  : formData.language === "python"
                  ? `# ${formData.language} code here`
                  : formData.language === "php"
                  ? `<?php\n// ${formData.language} code here`
                  : `// ${formData.language} code here`
              }
              theme={themeId}
              beforeMount={(monaco) => {
                const currentTheme = themes.find(
                  (t) => t.name === choosedTheme
                );
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
          <div
            className={`relative border text-start p-2 me-2 rounded w-1/2 h-[100vh] ${
              iserror ? "border-red-500" : "border-gray-700"
            }`}
          >
            {isloading && (
              <div
                className="absolute top-0 left-0 right-0 opacity-75  p-2 rounded-t h-[100vh] flex justify-center items-center"
                style={{
                  backgroundColor: themes.find(
                    (theme) => theme.name === choosedTheme
                  ).colors[1],
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
              <div className="text-start overflow-y-auto text-sm h-[65vh] m-2">
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
    </div>
  );
}

export default EditorMaximize;
