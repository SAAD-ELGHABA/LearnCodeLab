/* eslint-disable react/prop-types */
import { useState } from "react";
import CodeExecution from "../CodeExecution";
import { feedbackPromise } from "./feedbackPromise";
import spinner from "../../../../Assets/spinner.gif";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
function Code({ collection }) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleCode = async () => {
    setIsLoading(true);
    try {
      const response = await feedbackPromise(
        {
          collection_id: collection?.id,
          language: collection.language,
          content: code,
          type: "code",
        },
        dispatch
      );
      if (response) {
        setCode("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <CodeExecution language={collection.language} setCode={setCode} />
      <div className="flex justify-start my-4 text-sm space-x-3 items-center">
        <button
          className="bg-blue-500 px-6 py-2 rounded cursor-pointer hover:bg-blue-600"
          onClick={handleCode}
        >
          {isLoading ? (
            <img src={spinner} alt="spinner" className="w-5 h-5" />
          ) : (
            "Submit"
          )}
        </button>
        <button className="border border-blue-500 rounded cursor-pointer px-6 py-2 text-blue-500  hover:border-blue-600 hover:text-blue-600">
          reset
        </button>
      </div>
    </div>
  );
}

export default Code;
