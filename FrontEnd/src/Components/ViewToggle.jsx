import { AlignJustify, ChevronDown, LayoutGrid } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { themes } from "../lib/themes.js";

function ViewToggle({ onChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const choosedTheme = useSelector((state) => state.themeReducer);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className="cursor-pointer py-2 px-4 rounded-md flex items-center space-x-2 text-sm "
        style={{
          backgroundColor: themes.find((theme) => theme.name === choosedTheme)
            ?.colors[1],
          color: themes.find((theme) => theme.name === choosedTheme)?.textColor,
          border: `1px solid ${
            themes.find((theme) => theme.name === choosedTheme)?.colors[2]
          }`,
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
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <span>View</span>
        <ChevronDown className="h-4 w-4" />
      </div>

      {dropdownOpen && (
        <ul
          className="absolute mt-2 z-10 w-32 rounded-md shadow-lg"
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              ?.colors[1],
            color: themes.find((theme) => theme.name === choosedTheme)
              ?.textColor,
            border: `1px solid ${
              themes.find((theme) => theme.name === choosedTheme)?.colors[2]
            }`,
          }}
        >
          <li
            className="px-4 py-2  cursor-pointer flex items-center space-x-2"
            onClick={() => {
              onChange("grid");
              setDropdownOpen(false);
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
            <LayoutGrid className="h-4 w-4" />
            <span>Grid View</span>
          </li>
          <li
            className="px-4 py-2  cursor-pointer flex items-center space-x-2"
            onClick={() => {
              onChange("list");
              setDropdownOpen(false);
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
            <AlignJustify className="h-4 w-4" />
            <span>List View</span>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ViewToggle;
