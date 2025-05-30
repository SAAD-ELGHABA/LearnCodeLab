import { useEffect, useState } from "react";
import FeedbackType from "./FeedbackType";
import { MessageCircleOff, ChevronDown } from "lucide-react";
import Commentaire from "./Commentaire";
import Code from "./Code";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import CodeExecution from "../CodeExecution";
import {themes} from '../../../../lib/themes.js';
// eslint-disable-next-line react/prop-types
function FeedbackInterface({ language, typeFeedbackChecked, collection }) {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const [typeFeedback, setTypeFeedback] = useState("");
  const [openAccordion, setOpenAccordion] = useState(null);
  const feedbackReducer = useSelector((state) => state.feedbackReducer);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth" });
  }, [typeFeedbackChecked]);

  const activeType = typeFeedbackChecked || typeFeedback;

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="flex flex-col mx-2 rounded p-4 min-h-[300px] overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Feedback&apos;s</h1>
        <FeedbackType setTypeFeedback={setTypeFeedback} />
      </div>

      <AnimatePresence mode="wait">
        {typeFeedback && (
          <motion.div
            key={typeFeedback}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            {typeFeedback === "commentaire" ? (
              <Commentaire
                collection={collection}
                setTypeFeedback={setTypeFeedback}
              />
            ) : (
              <Code collection={collection} setTypeFeedback={setTypeFeedback} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {feedbackReducer.length > 0 ? (
        feedbackReducer.map((feedback, index) => {
          if (feedback.type === "code") {
            return (
              <div key={index} className="my-4">
                <div
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center  p-4 rounded-lg  cursor-pointer select-none"
                  style={{
                    backgroundColor: themes.find(
                      (theme) => theme.name === choosedTheme
                    ).colors[1],
                    color: themes.find(
                      (theme) => theme.name === choosedTheme
                    ).textColor,
                    border: `1px solid ${themes.find(
                      (theme) => theme.name === choosedTheme
                    ).borderColor}`,
                  }}
                >
                  <div>
                    <div className="flex space-x-2 items-center">
                      <div className="flex items-center space-x-2">
                        <img
                          src={feedback?.user?.image}
                          alt="image-user"
                          className="h-5 w-5 rounded-full"
                        />
                        <span className="underline">
                          {feedback.user.firstName +
                            " " +
                            feedback.user.lastName}
                        </span>
                      </div>
                      <span className="text-xs ">
                        Code Feedback #{index + 2}
                      </span>
                    </div>
                    <div className="flex justify-start">
                      <span className="text-xs ">
                        {new Date(feedback.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openAccordion === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {openAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-2"
                    >
                      <CodeExecution
                        language={feedback.language}
                        code={feedback.content}
                        status={true}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          } else if (feedback.type === "commentaire") {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="p-3 rounded-2xl rounded-bl-none my-2 w-full min-w-[80%] self-start shadow-md flex flex-col"
                style={{
                  backgroundColor: themes.find(
                    (theme) => theme.name === choosedTheme
                  ).colors[1],
                  color: themes.find(
                    (theme) => theme.name === choosedTheme
                  ).textColor,
                  border: `1px solid ${themes.find(
                    (theme) => theme.name === choosedTheme
                  ).borderColor}`,
                }}
              >
                <div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={feedback?.user?.image}
                        alt="image-user"
                        className="h-5 w-5 rounded-full"
                      />
                      <span className="underline">
                        {feedback.user.firstName + " " + feedback.user.lastName}
                      </span>
                    </div>
                    <span className=" text-sm">
                      {feedback.content}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-xs ">
                      {new Date(feedback.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          } else {
            return null;
          }
        })
      ) : (
        <motion.div
          key="no-feedback"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4 h-full justify-center items-center "
        >
          <MessageCircleOff className="h-20 w-20" />
          <h2 className="text-2xl font-semibold ">
            No Feedback yet
          </h2>
          <p className="text-sm">Be the first to leave a Feedback</p>
        </motion.div>
      )}
    </div>
  );
}

export default FeedbackInterface;
