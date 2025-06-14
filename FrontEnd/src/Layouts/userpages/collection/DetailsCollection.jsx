import { ChevronLeft, CircleCheck, Star, UsersRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CodeExecution from "./CodeExecution";
import FedbackInterface from "./Feedback/FedbackInterface";
import FeedbackType from "./Feedback/FeedbackType";
import { useEffect, useState } from "react";
import axios from "axios";
import spinner from "../../../Assets/spinner.gif";
<<<<<<< HEAD
import RateStars from "./Feedback/RateStars";
import { themes } from "../../../lib/themes.js";
=======
import {themes} from '../../../lib/themes.js'
>>>>>>> 27c02272435c323488386150c779909c9f511c29
function DetailsCollection() {
  const { slug, user } = useParams();
  const collections = useSelector((state) => state.collectionsReducer);
  const ChoosedCollection = collections.find(
    (collection) => collection.slug === slug
  );
<<<<<<< HEAD
  const choosedTheme = useSelector((state) => state.themeReducer);
=======
  const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
>>>>>>> 27c02272435c323488386150c779909c9f511c29
  const [typeFeedback, setTypeFeedback] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const response = await axios.get(
          `/api/feedbacks-collection/${ChoosedCollection?.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status >= 200 && response.status <= 300) {
          dispatch({
            type: "GET_FEEDBACK_COLLECTION",
            payload: response.data.feedbacks,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadFeedbacks();
  });

  return (
    <div>
      <div className="flex items-center gap-1 mb-4 text-sm">
        <button
          onClick={() => {
            window.history.back();
          }}
          className="flex items-center gap-1  hover:text-blue-500 cursor-pointer"
        >
          <ChevronLeft className="h-5" />
          <span>Back</span>
        </button>
      </div>
      {ChoosedCollection ? (
        <div className="flex flex-col mx-2 rounded p-4">
          <div className="flex gap-4 items-center">
            <div
              className="w-2/3 flex flex-col gap-4 pr-4"
              style={{
                borderRight: `1px solid ${
                  themes.find((theme) => theme.name === choosedTheme).colors[2]
                }`,
              }}
            >
              <h1 className="text-2xl font-semibold">
                {ChoosedCollection?.title}
              </h1>
<<<<<<< HEAD
              <h3 className="text-lg font-medium">
                {ChoosedCollection.question}
              </h3>
              <p className="text-sm opacity-75">{ChoosedCollection.description}</p>
=======
              <h3 className="text-lg font-medium">{ChoosedCollection.question}</h3>
              <p className="text-sm ">
                {ChoosedCollection.description}
              </p>
>>>>>>> 27c02272435c323488386150c779909c9f511c29
            </div>
            <div className="w-1/3 px-2">
              <div className="flex justify-end">
                <FeedbackType setTypeFeedback={setTypeFeedback} />
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <span className="text-xs flex items-center space-x-2">
                  <img src={ChoosedCollection?.user?.image} alt="user-image" className="h-7 w-7 rounded-full" />
                  <span className="font-bold">
                    {ChoosedCollection?.user?.firstName +
                      " " +
                      ChoosedCollection?.user?.lastName}
                  </span>
                </span>
                <span className="text-xs">
                  Posted:{" "}
                  <span className="font-bold">
                    {new Date(ChoosedCollection?.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </span>
                </span>
                <div className="flex items-center gap-1 text-xs justify-between">
<<<<<<< HEAD

                  <span>
                    Feedback:{" "}
                    <span className="font-semibold mx-2">
                      {ChoosedCollection.feedback.length}
                    </span>
                  </span>
                  <span
                    className="flex font-medium items-center gap-1  px-4 py-2 rounded "
=======
                  <span>Feedback: <span className="font-semibold mx-2">{ChoosedCollection.feedback.length}</span></span>
                  <span className="flex font-medium items-center gap-1  px-4 py-2 rounded "
>>>>>>> 27c02272435c323488386150c779909c9f511c29
                    style={{
                      backgroundColor: themes.find(
                        (theme) => theme.name === choosedTheme
                      ).colors[2],
                      color: themes.find((theme) => theme.name === choosedTheme)
                        .textColor,
                    }}
                  >
                    <span>{ChoosedCollection.language}</span>
                    <CircleCheck className="h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h6 className="text-sm font-semibold my-4">The code #1</h6>
            <CodeExecution
              language={ChoosedCollection?.language}
              code={ChoosedCollection?.code}
              status={true}
            />
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <img src={spinner} alt="spinner" />
        </div>
      )}
      {ChoosedCollection && (
        <FedbackInterface
          language={ChoosedCollection?.language}
          typeFeedbackChecked={typeFeedback}
          collection={ChoosedCollection}
        />
      )}
    </div>
  );
}

export default DetailsCollection;
