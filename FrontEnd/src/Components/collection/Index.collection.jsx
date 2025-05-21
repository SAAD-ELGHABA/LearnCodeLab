import {
  faAnglesDown,
  faAnglesUp,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { BookMarked, LoaderCircle } from "lucide-react";
import { AddSave } from "../../functions/AddSave";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {themes} from '../../lib/themes.js'

// eslint-disable-next-line no-unused-vars
function zIndex({ collection }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Mysaves = useSelector((state) => state.savesReducer);
  const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
  const handleSave = () => {
    setIsLoading(true);
    const savePromise = async () => {
      try {
        const res = await AddSave(collection.id, dispatch);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    savePromise();
  };
  const isCollectionSaved = Mysaves.find(
    (s) => s.collection_id === collection.id
  );

  return (
    <div className=" rounded-lg p-6 mb-6 border " style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor ,border:themes.find((theme) => theme.name === choosedTheme).colors[2]}} >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-3">{collection.title}</h2>
        <Link
          to={`/collection/details/${
            collection.user.firstName + "-" + collection.user.lastName
          }/${collection.slug}`}
          className="flex space-x-1 text-sm items-center hover:text-blue-500 cursor-pointer"
        >
          <span>Figure Out</span>
          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
        </Link>
      </div>
      <p className=" mb-4">
        The question:
        <span className="font-medium text-lg ms-2">{collection.question}</span>
      </p>

      <div className="text-sm  mb-4">
        <p>{collection.description}</p>
      </div>

      <div className=" pt-4">
        <div className="flex flex-wrap justify-between text-sm ">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span>Made By:</span>
            <span className="">
              {collection.user.firstName} {collection.user.lastName}
            </span>
            <span className="font-medium px-2 py-1 rounded"
              style={{
                backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[2],
                color: themes.find((theme) => theme.name === choosedTheme).textColor,
              }}
            >
              {collection.language}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            {/* <span>Members: 39</span> */}
            <span>
              Feedback:
              <span className="font-semibold mx-2">
                {collection?.feedback.length}
              </span>
            </span>
<button
  className="flex justify-center items-center space-x-2 rounded px-4 py-2 cursor-pointer transition-colors duration-200"
  onClick={handleSave}
  style={{
    backgroundColor: isCollectionSaved
      ? themes.find((theme) => theme.name === choosedTheme)?.colors[2]
      : "transparent",
    color: isCollectionSaved ? "#3b82f6" : "inherit", 
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor =
      themes.find((theme) => theme.name === choosedTheme)?.colors[1];
    e.currentTarget.style.color = "#3b82f6"; 
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = isCollectionSaved
      ? themes.find((theme) => theme.name === choosedTheme)?.colors[2]
      : "transparent";
    e.currentTarget.style.color = isCollectionSaved ? "#3b82f6" : "inherit";
  }}
>
  <div
    className={`flex justify-center items-center space-x-2 ${
      isCollectionSaved ? "text-blue-500" : ""
    }`}
  >
    <span>{isCollectionSaved ? "unsave" : "save"}</span>
    {isLoading ? (
      <LoaderCircle className="h-4 w-4 animate-spin" />
    ) : (
      <BookMarked className="h-4 w-4" />
    )}
  </div>
</button>

            <div className="flex space-x-4">
              <span className="flex items-center space-x-2 border px-2 py-1 rounded border-gray-600 hover:shadow-blue-500 shadow cursor-pointer">
                <p>Up</p>
                <FontAwesomeIcon icon={faAnglesUp} />
              </span>
              <span className="flex items-center space-x-2 border px-2 py-1 rounded border-gray-600 hover:shadow-red-500 shadow cursor-pointer">
                <p>down</p>
                <FontAwesomeIcon icon={faAnglesDown} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default zIndex;
