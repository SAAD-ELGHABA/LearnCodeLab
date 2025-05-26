import { CodeXml, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setTitleAndLanguage } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import { themes } from "../../lib/themes.js";
function Languages() {
  const languages = useSelector((state) => state.languagesReducer);
  const [openIndex, setOpenIndex] = useState(0);
  const chooseTheme = useSelector((state) => state.themeReducer);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleCollectionLanguage = (language) => {
    dispatch(setTitleAndLanguage("", language));
    nav("/add1");
  };
  return (
    <div className="mx-8 my-4">
      <div className="flex items-end space-x-2 mb-4">
        <h1 className="text-xl font-semibold">Languages</h1>
        <CodeXml className="h-7 w-7" />
      </div>

      <div className="space-y-2">
        {languages.map((lang, index) => (
          <div
            key={index}
            className=" rounded-2xl overflow-hidden shadow-sm"
            style={{
              backgroundColor: themes.find((theme) => theme.name === chooseTheme)?.colors[1],
              border: `1px solid ${themes.find((theme) => theme.name === chooseTheme)?.colors[2]}`,
              color: themes.find((theme) => theme.name === chooseTheme)?.textColor,
            }}
          >
            <button
              className="flex justify-between items-center w-full px-4 py-3 text-left"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium capitalize">{lang.name}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-3  text-sm">
                    {lang?.description}
                    <div className="w-full flex justify-end my-2">
                      <button
                        className="border border-blue-500 px-4 py-2 rounded hover:text-blue-500 cursor-pointer"
                        onClick={() => handleCollectionLanguage(lang?.name)}
                      >
                        + create a collection with {lang?.name}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Languages;
