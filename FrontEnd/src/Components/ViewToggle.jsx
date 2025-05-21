import { AlignJustify, ChevronDown, LayoutGrid } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function ViewToggle({ onChange }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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
        className="cursor-pointer py-2 px-4 bg-gray-800 text-white rounded-md flex items-center space-x-2 text-sm hover:bg-gray-700"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <span>View</span>
        <ChevronDown className="h-4 w-4" />
      </div>

      {dropdownOpen && (
        <ul className="absolute mt-2 z-10 w-32 bg-gray-800 text-white rounded-md shadow-lg">
          <li
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            onClick={() => {
              onChange("grid");
              setDropdownOpen(false);
            }}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Grid View</span>
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
            onClick={() => {
              onChange("list");
              setDropdownOpen(false);
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
