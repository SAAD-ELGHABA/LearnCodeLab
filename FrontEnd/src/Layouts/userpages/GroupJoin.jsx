import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import spinner from "../../Assets/spinner.gif";
import { useDispatch, useSelector } from "react-redux";
import { randomColors } from "../../lib/randomColors.js";
import { motion } from "framer-motion";
import Add from "./Addcollection/Add.jsx";
import {
  FilePlus2,
  Group,
  Plus,
  PlusIcon,
  Users,
  UsersRound,
} from "lucide-react";
import { themes } from "../../lib/themes.js";
import ActivityInterface from "../../Components/ActivityInterface.jsx";
function GroupJoin() {
  const choosedTheme = useSelector((state) => state.themeReducer);

  const { title, access_key } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const GroupJoiningReducer = useSelector((state) => state.GroupJoiningReducer);
  const user = useSelector((state) => state.userReducer.user);
  const [interfaceGroupChoosed, setInterfaceGroupChoosed] = useState(null);
  const [activityInterface, setActivityInterface] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `/api/check-permission-group/${access_key}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch({
          type: "JOIN_GROUP",
          payload: res.data.group,
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    checkPermission();
  }, [title, access_key]);
  const [choiceActivity, setChoiceActivity] = useState("");
  const [showActivityList, setShowActivityList] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActivityList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const theme = themes.find((theme) => theme.name === choosedTheme);

  return (
    <div>
      {isLoading || !GroupJoiningReducer ? (
        <div className="flex items-center h-[70vh] justify-center ">
          <img src={spinner} alt="Loading..." className="w-8 mx-auto" />
        </div>
      ) : (
        <div>
          <div
            className="flex justify-between items-start rounded p-3"
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
          >
            <div className="flex items-start space-x-4">
              <div>
                {GroupJoiningReducer?.forAllGroups ? (
                  <div
                    className="w-16 h-16 rounded flex justify-center items-center"
                    style={{
                      backgroundColor: randomColors[0],
                    }}
                  >
                    <Users className="w-5 h-5 text-white" />
                  </div>
                ) : GroupJoiningReducer?.selectedGroups &&
                  JSON.parse(GroupJoiningReducer?.selectedGroups).length > 0 ? (
                  <div
                    className="w-16 h-16 rounded flex justify-center items-center"
                    style={{
                      backgroundColor:
                        randomColors[
                          JSON.parse(GroupJoiningReducer?.selectedGroups)[0]
                        ],
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
              <div>
                <h1 className="text-xl font-semibold">
                  {GroupJoiningReducer?.groupName}
                </h1>
                <div className="flex items-center space-x-2">
                  <UsersRound className="h-4 w-4" />
                  <span>{GroupJoiningReducer?.Members}</span>
                </div>
                <div className="flex space-x-1 items-center">
                  {GroupJoiningReducer?.users?.slice(0, 4).map((user) => (
                    <img
                      src={user?.image}
                      className="h-5 w-5 rounded-full"
                      style={{
                        border: `1px solid ${
                          themes.find((theme) => theme.name === choosedTheme)
                            .colors[2]
                        }`,
                      }}
                      alt="img-member"
                      key={user?.id}
                    />
                  ))}

                  {GroupJoiningReducer?.users?.length > 4 && (
                    <div
                      className="h-5 w-5 rounded-full text-xs flex items-center justify-center font-semibold"
                      style={{
                        border: `1px solid ${
                          themes.find((theme) => theme.name === choosedTheme)
                            .colors[2]
                        }`,
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        ).colors[0],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        ).textColor,
                      }}
                    >
                      +{GroupJoiningReducer.users.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              {user?.id === GroupJoiningReducer?.formateurId && (
                <div className="relative inline-block" ref={dropdownRef}>
                  <button
                    className="cursor-pointer flex items-center space-x-1 px-8 py-2 rounded text-sm"
                    onClick={() => setShowActivityList(!showActivityList)}
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
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </button>

                  {showActivityList && (
                    <div
                      className="absolute top-full right-0 mt-1 w-max p-2 rounded shadow z-20"
                      style={{
                        backgroundColor: themes.find(
                          (theme) => theme.name === choosedTheme
                        ).colors[1],
                        color: themes.find(
                          (theme) => theme.name === choosedTheme
                        ).textColor,
                        border: `1px solid ${
                          themes.find((theme) => theme.name === choosedTheme)
                            .colors[2]
                        }`,
                      }}
                    >
                      <ul className="space-y-1 min-w-30">
                        <li
                          className="cursor-pointer hover:underline flex space-x-2 items-center"
                          onClick={() => {
                            setChoiceActivity("activity");
                            setActivityInterface(true);
                            setInterfaceGroupChoosed(GroupJoiningReducer?.id);
                            setShowActivityList(false);
                          }}
                        >
                          <PlusIcon />
                          <span>Activity</span>
                        </li>
                        <li
                          className="cursor-pointer hover:underline flex space-x-2 items-center "
                          onClick={() => {
                            setChoiceActivity("collection");
                            setActivityInterface(true);
                            setInterfaceGroupChoosed(GroupJoiningReducer?.id);
                            setShowActivityList(false);
                          }}
                        >
                          <FilePlus2 className="h-4 w-4" />
                          <span>Collection</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {activityInterface && choiceActivity === "activity" && (
        <ActivityInterface
          setActivityInterface={setActivityInterface}
          group={GroupJoiningReducer}
        />
      )}
      {activityInterface && choiceActivity === "collection" && (
        <div
          className="flex flex-col h-full w-[100vw] justify-center fixed top-0 right-0 items-center rounded-lg shadow-lg bg-[#21252b5e]"
          style={{
            color: theme.textColor,
            zIndex: 1005,
          }}
          onClick={() => setChoiceActivity("")}
        >
          <div
            className="w-[90%] h-[90%] p-6 rounded relative overflow-y-scroll custom-scrollbar"
            style={{
              backgroundColor: theme.colors[1],
              color: theme.textColor,
              border: `1px solid ${theme.colors[2]}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-sm "
            >
              <Add isActivity={true} group_id={GroupJoiningReducer?.id} />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupJoin;
