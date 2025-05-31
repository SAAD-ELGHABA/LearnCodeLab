import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { themes } from "../lib/themes.js";
function FilterCollections({ onFilterChange, setFilter }) {
  const choosedTheme = useSelector((state) => state.themeReducer);
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
    <div
      className="w-full p-4 my-2 text-sm"
      style={{
        backgroundColor: themes.find((theme) => theme.name === choosedTheme)
          ?.colors[1],
        color: themes.find((theme) => theme.name === choosedTheme)?.textColor,
        border: `1px solid ${
          themes.find((theme) => theme.name === choosedTheme)?.colors[2]
        }`,
      }}
    >
      <div className="grid grid-cols-3 gap-4 rounded p-4 my-2 w-full">
        {/* Language Dropdown */}
        <div className="relative" ref={languageRef}>
          <label className="block mb-1 font-semibold">Language</label>
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === "language" ? null : "language")
            }
            className="w-full rounded p-2 text-left flex justify-between items-center"
            type="button"
            style={{
              backgroundColor: themes.find(
                (theme) => theme.name === choosedTheme
              )?.colors[1],
              color: themes.find((theme) => theme.name === choosedTheme)
                ?.textColor,
              border: `1px solid ${
                themes.find((theme) => theme.name === choosedTheme)?.colors[2]
              }`,
            }}
          >
            {languageDisplay}
            {openDropdown === "language" ? ArrowUp : ArrowDown}
          </button>
          {openDropdown === "language" && (
            <ul
              className="absolute custom-scrollbar custom-scroll z-10 w-full rounded mt-1 max-h-40 overflow-auto shadow-lg"
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                )?.colors[1],
                color: themes.find((theme) => theme.name === choosedTheme)
                  ?.textColor,
                border: `1px solid ${
                  themes.find((theme) => theme.name === choosedTheme)?.colors[2]
                }`,
              }}
            >
              {languages.map((lang) => (
                <li
                  key={lang.name}
                  className="px-4 py-2  cursor-pointer"
                  onClick={() => selectLanguage(lang.name)}
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
            className="w-full rounded p-2 text-left flex justify-between items-center"
            type="button"
            style={{
              backgroundColor: themes.find(
                (theme) => theme.name === choosedTheme
              )?.colors[1],
              color: themes.find((theme) => theme.name === choosedTheme)
                ?.textColor,
              border: `1px solid ${
                themes.find((theme) => theme.name === choosedTheme)?.colors[2]
              }`,
            }}
          >
            {sortByDisplay}
            {openDropdown === "sortBy" ? ArrowUp : ArrowDown}
          </button>
          {openDropdown === "sortBy" && (
            <ul
              className="absolute custom-scrollbar custom-scroll z-10 w-full  rounded mt-1 max-h-40 overflow-auto shadow-lg"
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                )?.colors[1],
                color: themes.find((theme) => theme.name === choosedTheme)
                  ?.textColor,
                border: `1px solid ${
                  themes.find((theme) => theme.name === choosedTheme)?.colors[2]
                }`,
              }}
            >
              {[
                { val: "", label: "Select" },
                { val: "newest", label: "Newest" },
                { val: "oldest", label: "Oldest" },
                { val: "mostPopular", label: "Most Rated" },
              ].map(({ val, label }) => (
                <li
                  key={val}
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => selectSortBy(val)}
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
            className="w-full rounded p-2 text-left flex justify-between items-center"
            type="button"
            style={{
              backgroundColor: themes.find(
                (theme) => theme.name === choosedTheme
              )?.colors[1],
              color: themes.find((theme) => theme.name === choosedTheme)
                ?.textColor,
              border: `1px solid ${
                themes.find((theme) => theme.name === choosedTheme)?.colors[2]
              }`,
            }}
          >
            {commentsDisplay}
            {openDropdown === "commentsSort" ? ArrowUp : ArrowDown}
          </button>
          {openDropdown === "commentsSort" && (
            <ul
              className="absolute custom-scrollbar custom-scroll z-10 w-full rounded mt-1 max-h-40 overflow-auto shadow-lg"
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                )?.colors[1],
                color: themes.find((theme) => theme.name === choosedTheme)
                  ?.textColor,
                border: `1px solid ${
                  themes.find((theme) => theme.name === choosedTheme)?.colors[2]
                }`,
              }}
            >
              {[
                { val: "", label: "All" },
                { val: "Most Commented", label: "Most Commented" },
                { val: "Least Commented", label: "Least Commented" },
              ].map(({ val, label }) => (
                <li
                  key={val}
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => selectCommentsSort(val)}
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
          className=" rounded px-4 py-2 mr-2 cursor-pointer "
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              ?.colors[1],
            color: themes.find((theme) => theme.name === choosedTheme)
              ?.textColor,
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
