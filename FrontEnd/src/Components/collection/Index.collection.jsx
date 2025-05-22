/* eslint-disable react-hooks/rules-of-hooks */
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
import { handlerate } from "../../functions/handlerate";
import {themes} from '../../lib/themes.js'

// eslint-disable-next-line no-unused-vars
function zIndex({ collection }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rating, setIsRating] = useState({ state: false, type: "" });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Mysaves = useSelector((state) => state.savesReducer);
  const user = useSelector((state) => state.userReducer.user);

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
  const handleRate = (type) => {
    setIsRating({ state: true, type });
    const ratePromise = async () => {
      try {
        const res = await handlerate(type, collection?.id, dispatch);
      } catch (error) {
        console.log(error);
      } finally {
        setIsRating({ state: false, type: "" });
      }
    };
    ratePromise();
  };
  const isCollectionSaved = Mysaves.find(
    (s) => s.collection_id === collection?.id
  );
  const isUp = collection?.rates?.some(
    (r) =>
      r.user_id === user?.id &&
      r.type === "up" &&
      r.collection_id === collection?.id
  );

  const isDown = collection?.rates?.some(
    (r) =>
      r.user_id === user?.id &&
      r.type === "down" &&
      r.collection_id === collection?.id
  );

  return (
    <div className=" rounded-lg p-6 mb-6 border " style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor ,border:themes.find((theme) => theme.name === choosedTheme).colors[2]}} >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-3">{collection?.title}</h2>
        <Link
          to={`/collection/details/${
            collection?.user?.firstName + "-" + collection?.user?.lastName
          }/${collection?.slug}`}
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
      <div className="flex justify-end mb-4">
        <p className="text-gray-500 text-sm ">
          {new Date(collection?.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
          })}{" "}
          at{" "}
          {new Date(collection?.created_at).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="border-t border-gray-600 pt-4">
        <div className="flex flex-wrap justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span>Made By:</span>
            <img
              src={collection?.user?.image}
              alt="image-user"
              className="h-8 w-8 rounded-full"
            />
            <span className="text-gray-300">
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
              <span className="font-semibold text-white mx-2">
                {collection?.feedback?.length}
              </span>
            </span>
            <button
              className={`flex justify-center items-center space-x-2 hover:bg-gray-800 rounded px-4 py-2 cursor-pointer hover:text-blue-500 ${
                isCollectionSaved && "bg-gray-800"
              }`}
              onClick={handleSave}
            >
              {isCollectionSaved ? (
                <div className="flex justify-center items-center space-x-2 text-blue-500">
                  <span>unsave</span>
                  {isLoading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <BookMarked className="h-4 w-4" />
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center space-x-2">
                  <span>save</span>
                  {isLoading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <BookMarked className="h-4 w-4" />
                  )}
                </div>
              )}
            </button>
            <div className="flex space-x-1">
              <button
                className={`flex items-center space-x-2 border px-4 py-1 rounded border-gray-600 hover:shadow-blue-500 shadow cursor-pointer ${
                  isUp && "text-blue-500 "
                }`}
                title="upVote"
                onClick={() => handleRate("up")}
              >
                {rating?.state && rating?.type === "up" ? (
                  <LoaderCircle className="h-3 w-3 animate-spin" />
                ) : (
                  <p>{collection?.upvotes}</p>
                )}

                <FontAwesomeIcon icon={faAnglesUp} />
              </button>
              <button
                className={`flex items-center space-x-2 border px-4 py-1.5 rounded border-gray-600 hover:shadow-red-500 shadow cursor-pointer  ${
                  isDown && "text-red-500"
                }`}
                title="downVote"
                onClick={() => handleRate("down")}
              >
                {rating?.state && rating?.type === "down" ? (
                  <LoaderCircle className="h-3 w-3 animate-spin" />
                ) : (
                  <p>{collection?.downvotes}</p>
                )}
                <FontAwesomeIcon icon={faAnglesDown} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default zIndex;
