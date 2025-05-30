import axios from "axios";
import {
  ChevronDown,
  CloudUpload,
  Download,
  Eye,
  Search,
  Share2,
} from "lucide-react";
import spinner from "../../Assets/spinner.gif";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewToggle from "../../Components/ViewToggle";
import { themes } from "../../lib/themes.js";
function Resources() {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const resourcesReducer = useSelector((state) => state.resourcesReducer);
  const dispatch = useDispatch();

  const [previewFile, setPreviewFile] = useState(null);
  const [itemSearch, setItemSearch] = useState("");
  const [viewType, setViewType] = useState("grid"); // 'grid' or 'list'

  const handlePreview = (resource) => {
    setPreviewFile(resource);
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (url) => {
    if (navigator.share) {
      const fullUrl = `http://localhost:8000/storage/${url}`;
      try {
        await navigator.share({
          title: "Shared File",
          url: fullUrl,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const responsefun = async () => {
      try {
        const res = await axios.get("/api/get-resources", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.status >= 200 && res.status <= 300) {
          dispatch({
            type: "GET_RESOURCES",
            payload: res.data.resources,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    responsefun();
  }, [dispatch]);
  return (
    <div className="p-4 ">
      {isLoading ? (
        <div className="flex items-center h-[70vh] justify-center ">
          <img src={spinner} alt="Loading..." className="w-8 mx-auto" />
        </div>
      ) : (
        <div className="mx-8">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold">Resources</h1>
            <CloudUpload className="h-7 w-7" />
          </div>

          <div className="my-4 flex items-center justify-between">
            <div
              className="flex items-center  rounded w-1/3"
              style={{
                color: themes.find((theme) => theme.name === choosedTheme)
                  ?.textColor,
                border: `1px solid ${
                  themes.find((theme) => theme.name === choosedTheme)?.colors[2]
                }`,
              }}
            >
              <span
                className="p-2"
                style={{
                  backgroundColor: themes.find(
                    (theme) => theme.name === choosedTheme
                  )?.colors[0],
                  color: themes.find((theme) => theme.name === choosedTheme)
                    ?.textColor,
                  borderRight: `1px solid ${
                    themes.find((theme) => theme.name === choosedTheme)
                      ?.colors[2]
                  }`,
                }}
              >
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                className="w-full px-2 py-2 bg-transparent focus:outline-none"
                placeholder="Search collections..."
                onChange={(e) => setItemSearch(e.target.value)}
                style={{
                  color: themes.find((theme) => theme.name === choosedTheme)
                    ?.textColor,
                }}
              />
            </div>
            <ViewToggle onChange={(viewType) => setViewType(viewType)} />
          </div>

          {resourcesReducer?.length > 0 && (
            <div
              className={
                viewType === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                  : "space-y-1"
              }
            >
              {resourcesReducer
                .filter((item) =>
                  item?.title.toUpperCase().includes(itemSearch.toUpperCase())
                )
                .map((resource) => {
                  const isImage = [
                    "jpg",
                    "jpeg",
                    "png",
                    "gif",
                    "webp",
                  ].includes(resource.type);
                  const isPdf = resource.type === "pdf";

                  const fullUrl = `http://localhost:8000/storage/${resource?.file}`;

                  return (
                    <div
                      key={resource.id}
                      className={`relative rounded-lg shadow hover:shadow-lg transition-all duration-300 px-2 py-1 ${
                        viewType === "list" ? "flex space-x-4 items-center" : ""
                      }`}
                      style={{
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.colors[1],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        )?.textColor,
                        border: `1px solid ${
                          themes.find((theme) => theme.name === choosedTheme)
                            ?.colors[2]
                        }`,
                      }}
                    >
                      <div
                        className={`${
                          viewType === "list" ? "h-20 w-32" : "h-32"
                        } flex items-center justify-center rounded-md overflow-hidden`}
                        style={{
                          backgroundColor: themes.find(
                            (theme) => theme.name === choosedTheme
                          )?.colors[0],
                        }}
                      >
                        {isImage ? (
                          <img
                            src={fullUrl}
                            alt={resource.title}
                            className="object-cover h-full w-full"
                          />
                        ) : isPdf ? (
                          <embed
                            src={fullUrl}
                            type="application/pdf"
                            className="h-full w-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full w-full text-sm  font-medium">
                            <span>{resource.type.toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                      <div className="w-full">
                        <div
                          className={`${
                            viewType === "list"
                              ? "flex items-center justify-between w-full"
                              : "mt-2"
                          }`}
                        >
                          <div className="text-sm truncate">
                            {resource.title}
                          </div>

                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className="p-1 rounded-full  cursor-pointer"
                              onClick={() => handlePreview(resource)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  themes.find(
                                    (theme) => theme.name === choosedTheme
                                  )?.colors[2];
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  themes.find(
                                    (theme) => theme.name === choosedTheme
                                  )?.colors[1];
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </span>

                            <span
                              className="p-1 rounded-full  cursor-pointer"
                              onClick={() =>
                                handleDownload(fullUrl, resource.title)
                              }
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  themes.find(
                                    (theme) => theme.name === choosedTheme
                                  )?.colors[2];
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  themes.find(
                                    (theme) => theme.name === choosedTheme
                                  )?.colors[1];
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </span>

                            <span
                              className="p-1 rounded-full cursor-pointer"
                              onClick={() => handleShare(resource.file)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  themes.find(
                                    (theme) => theme.name === choosedTheme
                                  )?.colors[2];
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  themes.find(
                                    (theme) => theme.name === choosedTheme
                                  )?.colors[1];
                              }}
                            >
                              <Share2 className="h-4 w-4" />
                            </span>
                          </div>
                        </div>
                        {viewType === "list" && (
                          <div className="text-xs text-gray-400 w-full flex justify-end mt-4">
                            {resource?.created_at &&
                              new Date(resource.created_at).toLocaleString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                          </div>
                        )}
                      </div>

                      {previewFile && previewFile.id === resource.id && (
                        <div
                          className="fixed inset-0 bg-[#00000079] bg-opacity-50 flex justify-center items-center z-50"
                          style={{ zIndex: 1005 }}
                          onClick={() => setPreviewFile(null)}
                        >
                          <div
                            className="bg-white h-[90%] w-[90%] overflow-hidden overflow-y-scroll p-6 rounded-lg shadow-lg relative custom-scrollbar"
                            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                          >
                            <button
                              className="absolute top-2 right-2 text-red-500"
                              onClick={() => setPreviewFile(null)}
                            >
                              ✖
                            </button>
                            <h2 className="text-lg font-semibold mb-4">
                              {previewFile.title}
                            </h2>
                            {["jpg", "jpeg", "png", "gif", "webp"].includes(
                              previewFile.type
                            ) ? (
                              <img
                                src={`http://localhost:8000/storage/${previewFile?.file}`}
                                alt={previewFile.title}
                                className="w-full"
                              />
                            ) : previewFile.type === "pdf" ? (
                              <embed
                                src={`http://localhost:8000/storage/${previewFile?.file}`}
                                type="application/pdf"
                                width="100%"
                                height={"100%"}
                              />
                            ) : (
                              <div className="h-100 w-full flex items-center justify-center">
                                <p className="text-gray-700">
                                  Preview not supported for this file.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Resources;
