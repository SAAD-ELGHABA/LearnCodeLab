import React, { useEffect, useRef, useState } from "react";
import { themes } from "../lib/themes.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { BellRing, ChevronLeft, Code, File, Users } from "lucide-react";

function GlobalSearch() {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [results, setResults] = useState([]);
  const menuRef = useRef();
  const globalSearchResultReducer = useSelector(
    (state) => state.globalSearchResultReducer
  );
  const initialRoutes = [
    {
      url: "/user",
      label: "Home",
      description:
        "Your dashboard where you can explore the latest uploaded collections and updates.",
    },
    {
      url: "/saves",
      label: "My Saves",
      description:
        "Access all the collections, resources, or content you’ve saved for later viewing.",
    },
    {
      url: "/groups",
      label: "My Groups",
      description:
        "Manage and interact with the groups you’ve joined or created on the platform.",
    },
    {
      url: "/languages",
      label: "Languages",
      description:
        "Browse all available programming languages and filter content accordingly.",
    },
    {
      url: "/resources",
      label: "Resources",
      description:
        "Explore a wide range of educational and technical resources available on the platform.",
    },
    {
      url: "/settings",
      label: "Settings",
      description:
        "Update your profile, preferences, and notification settings from this section.",
    },
    {
      url: "/help",
      label: "Help",
      description:
        "Find answers to common questions or contact support if you need assistance.",
    },
  ];

  const normalizeSearchResults = (data) => {
    const results = [];

    if (data.Groups) {
      results.push(
        ...data.Groups.map((item) => ({
          type: "Group",
          label: item.groupName,
          id: item.id,
          original: item,
        }))
      );
    }

    if (data.collections) {
      results.push(
        ...data.collections.map((item) => ({
          type: "Collection",
          label: item.title,
          id: item.id,
          original: item,
        }))
      );
    }

    if (data.languages) {
      results.push(
        ...data.languages.map((item) => ({
          type: "Language",
          label: item.name,
          id: item.id,
          original: item,
        }))
      );
    }

    if (data.user) {
      results.push({
        type: "User",
        label: `${data.user.firstName} ${data.user.lastName}`,
        id: data.user.id,
        original: data.user,
      });
    }
    if (data.myNotifications) {
      results.push(
        ...data.myNotifications.map((item) => ({
          type: "myNotifications",
          label: item.title,
          id: item.id,
          original: item,
        }))
      );
    }
    if (data.mySaves) {
      results.push(
        ...data.mySaves.map((item) => ({
          type: "mySaves",
          label: item.id,
          id: item.id,
          original: item,
        }))
      );
    }
    if (data.resources) {
      results.push(
        ...data.resources.map((item) => ({
          type: "resources",
          label: item.title,
          id: item.id,
          original: item,
        }))
      );
    }

    return results;
  };
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const dispatch = useDispatch();
  const handleClick = async () => {
    setClicked(true);
    if (!hasLoaded) {
      setLoading(true);
      try {
        const res = await axios.get("/api/search-global", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch({
          type: "GET_RESULT_GLOBAL_SEARCH",
          payload: normalizeSearchResults(res.data),
        });
      } catch (err) {
        console.error("Error loading data", err);
      }
      setLoading(false);
    }
  };
  const [isNotFound, setIsNotFound] = useState(false);
  useEffect(() => {
    if (searchItem?.trim()) {
      const hasResults = globalSearchResultReducer.some(
        (item) =>
          typeof item?.label === "string" &&
          item.label.toLowerCase().includes(searchItem.trim().toLowerCase())
      );
      setIsNotFound(!hasResults);
    } else {
      setIsNotFound(false);
    }
  }, [globalSearchResultReducer, searchItem]);

  return (
    <div
      ref={menuRef}
      className="w-2/3 flex flex-col rounded-md p-2 text-sm relative"
      style={{
        backgroundColor: themes.find((t) => t.name === choosedTheme)?.colors[1],
        color: themes.find((t) => t.name === choosedTheme)?.textColor,
        border: `1px solid ${
          themes.find((t) => t.name === choosedTheme)?.colors[2]
        }`,
      }}
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5  mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Tap to search"
          className="bg-transparent border-none outline-none w-full"
          onClick={handleClick}
          style={{
            backgroundColor: "transparent",
            color: themes.find((t) => t.name === choosedTheme)?.textColor,
          }}
          onChange={(e) => {
            handleClick();
            setSearchItem(e.target.value);
          }}
          value={searchItem}
        />
      </div>

      {clicked && (
        <div
          className="w-full custom-scrollbar overflow-y-scroll max-h-[70vh]  absolute top-full left-0 mt-2 shadow rounded-md z-50"
          style={{
            backgroundColor: themes.find((t) => t.name === choosedTheme)
              ?.colors[1],
          }}
        >
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : initialRoutes.length > 0 ? (
            <div>
              <div className="flex flex-col ">
                {!searchItem &&
                  initialRoutes?.map((Route) => (
                    <Link
                      key={Route?.label}
                      to={Route?.url}
                      onClick={() => {
                        setSearchItem("");
                        setClicked(false);
                      }}
                      className="flex items-start space-x-1 px-3 py-2 "
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
                      <div>
                        <ChevronLeft />
                      </div>
                      <div>
                        <h1 className="text-sm font-medium ">{Route?.label}</h1>
                        <p className="opacity-75 text-xs">
                          {Route?.description}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
              {!isNotFound && (
                <hr
                  style={{
                    border: `
                  1px solid
                    ${themes.find((t) => t.name === choosedTheme)?.colors[2]}
                `,
                  }}
                />
              )}
              <div className="flex flex-col ">
                {!isNotFound ? (
                  searchItem &&
                  globalSearchResultReducer
                    .filter(
                      (item) =>
                        typeof item?.label === "string" &&
                        item.label
                          .toLowerCase()
                          .includes(searchItem.trim().toLowerCase())
                    )
                    .map((item, index) => (
                      <Link
                        onClick={() => {
                          setClicked(false);
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
                        key={index}
                        to={
                          item?.type === "User"
                            ? "/profile"
                            : item?.type === "Language"
                            ? "/languages"
                            : item?.type === "Collection"
                            ? `/collection/details/${
                                item?.original?.user?.firstName +
                                "-" +
                                item?.original?.user?.lastName
                              }/${item?.original?.slug}`
                            : item?.type === "resources"
                            ? "/resources"
                            : "/user"
                        }
                        className="block p-2 rounded transition"
                      >
                        {item?.type === "User" ? (
                          <div className="flex items-center space-x-2">
                            <img
                              src={item?.original?.image}
                              alt=""
                              className="h-7 w-7 rounded-full"
                            />
                            <div>
                              <h1 className="text-sm font-semibold">
                                {item?.type === "User" && "You"}
                              </h1>
                              <div className="text-xs">{item?.label}</div>
                            </div>
                          </div>
                        ) : item?.type === "Language" ? (
                          <div className="flex items-center space-x-2">
                            <div>
                              <Code className="h-5 w-5" />
                            </div>
                            <div>
                              <h1 className="text-sm font-semibold">
                                {item?.original?.name}
                              </h1>
                              <p className="text-xs">
                                {item?.original?.description?.length >= 20
                                  ? item?.original?.description?.substring(
                                      0,
                                      50
                                    ) + ".."
                                  : item?.original?.description}
                              </p>
                            </div>
                          </div>
                        ) : item?.type === "Collection" ? (
                          <div className="flex items-center space-x-2">
                            <img
                              src={item?.original?.user?.image}
                              alt=""
                              className="h-7 w-7 rounded-full"
                            />
                            <div>
                              <h1 className="text-sm font-semibold">
                                {item?.original?.user?.firstName +
                                  " " +
                                  item?.original?.user?.lastName}
                              </h1>
                              <div className="text-xs">
                                {item?.original?.title}
                              </div>
                            </div>
                          </div>
                        ) : item?.type === "myNotifications" ? (
                          <div className="flex items-center space-x-2">
                            <div>
                              <BellRing className="h-5 w-5 text-yellow-300" />
                            </div>
                            <div>
                              <h1 className="text-sm font-semibold">
                                {item?.original?.title}
                              </h1>
                              <p className="text-xs">
                                {item?.original?.message?.length >= 20
                                  ? item?.original?.message?.substring(0, 50) +
                                    ".."
                                  : item?.original?.message}
                              </p>
                            </div>
                          </div>
                        ) : item?.type === "resources" ? (
                          <div className="flex items-center space-x-2">
                            <div>
                              <File className="h-5 w-5 " />
                            </div>
                            <div>
                              <h1 className="text-sm font-semibold">
                                {item?.original?.type}
                              </h1>
                              <p className="text-xs">
                                {item?.original?.title?.length >= 20
                                  ? item?.original?.title?.substring(0, 50) +
                                    ".."
                                  : item?.original?.title}
                              </p>
                            </div>
                          </div>
                        ) : item?.type === "Group" ? (
                          <div className="flex items-center space-x-2">
                            <div>
                              <Users className="h-5 w-5 " />
                            </div>
                            <div>
                              <h1 className="text-sm font-semibold">
                                {item?.original?.groupName}
                              </h1>
                              <p className="text-xs">
                                This Group Created At :{" "}
                                {item?.original?.created_at
                                  ? new Date(
                                      item?.original?.created_at
                                    ).toLocaleString("en-US", {
                                      month: "long",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "just now"}
                              </p>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </Link>
                    ))
                ) : (
                  <div className="p-4 text-center text-sm">
                    No results found
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-sm">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
