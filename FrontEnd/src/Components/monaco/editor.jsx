import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faShuffle,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import {  useRef, useState } from "react";
import { setCode } from "../../redux/action";
import spinner from "../../Assets/spinner.gif";
import { toast } from "sonner";
import { monacoApi } from "./api.monaco";
import EditorMaximize from "./EditorMaximize";
function EditorComponent() {
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

  return (
    <div
      style={{ height: "500px" }}
      className="p-4 min-w-6xl max-w-full mx-auto space-y-2 flex flex-col justify-center"
    >
      {isMaximized && <EditorMaximize setIsMaximized={setIsMaximized} />}

      <div className="flex">
        <div className="w-1/2 flex justify-start items-center">
          <h3 className="text-sm text-slate-400">
            The Selected Language:{" "}
            <span className="text-blue-500">{formData.language}</span>
          </h3>
        </div>
        <div className="w-1/2 flex justify-end items-center space-x-2 text-sm text-blue-500">
          <button
            className="hover:bg-gray-800 rounded px-2 py-2 flex justify-center items-center space-x-2 cursor-pointer"
            onClick={() => setIsMaximized(true)}
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
        <div className="w-2/5 border border-gray-700 rounded overflow-hidden shadow">
          <Editor
            height="65vh"
            language={formData.language}
            defaultValue={
              formData.language === "javascript"
                ? `// ${formData.language} code here \n${formData.code}`
                : formData.language === "python"
                ? `# ${formData.language} code here\n${formData.code}`
                : formData.language === "php"
                ? `<?php\n// ${formData.language} code here\n${formData.code}`
                : `// ${formData.language} code here\n${formData.code}`
            }
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              padding: {
                top: 10,
                bottom: 5,
              },
            }}
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
              <button className="flex justify-center items-center space-x-2 text-slate-400 ">
                <p>clear output</p>
                <FontAwesomeIcon icon={faBroom} />
              </button>
            </div>
            <div className="text-start overflow-hidden scroll-y-auto text-sm h-[65vh] m-2">
              <div>
                <span
                  className={`
              ${iserror ? "text-red-500" : "text-slate-400"}
              `}
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
