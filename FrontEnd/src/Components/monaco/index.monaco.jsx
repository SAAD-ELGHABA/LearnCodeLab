import { useSelector } from "react-redux";

import EditorComponent from "./editor";
import MonacoEditorComponent from "./MonacoEditorComponent";
function MonacoComponent() {
  const formData = useSelector((state) => state.collectionReducer);
  if (
    formData.language === "javascript" ||
    formData.language === "python" ||
    formData.language === "php"
  ) {
    return (
      <div>
        <EditorComponent />
      </div>
    );
  } else {
    return <MonacoEditorComponent />;
  }
}

export default MonacoComponent;
