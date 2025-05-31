import { useEffect, useRef, useState } from "react";
import {
  Group,
  HousePlug,
  LoaderCircle,
  PenLine,
  Plus,
  Users,
  X,
} from "lucide-react";
import { groupstagiaire } from "../../functions/groupstagiaire";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { themes } from "../../lib/themes.js";
import { randomColors } from "../../lib/randomColors.js";
import { hover } from "framer-motion";
import ActivityInterface from "../../Components/ActivityInterface.jsx";
import spinner from "../../Assets/spinner.gif";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Groups({ formateur = false }) {
  const [searchGroupTerm, setSearchGroupTerm] = useState("");

  const choosedTheme = useSelector((state) => state.themeReducer);
  const user = useSelector((state) => state.userReducer.user);
  if (user?.role === "formateur") {
    formateur = true;
  }
  const dispatch = useDispatch();
  const groupsReducer = useSelector((state) => state.groupReducer);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [forAllGroups, setForAllGroups] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoadingGrps, setIsLoadingGrps] = useState(false);
  useEffect(() => {
    setIsLoadingGrps(true);
    const resGroup = async () => {
      try {
        const res = await axios.get(`/api/get-group/${user.id}`);
        if (res.status >= 200 && res.status < 300) {
          dispatch({
            type: "GET_GROUPS",
            payload: res.data.groups,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoadingGrps(false);
        }, 1000);
      }
    };
    resGroup();
  }, []);
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      groupstagiaire(dispatch);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchTerm, dispatch]);

  const handleSelect = (name) => {
    if (!selectedGroups.includes(name)) {
      setSelectedGroups((prev) => [...prev, name]);
    }
    setSearchTerm("");
    setDropdownVisible(false);
  };

  const removeGroup = (nameToRemove) => {
    setSelectedGroups((prev) => prev.filter((name) => name !== nameToRemove));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      groupName,
      selectedGroups,
      forAllGroups,
      formateurId: user.id,
    };
    try {
      const response = await axios.post(`/api/create-group`, formData);
      if (response.status >= 200 && response.status < 300) {
        toast.success(response.data.message);
        dispatch({
          type: "GET_GROUPS",
          payload: response.data.groups,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const groupsStagiaireReducer = useSelector(
    (state) => state.groupsStagiaireReducer
  );
  const [activityInterface, setActivityInterface] = useState(false);
  const [interfaceGroupChoosed, setInterfaceGroupChoosed] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  const nav = useNavigate();

  const joinGroup = async (group) => {
    setIsJoining(true);
    try {
      console.log("joining...");
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsJoining(false);
        nav(`/group/${group?.groupName}/${group?.access_key}`);
      }, 5000);
    }
  };
  return isLoadingGrps ? (
    <div className="flex items-center h-[70vh] justify-center ">
      <img src={spinner} alt="Loading..." className="w-8 mx-auto" />
    </div>
  ) : (
    <div>
      {formateur && (
        <div
          className="mx-8 rounded p-4"
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              .colors[1],
            color: themes.find((theme) => theme.name === choosedTheme)
              .textColor,
          }}
        >
          <div className="flex justify-start items-center space-x-2 text-xl">
            <h1>Create a group</h1>
            <PenLine className="w-5 h-5" />
          </div>

          <form className="my-4 flex gap-4 flex-wrap" onSubmit={handleSubmit}>
            <div className="flex flex-col w-1/3">
              <label className="text-sm  mb-1">Group Name</label>
              <input
                type="text"
                placeholder="group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="py-2 px-2.5 outline-none  rounded"
                style={{
                  backgroundColor: themes.find(
                    (theme) => theme.name === choosedTheme
                  ).colors[1],
                  color: themes.find((theme) => theme.name === choosedTheme)
                    .textColor,
                  border: `1px solid ${
                    themes.find((theme) => theme.name === choosedTheme)
                      .colors[2]
                  }`,
                }}
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col w-1/3 relative z-0" ref={dropdownRef}>
              <label className="text-sm  mb-1">Groups to Associate</label>
              <input
                type="text"
                placeholder="group to associate"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 px-2.5 outline-none  rounded"
                style={{
                  backgroundColor: themes.find(
                    (theme) => theme.name === choosedTheme
                  ).colors[1],
                  color: themes.find((theme) => theme.name === choosedTheme)
                    .textColor,
                  border: `1px solid ${
                    themes.find((theme) => theme.name === choosedTheme)
                      .colors[2]
                  }`,
                }}
                disabled={isLoading}
              />

              {dropdownVisible && groupsStagiaireReducer.length > 0 && (
                <ul
                  className="absolute z-5 w-full mt-1 rounded top-16 shadow-md max-h-40 overflow-y-auto custom-scrollbar"
                  style={{
                    backgroundColor: themes.find(
                      (theme) => theme.name === choosedTheme
                    ).colors[1],
                    color: themes.find((theme) => theme.name === choosedTheme)
                      .textColor,
                  }}
                >
                  {groupsStagiaireReducer
                    .filter((gstr) => gstr.name.includes(searchTerm))
                    .map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelect(item.name)}
                        className="px-4 py-2 cursor-pointer"
                        style={{
                          backgroundColor: themes.find(
                            (theme) => theme.name === choosedTheme
                          ).colors[1],
                          color: themes.find(
                            (theme) => theme.name === choosedTheme
                          ).textColor,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = themes.find(
                            (theme) => theme.name === choosedTheme
                          ).colors[0];
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = themes.find(
                            (theme) => theme.name === choosedTheme
                          ).colors[1];
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
            <div>
              {selectedGroups.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2 items-center h-full">
                  {selectedGroups.map((group, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        ).colors[1],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        ).textColor,
                      }}
                    >
                      {group}
                      <button type="button" onClick={() => removeGroup(group)}>
                        <X className="w-3 h-3 text-gray-600 hover:text-blue-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex w-1/3 items-center space-x-2 ">
              <label className="text-sm">For All Groups</label>
              <input
                type="checkbox"
                checked={forAllGroups}
                onChange={(e) => setForAllGroups(e.target.checked)}
                disabled={isLoading}
                style={{
                  backgroundColor: themes.find(
                    (theme) => theme.name === choosedTheme
                  ).colors[1],
                  color: themes.find((theme) => theme.name === choosedTheme)
                    .textColor,
                }}
              />
            </div>

            <div className="flex justify-end items-center w-full">
              <button
                type="submit"
                className={`bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 cursor-pointer text-white ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Associating..." : "Associate"}
              </button>
            </div>
          </form>

          {isLoading && (
            <div className="absolute inset-0 bg-opacity-25 flex justify-center items-center">
              <div className="loader border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}
      <div className=" mx-8">
        {!formateur && (
          <div className=" my-4 flex items-center space-x-2">
            <h1 className="text-xl font-semibold">My Groups</h1>
            <Users className="h-6 w-6" />
          </div>
        )}
        <div className="my-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search groups..."
            value={searchGroupTerm}
            onChange={(e) => setSearchGroupTerm(e.target.value)}
            className="py-2 px-3 w-full max-w-md rounded border outline-none"
            style={{
              backgroundColor: themes.find(
                (theme) => theme.name === choosedTheme
              ).colors[1],
              color: themes.find((theme) => theme.name === choosedTheme)
                .textColor,
              border: `1px solid ${
                themes.find((theme) => theme.name === choosedTheme).colors[2]
              }`,
            }}
          />
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">Total group</h3>
            <span>{groupsReducer.length}</span>
            <Users className="h-5 w-5" />
          </div>
        </div>
        {groupsReducer.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {groupsReducer
              .filter((grp) =>
                grp.groupName
                  .toLowerCase()
                  .includes(searchGroupTerm.toLowerCase())
              )
              .map((grp) => (
                <div
                  key={grp.id}
                  className=" text-sm  p-4 rounded my-2"
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
                  <div className="flex space-x-4 py-2 ">
                    <div>
                      {grp?.forAllGroups ? (
                        <div
                          className="w-16 h-16 rounded flex justify-center items-center"
                          style={{
                            backgroundColor: randomColors[0],
                          }}
                        >
                          <Users className="w-5 h-5 text-white" />
                        </div>
                      ) : grp?.selectedGroups &&
                        JSON.parse(grp?.selectedGroups).length > 0 ? (
                        <div
                          className="w-16 h-16 rounded flex justify-center items-center"
                          style={{
                            backgroundColor:
                              randomColors[JSON.parse(grp?.selectedGroups)[0]],
                          }}
                        >
                          <Group className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full flex justify-center items-center bg-gray-500">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between w-full">
                      <h1 className=" text-xl">{grp.groupName}</h1>
                      {!grp?.forAllGroups && (
                        <div className="flex space-x-2 items-center">
                          <label
                            htmlFor="selectedGroupsDropdown"
                            className="text-sm font-medium"
                          >
                            For Groups:
                          </label>

                          {JSON.parse(grp?.selectedGroups || "[]").length >
                          1 ? (
                            <select
                              id="selectedGroupsDropdown"
                              className="text-sm px-2 py-1"
                            >
                              {JSON.parse(grp?.selectedGroups || "[]").map(
                                (id) => {
                                  const matchedGroup =
                                    groupsStagiaireReducer?.find(
                                      (grpstg) => grpstg?.id === Number(id)
                                    );

                                  return matchedGroup ? (
                                    <option
                                      key={matchedGroup.id}
                                      value={matchedGroup.id}
                                    >
                                      {matchedGroup.name}
                                    </option>
                                  ) : null;
                                }
                              )}
                            </select>
                          ) : (
                            <span className="text-sm px-2 py-1">
                              {
                                groupsStagiaireReducer?.find(
                                  (grpstg) =>
                                    grpstg?.id ===
                                    Number(
                                      JSON.parse(grp?.selectedGroups || "[]")[0]
                                    )
                                )?.name
                              }
                            </span>
                          )}
                        </div>
                      )}

                      {grp?.forAllGroups ? (
                        <div className="mt-6">
                          <span className="text-blue-500 animate-pulse underline">
                            For All Groups
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full ">
                    <p className="text-xs text-gray-500">
                      {grp?.created_at &&
                        new Date(grp.created_at).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                    </p>
                    <div className="flex space-x-2 items-center">
                      {formateur && (
                        <button
                          className="cursor-pointer flex items-center space-x-1px-4 py-2 rounded"
                          onClick={() => {
                            setActivityInterface(true);
                            setInterfaceGroupChoosed(grp?.id);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Activity</span>
                        </button>
                      )}
                      <button
                        className="bg-green-400 text-white px-4 min-w-20 flex items-center justify-center py-2 cursor-pointer  rounded"
                        onClick={() => {
                          joinGroup(grp);
                          setInterfaceGroupChoosed(grp?.id);
                        }}
                      >
                        {isJoining && interfaceGroupChoosed === grp?.id ? (
                          <LoaderCircle className="animate-spin h-5 w-5" />
                        ) : (
                          <div className="flex items-center space-x-1">
                            <HousePlug className="h-4 w-4" />
                            <span>Join</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                  {activityInterface && grp?.id === interfaceGroupChoosed && (
                    <ActivityInterface
                      setActivityInterface={setActivityInterface}
                      group={grp}
                    />
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-100">
            <h1 className="text-xl font-semibold">
              There is no group created at this moment
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Groups;
