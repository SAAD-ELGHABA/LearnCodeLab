/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "sonner";
import { feedbackPromise } from "./feedbackPromise";
import spinner from "../../../../Assets/spinner.gif";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
function Commentaire({ collection, setTypeFeedback }) {
  const [commentaireValue, setCommentaireValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleCommentaire = async () => {
    setIsLoading(true);
    try {
      const response = await feedbackPromise(
        {
          collection_id: collection?.id,
          // eslint-disable-next-line react/prop-types
          language: collection?.language,
          content: commentaireValue,
          type: "commentaire",
        },
        dispatch
      );
      if (response) {
        setCommentaireValue("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setTypeFeedback("");
    }
  };
  return (
    <div className="w-full  p-4">
      <div className="relative bg-gray-800 text-white p-4 rounded-xl rounded-bl-none min-w-xl w-full">
        <textarea
          className="w-full h-32 bg-transparent text-gray-300 placeholder-gray-500 outline-none resize-none  "
          placeholder="Write your comment here..."
          onChange={(e) => setCommentaireValue(e.target.value)}
          value={commentaireValue}
        ></textarea>
        <div className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2 w-3 h-3 bg-gray-800 rotate-45 border border-blue-500"></div>
      </div>
      <div className="flex justify-start my-4 text-sm space-x-2 items-center">
        <button
          className="bg-blue-500 px-6 py-2 rounded cursor-pointer hover:bg-blue-600"
          onClick={handleCommentaire}
        >
          {isLoading ? (
            <img src={spinner} alt="spinner" className="w-5 h-5" />
          ) : (
            "Submit"
          )}
        </button>
        <button
          className="border border-blue-500 rounded cursor-pointer px-6 py-2 text-blue-500  hover:border-blue-600 hover:text-blue-600"
          onClick={() => setCommentaireValue("")}
        >
          reset
        </button>
      </div>
    </div>
  );
}

export default Commentaire;
