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
<<<<<<< HEAD
import { handlerate } from "../../functions/handlerate";
import { themes } from "../../lib/themes.js";
import { motion, AnimatePresence } from "framer-motion";
=======
import {themes} from '../../lib/themes.js'
>>>>>>> 27c02272435c323488386150c779909c9f511c29

// eslint-disable-next-line no-unused-vars
function zIndex({ collection, setMyCollections = null }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [rating, setIsRating] = useState({ state: false, type: "" });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Mysaves = useSelector((state) => state.savesReducer);
<<<<<<< HEAD
  const user = useSelector((state) => state.userReducer.user);

  const choosedTheme = useSelector((state) => state.themeReducer);
=======
  const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
>>>>>>> 27c02272435c323488386150c779909c9f511c29
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
        const res = await handlerate(
          type,
          collection?.id,
          dispatch,
          setMyCollections,
          user
        );
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
<<<<<<< HEAD
              <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 text-sm text-gray-500"
          >

    <div
      className=" rounded-lg p-6 mb-6 border "
      style={{
        backgroundColor: themes.find((theme) => theme.name === choosedTheme)
          .colors[1],
        color: themes.find((theme) => theme.name === choosedTheme).textColor,
        border: themes.find((theme) => theme.name === choosedTheme).colors[2],
      }}
    >
=======
    <div className=" rounded-lg p-6 mb-6 border " style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor ,border:themes.find((theme) => theme.name === choosedTheme).colors[2]}} >
>>>>>>> 27c02272435c323488386150c779909c9f511c29
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
<<<<<<< HEAD
        <span className="font-medium text-lg">{collection.question}</span>
=======
        The question:
        <span className="font-medium text-lg ms-2">{collection.question}</span>
>>>>>>> 27c02272435c323488386150c779909c9f511c29
      </p>

      <div className="text-sm  mb-4">
        <p>{collection.description}</p>
      </div>
<<<<<<< HEAD
      <div className="flex justify-end mb-4">
        <p className=" text-sm ">
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
      <div
        className="pt-4"
        style={{
          borderTop: `1px solid ${
            themes.find((theme) => theme.name === choosedTheme).colors[2]
          }`,
        }}
      >
        <div className="flex flex-wrap justify-between text-sm ">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <img
              src={collection?.user?.image}
              alt="image-user"
              className="h-8 w-8 rounded-full"
            />
            <span className="">
              {collection.user.firstName} {collection.user.lastName}
            </span>
            <span
              className="font-medium px-2 py-1 rounded"
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                ).colors[2],
                color: themes.find((theme) => theme.name === choosedTheme)
                  .textColor,
=======

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
>>>>>>> 27c02272435c323488386150c779909c9f511c29
              }}
            >
              {collection.language}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            {/* <span>Members: 39</span> */}
            <span
              style={{
                color: themes.find((theme) => theme.name === choosedTheme)
                  .textColor,
              }}
            >
              Feedback:
              <span className="font-semibold mx-2">
<<<<<<< HEAD
                {collection?.feedback?.length}
              </span>
            </span>
            <button
              className={`flex justify-center items-center space-x-2 rounded px-4 py-2 cursor-pointer `}
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                ).colors[2],
                color: themes.find((theme) => theme.name === choosedTheme)
                  .textColor,
              }}
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
                className={`flex items-center space-x-2 px-4 py-1 rounded hover:shadow-blue-500 shadow cursor-pointer ${
                  isUp && "text-blue-500 "
                }`}
                style={{
                  border: `1px solid ${
                    themes.find((theme) => theme.name === choosedTheme)
                      .colors[2]
                  }`,
                }}
                title="upVote"
                onClick={() => handleRate("up")}
              >
                {rating?.state && rating?.type === "up" ? (
                  <LoaderCircle className="h-3 w-3 animate-spin" />
                ) : (
                  <p>{collection?.upvotes}</p>
                )}

=======
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
>>>>>>> 27c02272435c323488386150c779909c9f511c29
                <FontAwesomeIcon icon={faAnglesUp} />
              </button>
              <button
                className={`flex items-center space-x-2 px-4 py-1.5 rounded  hover:shadow-red-500 shadow cursor-pointer  ${
                  isDown && "text-red-500"
                }`}
                style={{
                  border: `1px solid ${
                    themes.find((theme) => theme.name === choosedTheme)
                      .colors[2]
                  }`,
                }}
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
          </motion.div>
  );
}

export default zIndex;
