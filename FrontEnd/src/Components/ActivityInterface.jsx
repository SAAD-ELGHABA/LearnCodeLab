/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { themes } from "../lib/themes.js";
import { useDispatch, useSelector } from "react-redux";
import { CircleX, File } from "lucide-react";
import FeedbackInterface from "../Layouts/userpages/collection/Feedback/FedbackInterface.jsx";
import { motion, AnimatePresence } from "framer-motion";
import Add from "../Layouts/userpages/Addcollection/Add.jsx";
import { setTitleAndLanguage } from "../redux/action.js";
function ActivityInterface({ setActivityInterface, group }) {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const theme = themes.find((theme) => theme.name === choosedTheme);
  const languages = useSelector((state) => state.languagesReducer);
  const dispatch = useDispatch();

  const [dragOver, setDragOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setDroppedFiles((prev) => [...prev, ...files]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDroppedFiles((prev) => [...prev, ...files]);
  };
  const [language, setLanguage] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const languageRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const ArrowDown = (
    <svg
      className="w-4 h-4 inline-block ml-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ArrowUp = (
    <svg
      className="w-4 h-4 inline-block ml-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );
  const languageDisplay = language || "All Languages";
  const selectLanguage = (val) => {
    dispatch(setTitleAndLanguage('',val.toLowerCase()));
    setLanguage(val);
    setOpenDropdown(null);
  };
  const [isOpenCollection, setIsOpenCollection] = useState(false);
  return (
    <div
      className="flex flex-col h-full w-[100vw] justify-center fixed top-0 right-0 items-center rounded-lg shadow-lg bg-[#21252b5e]"
      style={{
        color: theme.textColor,
        zIndex: 1005,
      }}
    >
      <div
        className="w-[90%] h-[90%] p-8 rounded relative overflow-y-scroll custom-scrollbar"
        style={{
          backgroundColor: theme.colors[1],
          color: theme.textColor,
          border: `1px solid ${theme.colors[2]}`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Activity Interface</h1>
          <h2 className="text-xl">
            Title Group:{" "}
            <span className="text-blue-500 font-medium">
              {group?.groupName}
            </span>
          </h2>
        </div>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${
            dragOver ? "border-blue-500 bg-blue-50/10" : "border-gray-500"
          }`}
          style={{
            borderColor: dragOver ? "#3B82F6" : theme.colors[2],
            backgroundColor: dragOver ? "#3b82f620" : "transparent",
            color: theme.textColor,
          }}
        >
          <label className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
            <p className="text-center text-xl font-medium">
              Drag and drop files here
              <br />
              <span className="text-blue-500 text-sm">
                or choose a file here
              </span>
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {droppedFiles.length > 0 && (
          <ul className="text-sm grid grid-cols-6 gap-2 mt-4">
            {droppedFiles.map((file, idx) => (
              <li
                key={idx}
                className="flex items-center space-x-1 bg-gray-700 rounded-lg overflow-hidden p-1"
              >
                <span className="text-blue-500 font-medium">{idx + 1}.</span>
                <File className="h-4 w-4" />
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <label className="text-lg">Activity Description</label>
          <textarea
            className="w-full p-3 mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Write your activity description here..."
            style={{
              backgroundColor: theme.colors[1],
              color: theme.textColor,
              border: `1px solid ${theme.colors[2]}`,
            }}
          ></textarea>
        </div>
        <div>
          <div className="flex items-center justify-between my-4 w-full">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "language" ? null : "language")
              }
              className="w-auto rounded p-2 text-left flex justify-between items-center"
              type="button"
              style={{
                backgroundColor: theme.colors[1],
                color: theme.textColor,
                border: `1px solid ${theme.colors[2]}`,
              }}
            >
              {languageDisplay}
              {openDropdown === "language" ? ArrowUp : ArrowDown}
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white"
              onClick={() => setIsOpenCollection(!isOpenCollection)}
            >
              {isOpenCollection ? "- Close" : "+ Open"} Collection
            </button>
          </div>
          <div className="relative w-1/3" ref={languageRef}>
            {openDropdown === "language" && (
              <ul
                className="absolute custom-scrollbar custom-scroll z-10 w-full  rounded mt-1 max-h-40 overflow-auto shadow-lg"
                style={{
                  backgroundColor: theme.colors[1],
                  color: theme.textColor,
                  border: `1px solid ${theme.colors[2]}`,
                }}
              >
                {languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => selectLanguage(lang.name)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme.colors[0];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {lang.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {language && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-sm text-gray-500"
            >
              <p>
                You have selected the language:{" "}
                <span className="text-blue-500 font-medium">{language}</span>
              </p>
            </motion.div>
          )}
        </div>
        {isOpenCollection && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-gray-500"
          >
            <Add />
          </motion.div>
        )}
      </div>
      <button
        className="absolute top-2 right-0 px-4 py-2 rounded-full text-white cursor-pointer"
        onClick={() => setActivityInterface(false)}
      >
        <CircleX className="h-8 w-8" />
      </button>
    </div>
  );
}

export default ActivityInterface;
