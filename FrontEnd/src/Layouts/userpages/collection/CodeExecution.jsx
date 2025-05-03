import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import spinner from "../../../Assets/spinner.gif";
import { monacoApi } from "../../../Components/monaco/api.monaco";
import { toast } from "sonner";

// eslint-disable-next-line react/prop-types
const CodeExecution = ({ language, code = null, status = false, setCode }) => {
  const [editorCode, setEditorCode] = useState(code || "");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const editorRef = useRef(null);

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

  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
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
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            padding: { top: 10, bottom: 5 },
            readOnly: status,
          }}
          readOnly={status}
          onMount={handleEditorDidMount}
        />
      </div>

      <div
        className={`relative border text-start p-2 me-2 rounded w-1/2 h-[65vh] ${
          isError ? "border-red-500" : "border-gray-700"
        }`}
      >
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 bg-gray-800 opacity-75 text-white p-2 rounded-t h-full flex justify-center items-center">
            <img src={spinner} alt="Loading..." className="w-10 h-10 mx-auto" />
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
              className="flex justify-center items-center space-x-2 text-slate-400 cursor-pointer hover:text-blue-500 transition duration-300 hover:bg-gray-800 rounded px-4 py-2"
              onClick={clearOutput}
            >
              <p>Clear Output</p>
            </button>
          </div>

          <div className="text-start overflow-y-auto text-sm h-[60vh] m-2">
            <div>
              <span
                className={`whitespace-pre-wrap ${
                  isError ? "text-red-500" : "text-slate-400"
                }`}
              >
                {output}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExecution;
