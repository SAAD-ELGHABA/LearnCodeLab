/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { themes } from "../lib/themes.js";
import { useDispatch, useSelector } from "react-redux";
import { ArrowsUpFromLine, CircleX, File } from "lucide-react";
import Add from "../Layouts/userpages/Addcollection/Add.jsx";
import { setTitleAndLanguage } from "../redux/action.js";
import axios from "axios";
import { toast } from "sonner";
function ActivityInterface({ setActivityInterface, group = null }) {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const theme = themes.find((theme) => theme.name === choosedTheme);
  const languages = useSelector((state) => state.languagesReducer);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const [dragOver, setDragOver] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState([]);
  const handleRemoveFile = (indexToRemove) => {
    setDroppedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const data = {
        files: [],
        typeActivity: "request",
        isPrivate,
      };

      formData.append("data", JSON.stringify(data));

      formData.append("description", description);
      formData.append("group_id", group?.id || "");

      droppedFiles.forEach((file) => {
        formData.append("files[]", file);
      });
      console.log(formData);
      setActivityInterface(false);
      const res = await axios.post("/api/create-activity", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res?.data?.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex flex-col h-full w-[100vw] justify-center fixed top-0 right-0 items-center rounded-lg shadow-lg bg-[#21252b5e]"
      style={{
        color: theme.textColor,
        zIndex: 1005,
      }}
    >
      <div
        className="w-[90%] h-[90%] p-6 rounded relative overflow-y-scroll custom-scrollbar"
        style={{
          backgroundColor: theme.colors[1],
          color: theme.textColor,
          border: `1px solid ${theme.colors[2]}`,
        }}
      >
        <div>
          {group && (
            <div className="flex items-center justify-between space-x-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold">Activity Interface</h1>
                <h2 className="text-xl">
                  <span className="text-blue-500 font-medium">
                    {group?.groupName}
                  </span>
                </h2>
              </div>
              <div>
                <button
                  className="cursor-pointer flex space-x-2 items-center bg-blue-500 text-white rounded px-5 py-2 hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  <ArrowsUpFromLine className="h-4 w-4" />
                  <span>submit</span>
                </button>
              </div>
            </div>
          )}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = themes.find(
                (theme) => theme.name === choosedTheme
              )?.colors[2];
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = themes.find(
                (theme) => theme.name === choosedTheme
              )?.colors[1];
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
                  className="flex items-center space-x-1 bg-gray-700 rounded-lg overflow-hidden py-2 px-3 justify-between"
                >
                  <span className="text-blue-500 font-medium">{idx + 1}.</span>
                  <File className="h-4 w-4" />
                  <span className="truncate max-w-[100px]">{file.name}</span>
                  <button
                    className="cursor-pointer text-red-400 hover:text-red-500"
                    onClick={() => handleRemoveFile(idx)}
                    title="Remove file"
                  >
                    <CircleX className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          {user?.role === "formateur" && (
            <div className="mt-4">
              <label className="text-lg">Activity Description</label>
              <textarea
                className="w-full p-3 mt-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                placeholder="Write your activity description here..."
                style={{
                  backgroundColor: theme.colors[1],
                  color: theme.textColor,
                  border: `1px solid ${theme.colors[2]}`,
                }}
                rows={6}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          )}
          {user?.role === "formateur" && (
            <div className="flex items-center space-x-2">
              <label className="inline-flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  className="peer hidden"
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <div
                  className="h-4 w-4 rounded flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 transition opacity-75"
                  style={{
                    border: `1px solid ${theme.textColor}`,
                  }}
                >
                  <svg
                    className="w-3 h-3 text-white hidden peer-checked:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span
                  className="text-sm opacity-75"
                  style={{
                    color: theme.textColor,
                  }}
                >
                  Check if the response should be private
                </span>
              </label>
            </div>
          )}
        </div>
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
