import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Editor } from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { setCode } from "../../redux/action";

const MonacoEditorComponent = () => {
  const formData = useSelector((state) => state.collectionReducer);
  const dispatch = useDispatch();
  return (
    <div className="p-4 min-w-6xl max-w-full mx-auto  border border-gray-700 rounded overflow-hidden shadow">
      <div className="flex justify-center items-center space-x-2 text-sm text-gray-400 my-2 bg-gray-800 p-2 ">
        <FontAwesomeIcon icon={faCircleQuestion} />
        <p>
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
            : formData.language === "css"? 
            `/* ${formData.language} code here */ `:
            `// ${formData.language} code here`
        }
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          padding: {
            top: 10,
            bottom: 5,
          },
        }}
        onChange={(value) => {
          dispatch(setCode(value));
        }}
      />
    </div>
  );
};

export default MonacoEditorComponent;
