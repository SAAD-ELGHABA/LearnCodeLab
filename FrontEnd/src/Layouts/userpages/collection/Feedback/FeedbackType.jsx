import { Code, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars, react/prop-types
<<<<<<< HEAD
import { themes } from "../../../../lib/themes.js";
function FeedbackType({ setTypeFeedback }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const choosedTheme = useSelector((state) => state.themeReducer);
=======
import {themes} from '../../../../lib/themes.js'
function FeedbackType({setTypeFeedback}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
>>>>>>> 27c02272435c323488386150c779909c9f511c29
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="rounded px-4 py-2 text-xs cursor-pointer  shadow transition duration-300 flex items-center gap-2"
          style={{
<<<<<<< HEAD
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              .colors[1],
            color: themes.find((theme) => theme.name === choosedTheme)
              .textColor,
            border: `1px solid ${
              themes.find((theme) => theme.name === choosedTheme).colors[2]
            }`,
=======
            backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1],
            color: themes.find((theme) => theme.name === choosedTheme).textColor,
            border: `1px solid ${themes.find((theme) => theme.name === choosedTheme).colors[2]}`,
>>>>>>> 27c02272435c323488386150c779909c9f511c29
          }}
        >
          Add Your Feedback
        </button>

        {isDropdownOpen && (
<<<<<<< HEAD
          <div
            className="absolute right-0 mt-2 w-48 rounded shadow-lg z-50"
            style={{
              backgroundColor: themes.find(
                (theme) => theme.name === choosedTheme
              ).colors[1],
              color: themes.find((theme) => theme.name === choosedTheme)
                .textColor,
              border: `1px solid ${
                themes.find((theme) => theme.name === choosedTheme).colors[2]
              }`,
            }}
          >
            <ul className="flex flex-col text-sm">
              <li
                className="px-4 py-2  cursor-pointer flex items-center gap-2"
=======
          <div className="absolute right-0 mt-2 w-48 rounded shadow-lg z-50"
            style={{
              backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1],
              color: themes.find((theme) => theme.name === choosedTheme).textColor,
              border: `1px solid ${themes.find((theme) => theme.name === choosedTheme).colors[2]}`,
            }}
          >
            <ul className="flex flex-col text-sm">
              <li className="px-4 py-2  cursor-pointer flex items-center gap-2"
>>>>>>> 27c02272435c323488386150c779909c9f511c29
                onClick={() => {
                  setTypeFeedback("commentaire");
                  setIsDropdownOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themes.find(
                    (theme) => theme.name === choosedTheme
                  )?.colors[0];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = themes.find(
                    (theme) => theme.name === choosedTheme
                  )?.colors[1];
                }}
                
              >
                <MessageCircle className="h-4" />
                <span>Commentaire</span>
              </li>
<<<<<<< HEAD
              <li
                className="px-4 py-2  cursor-pointer flex items-center gap-2"
=======
              <li className="px-4 py-2  cursor-pointer flex items-center gap-2"
>>>>>>> 27c02272435c323488386150c779909c9f511c29
                onClick={() => {
                  setTypeFeedback("code");
                  setIsDropdownOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = themes.find(
                    (theme) => theme.name === choosedTheme
                  )?.colors[0];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = themes.find(
                    (theme) => theme.name === choosedTheme
                  )?.colors[1];
                }}
              >
                <Code className="h-4" />
                <span>Code</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackType;
