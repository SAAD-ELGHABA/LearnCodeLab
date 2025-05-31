import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Index from "../../Components/collection/index.collection";
import axios from "axios";
import { toast } from "sonner";
import spinner from "../../Assets/spinner.gif";

import { useDispatch, useSelector } from "react-redux";
import { saves } from "../../functions/getMySaves";
import { Search, SlidersHorizontal } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { getCollections } from "../../functions/getCollections";
import FilterCollections from "../../Components/FilterCollections";
import { themes } from "../../lib/themes.js";
function Home() {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const collectionsReducer = useSelector((state) => state.collectionsReducer);
  const [filter, setFilter] = useState({
    language: "",
    sortBy: "",
    commentsSort: "",
  });

  const token = useSelector((state) => state.userReducer.token);
  const [allCollections, setAllCollections] = useState(collectionsReducer);
  const [visibleCollections, setVisibleCollections] = useState(
    allCollections.slice(0, 5)
  );
  const [ITEMS_PER_PAGE, SET_ITEMS_PER_PAGE] = useState(5);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectSuggestionSearchItem, setselectSuggestionSearchItem] =
    useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const dispatch = useDispatch();

  const loadMore = useCallback(() => {
    SET_ITEMS_PER_PAGE(ITEMS_PER_PAGE + 5);
  }, [page, allCollections]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        setShowSuggestions(false);
        setVisibleCollections(allCollections.slice(0, ITEMS_PER_PAGE));
        return;
      }

      const filtered = allCollections.filter(
        (collection) =>
          collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collection.question
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          collection.language.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, allCollections]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (title) => {
    setselectSuggestionSearchItem(title);
    setShowSuggestions(false);

    const filtered = allCollections.filter(
      (collection) =>
        collection.title.toLowerCase().includes(title.toLowerCase()) ||
        collection.question.toLowerCase().includes(title.toLowerCase())
    );
    setVisibleCollections(filtered);
  };

  useEffect(() => {
    const CollectionsPromise = async () => {
      setLoading(true);
      try {
        const response = await getCollections(dispatch);
        setAllCollections(response);
        setVisibleCollections(response.slice(0, 5));
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error loading collections"
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSaves = async () => {
      await saves(dispatch);
    };

    fetchSaves();
    CollectionsPromise();
  }, [dispatch, token]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      if (
        windowHeight + scrollTop >= scrollHeight - 200 &&
        !loading &&
        visibleCollections.length < allCollections.length &&
        searchTerm.trim() === ""
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, visibleCollections, allCollections, searchTerm]);

  useEffect(() => {
    if (page === 1 || searchTerm.trim() !== "") return;
    loadMore();
  }, [page, loadMore, searchTerm]);

  const suggestionRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" min-h-screen p-6">
      <div className="mb-2 text-sm ">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Recently Active Collections
            </h1>
            <p className="text-gray-400 mb-4">
              {allCollections.length} collections total
            </p>
          </div>
          <Link
            to="/add1"
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg flex items-center gap-1 transition-colors"
          >
            <span>Add a collection</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Link>
        </div>

        <div className="flex justify-between gap-4 mb-6 w-full items-center">
          <div
            ref={suggestionRef}
            className="relative flex items-center rounded-lg w-1/3 px-2 justify-between max-w-md"
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
            <input
              type="text"
              className="w-full px-2 py-2 focus:outline-none"
              placeholder="Search collections..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                )?.colors[1],
                color: themes.find((theme) => theme.name === choosedTheme)
                  ?.textColor,
              }}
            />
            <Search className="h-4 w-4 text-gray-400" />
            {showSuggestions && (
              <ul
                className="custom-scrollbar absolute z-10 top-10 right-0 w-full rounded-lg shadow-lg max-h-60 overflow-y-auto"
                style={{
                  backgroundColor: themes.find(
                    (theme) => theme.name === choosedTheme
                  )?.colors[1],
                  color: themes.find((theme) => theme.name === choosedTheme)
                    ?.textColor,
                  border: `1px solid ${
                    themes.find((theme) => theme.name === choosedTheme)
                      ?.colors[2]
                  }`,
                }}
              >
                {suggestions.map((collection) => (
                  <li
                    key={collection.id}
                    onClick={() => handleSuggestionClick(collection.title)}
                    className="px-4 py-2 cursor-pointer"
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
                    <div className="flex items-center space-x-2">
                      <span>
                        <img
                          src={collection?.user?.image}
                          alt="image"
                          className="h-8 w-8 rounded-full"
                        />
                      </span>
                      <span>{collection.title}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className={`py-1.5 px-2.5 rounded cursor-pointer flex items-center space-x-2  ${
              toggleFilter && "text-blue-500 bg-gray-700"
            }`}
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
            onClick={() => setToggleFilter((prev) => !prev)}
          >
            <span>filter</span>
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
      {toggleFilter && (
        <motion.div
          key={toggleFilter}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col"
        >
          <FilterCollections setFilter={setFilter} />
        </motion.div>
      )}
      {visibleCollections.length === 0 && !loading && (
        <p className="text-center text-gray-400">No collections found.</p>
      )}
      {[...collectionsReducer]
        .filter((collection) => {
          const term = searchTerm.trim().toLowerCase();
          if (!term) return true;

          return (
            collection.title
              .toLowerCase()
              .includes(selectSuggestionSearchItem.trim().toLowerCase()) ||
            collection.question
              .toLowerCase()
              .includes(selectSuggestionSearchItem.trim().toLowerCase()) ||
            collection.language
              .toLowerCase()
              .includes(selectSuggestionSearchItem.trim().toLowerCase())
          );
        })
        .filter((collection) => {
          const filters = filter;
          if (!filters) return true;

          const matchLanguage =
            filters.language === "" || collection.language === filters.language;
          return matchLanguage;
        })
        .sort((a, b) => {
          const filters = filter;
          if (!filters) return true;
          if (filter.commentsSort === "Most Commented") {
            return b.feedback?.length - a.feedback?.length;
          } else if (filter.commentsSort === "Least Commented") {
            return a.feedback?.length - b.feedback?.length;
          }
        })
        .sort((a, b) => {
          const filters = filter;
          if (!filters) return true;
          if (filter?.sortBy === "newest") {
            return new Date(b.created_at) - new Date(a.created_at);
          }
          if (filter?.sortBy === "oldest") {
            return new Date(a.created_at) - new Date(b.created_at);
          }
          if (filter?.sortBy === "mostPopular") {
            return b.upvotes - a.upvotes;
          }
          return 0;
        })
        .slice(0, ITEMS_PER_PAGE)
        .map((collection) => (
          <Index key={collection.id} collection={collection} />
        ))}

      {loading && (
        <div className="flex items-center h-20">
          <img src={spinner} alt="Loading..." className="w-8 mx-auto" />
        </div>
      )}
    </div>
  );
}

export default Home;
