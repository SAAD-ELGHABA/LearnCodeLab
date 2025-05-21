import axios from "axios";
import {
  BookMarked,
  BookX,
  CodeXml,
  FolderX,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saves } from "../../functions/getMySaves";
import { AddSave } from "../../functions/AddSave";
import { Link } from "react-router-dom";
import { themes } from "../../lib/themes.js";
function Saves() {
  const Mysaves = useSelector((state) => state.savesReducer);
  const collectionsReducer = useSelector((state) => state.collectionsReducer);
  const MysavesColections = collectionsReducer.filter((clt) =>
    Mysaves.some((sv) => clt.id === sv.collection_id)
  );
  const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSaves = async () => {
      await saves(dispatch);
    };

    fetchSaves();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedclctId, setselectedclctId] = useState(null);
  const handleSave = (collection) => {
    setselectedclctId(collection.id);
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
  return (
    <div>
      <div className="mx-8 my-4">
        <h1 className="text-xl font-semibold flex items-center  space-x-2">
          <BookMarked />
          <span>My Saves ({Mysaves.length}) </span>
        </h1>
      </div>
      {MysavesColections.length > 0 ? (
        <div className="grid lg:grid-cols-3 w-5/6 gap-2 mx-auto">
          {MysavesColections.map((save) => (
            <div
              key={save.id}
              className="shadow-md p-4 rounded-lg flex flex-col justify-between h-64"
              style={{
                backgroundColor: themes.find(
                  (theme) => theme.name === choosedTheme
                ).colors[1],
                color: themes.find((theme) => theme.name === choosedTheme)
                  .textColor,
                border: themes.find((theme) => theme.name === choosedTheme)
                  .colors[2],
              }}
            >
              <div>
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {save.title.length > 80
                    ? save.title.substring(0, 80) + "..."
                    : save.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-5 h-25">
                  {save.description}
                </p>
              </div>
              <div>
                <span className="flex items-center space-x-2  py-2 ps-2">
                  <CodeXml className="h-4 w-4" />
                  <span>{save.language}</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-sm space-x-2 mt-4">
                <button
                  onClick={() => handleSave(save)}
                  className={`  self-start px-4 py-2 rounded  ${
                    !isLoading && "cursor-pointer"
                  }`}
                  style={{
                    backgroundColor: themes.find(
                      (theme) => theme.name === choosedTheme
                    ).colors[2],
                    color: themes.find((theme) => theme.name === choosedTheme)
                      .textColor,
                  }}
                  title="Unsave this collection"
                >
                  {isLoading && selectedclctId === save.id ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="flex items-center space-x-2">
                      <BookX className="h-4 w-4" />
                      <span>Unsave</span>
                    </span>
                  )}
                </button>
                <Link
                  to={`/collection/details/${
                    save.user.firstName + "-" + save.user.lastName
                  }/${save.slug}`}
                  className="flex space-x-1 text-sm items-center hover:text-blue-500 cursor-pointer"
                >
                  <span>See Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 flex flex-col justify-center space-y-2 mx-auto items-center w-100 h-100">
          <BookX className="h-20 w-20 " />
          <p>No saves collection has added to this section </p>
          <Link to={'/user'} className="hover:text-blue-500 hover:underline">Figure Out</Link>
        </div>
      )}
    </div>
  );
}

export default Saves;
