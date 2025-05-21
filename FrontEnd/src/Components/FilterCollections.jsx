import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function FilterCollections({ onFilterChange, setFilter }) {
  const [language, setLanguage] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [commentsSort, setCommentsSort] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const languageRef = useRef(null);
  const sortByRef = useRef(null);
  const commentsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target) &&
        sortByRef.current &&
        !sortByRef.current.contains(event.target) &&
        commentsRef.current &&
        !commentsRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (newFilters) => {
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const selectLanguage = (val) => {
    setLanguage(val);
    setOpenDropdown(null);
    handleChange({ language: val, sortBy, commentsSort });
  };

  const selectSortBy = (val) => {
    setSortBy(val);
    setOpenDropdown(null);
    handleChange({ language, sortBy: val, commentsSort });
  };

  const selectCommentsSort = (val) => {
    setCommentsSort(val);
    setOpenDropdown(null);
    handleChange({ language, sortBy, commentsSort: val });
  };

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
  const sortByDisplay = sortBy || "Select";
  const commentsDisplay = commentsSort || "All";
  const languages = useSelector((state) => state.languagesReducer);

  return (
    <div className="w-full bg-gray-900 border-gray-800 border p-4 my-2 text-sm">
      <div className="grid grid-cols-3 gap-4 border-gray-500-gray-700 rounded p-4 my-2 w-full">
        {/* Language Dropdown */}
        <div className="relative" ref={languageRef}>
          <label className="block mb-1 font-semibold">Language</label>
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "language" ? null : "language")
            }
            className="w-full border border-gray-500 rounded p-2 text-left flex justify-between items-center"
            type="button"
          >
            {languageDisplay}
            {openDropdown === "language" ? ArrowUp : ArrowDown}
          </button>
          {openDropdown === "language" && (
            <ul className="absolute custom-scrollbar custom-scroll z-10 w-full border border-gray-500 bg-gray-900 rounded mt-1 max-h-40 overflow-auto shadow-lg">
              {languages.map((lang) => (
                <li
                  key={lang.name}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => selectLanguage(lang.name)}
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative" ref={sortByRef}>
          <label className="block mb-1 font-semibold">Sort By</label>
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "sortBy" ? null : "sortBy")
            }
            className="w-full border border-gray-500 rounded p-2 text-left flex justify-between items-center"
            type="button"
          >
            {sortByDisplay}
            {openDropdown === "sortBy" ? ArrowUp : ArrowDown}
          </button>
          {openDropdown === "sortBy" && (
            <ul className="absolute custom-scrollbar custom-scroll z-10 w-full border border-gray-500 bg-gray-900 rounded mt-1 max-h-40 overflow-auto shadow-lg">
              {[
                { val: "", label: "Select" },
                { val: "newest", label: "Newest" },
                { val: "oldest", label: "Oldest" },
                { val: "mostPopular", label: "Most Popular" },
              ].map(({ val, label }) => (
                <li
                  key={val}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => selectSortBy(val)}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative" ref={commentsRef}>
          <label className="block mb-1 font-semibold">Feedback's</label>
          <button
            onClick={() =>
              setOpenDropdown(
                openDropdown === "commentsSort" ? null : "commentsSort"
              )
            }
            className="w-full border border-gray-500 rounded p-2 text-left flex justify-between items-center"
            type="button"
          >
            {commentsDisplay}
            {openDropdown === "commentsSort" ? ArrowUp : ArrowDown}
          </button>
          {openDropdown === "commentsSort" && (
            <ul className="absolute custom-scrollbar custom-scroll z-10 w-full border border-gray-500 bg-gray-900 rounded mt-1 max-h-40 overflow-auto shadow-lg">
              {[
                { val: "", label: "All" },
                { val: "Most Commented", label: "Most Commented" },
                { val: "Least Commented", label: "Least Commented" },
              ].map(({ val, label }) => (
                <li
                  key={val}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => selectCommentsSort(val)}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            setLanguage("");
            setSortBy("");
            setCommentsSort("");
            handleChange({ language: "", sortBy: "", commentsSort: "" });
            setFilter({ language: "", sortBy: "", commentsSort: "" });
          }}
          className="border border-gray-500 rounded px-4 py-2 mr-2 cursor-pointer hover:bg-gray-700"
        >
          reset filter
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 cursor-pointer"
          onClick={() => {
            setFilter({ language, sortBy, commentsSort });
            handleChange({ language, sortBy, commentsSort });
          }}
        >
          apply filter
        </button>
      </div>
    </div>
  );
}

export default FilterCollections;
