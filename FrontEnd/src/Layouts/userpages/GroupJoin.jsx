import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import spinner from "../../Assets/spinner.gif";
import { useDispatch, useSelector } from "react-redux";
import { randomColors } from "../../lib/randomColors.js";
import { motion } from "framer-motion";
import Add from "./Addcollection/Add.jsx";
import {
  ArrowDownToLine,
  BadgeCheck,
  FileKey2,
  FilePlus2,
  Group,
  MessageSquareReply,
  Plus,
  PlusIcon,
  Users,
  UsersRound,
} from "lucide-react";
import { themes } from "../../lib/themes.js";
import ActivityInterface from "../../Components/ActivityInterface.jsx";
function GroupJoin() {
  const choosedTheme = useSelector((state) => state.themeReducer);
  const [memebersCount, setMembersCount] = useState(0);
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
        setMembersCount(res?.data?.members_count);
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
  const [showMembersList, setShowMembersList] = useState(false);
  let timeoutRef = useRef(null);
  const members = GroupJoiningReducer?.users || [];
  const [choosedAct, setChoosedAct] = useState(null);
  console.log(choiceActivity, choosedAct);

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
                    <Users className="w-5 h-5 " />
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
                    <Group className="w-5 h-5 " />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full flex justify-center items-center bg-gray-500">
                    <Users className="w-5 h-5 " />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  {GroupJoiningReducer?.groupName}
                </h1>
                <div
                  className="flex items-center space-x-2 hover:underline relative"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    setShowMembersList(true);
                  }}
                  onMouseLeave={() => {
                    timeoutRef.current = setTimeout(
                      () => setShowMembersList(false),
                      200
                    );
                  }}
                >
                  <UsersRound className="h-4 w-4" />
                  <span>{memebersCount}</span>

                  {showMembersList && GroupJoiningReducer?.Members > 0 && (
                    <div
                      className="absolute top-full left-0 w-auto max-h-40 overflow-y-auto rounded shadow-lg z-50"
                      onMouseEnter={() => {
                        if (timeoutRef.current)
                          clearTimeout(timeoutRef.current);
                        setShowMembersList(true);
                      }}
                      onMouseLeave={() => {
                        timeoutRef.current = setTimeout(
                          () => setShowMembersList(false),
                          200
                        );
                      }}
                    >
                      <ul
                        className="p-2 text-sm"
                        style={{
                          color: theme.textColor,
                          border: `1px solid ${theme.colors[2]}`,
                          backgroundColor: theme.colors[1],
                        }}
                      >
                        {members.map((member) => (
                          <li
                            key={member.id}
                            className="py-1 px-2 cursor-default rounded flex items-center space-x-2 relative"
                          >
                            <div>
                              <img
                                src={member?.image}
                                alt="member-image"
                                className="h-5 w-5 rounded-full"
                              />
                            </div>
                            <div>
                              <p className="font-semibold">
                                {member?.firstName + " " + member?.lastName}
                              </p>
                              <p>{member?.email}</p>
                            </div>
                            {member?.role === "formateur" && (
                              <BadgeCheck className="absolute top-2 right-2 w-4 h-4 text-blue-500" />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {user?.id !== GroupJoiningReducer?.formateurId && (
                  <div className="text-sm">
                    Made By :{" "}
                    <span className="font-semibold">
                      {GroupJoiningReducer?.formateur?.firstName +
                        " " +
                        GroupJoiningReducer?.formateur?.lastName}
                    </span>
                  </div>
                )}
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
          <div>
            {GroupJoiningReducer?.activity_groups?.length > 0 ? (
              GroupJoiningReducer?.activity_groups?.map((a) => (
                <div
                  key={a?.id}
                  className="p-5 my-4 rounded"
                  style={{
                    color: theme.textColor,
                    border: `1px solid ${theme.colors[2]}`,
                  }}
                >
                  <div>
                    <div className="flex w-full my-2 justify-between">
                      <h4 className="opacity-50 text-sm">
                        #Activity N {a?.id}
                      </h4>
                      {GroupJoiningReducer?.formateurId !== user?.id && (
                        <div
                          className="relative inline-block"
                          ref={dropdownRef}
                        >
                          <button
                            className="cursor-pointer flex items-center space-x-2 px-8 py-2 rounded text-sm bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => {
                              setShowActivityList(!showActivityList);
                              setChoosedAct(a?.id);
                            }}
                          >
                            <MessageSquareReply className="h-4 w-4" />
                            <span>Give Your Feedback</span>
                          </button>

                          {showActivityList && choosedAct === a?.id && (
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
                                  themes.find(
                                    (theme) => theme.name === choosedTheme
                                  ).colors[2]
                                }`,
                              }}
                            >
                              <ul className="space-y-1 min-w-49">
                                <li
                                  className="cursor-pointer hover:underline flex space-x-2 items-center py-1 bg-red-500"
                                  onClick={() => {
                                    setChoiceActivity("activity");
                                    setActivityInterface(true);
                                    setInterfaceGroupChoosed(
                                      GroupJoiningReducer?.id
                                    );
                                    setShowActivityList(false);
                                  }}
                                  style={{
                                    borderBottom: `1px solid ${theme.colors[2]}`,
                                  }}
                                >
                                  <PlusIcon />
                                  <span>Activity</span>
                                </li>
                                <li
                                  className="cursor-pointer hover:underline flex space-x-2 items-center py-1"
                                  onClick={() => {
                                    setChoiceActivity("collection");
                                    setActivityInterface(true);
                                    setInterfaceGroupChoosed(
                                      GroupJoiningReducer?.id
                                    );
                                    setShowActivityList(false);
                                  }}
                                >
                                  <FilePlus2 className="h-4 w-4" />
                                  <span>Collection</span>
                                </li>
                              </ul>
                            </div>
                          )}
                          {choosedAct === a?.id &&
                            choiceActivity === "activity" && <div>test</div>}
                        </div>
                      )}
                    </div>
                    <p className="opacity-75">{a?.description}</p>
                    <div className="grid grid-cols-4 gap-4 my-2">
                      {JSON.parse(a?.data)?.files?.map((f, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 w-auto justify-between px-2 py-4 rounded-lg cursor-pointer"
                          style={{
                            backgroundColor: theme.colors[1],
                            color: theme.textColor,
                            border: `1px solid ${theme.colors[2]}`,
                          }}
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = f.url;
                            link.download = f.name || "download";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
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
                          <div>
                            <FileKey2 className="h-5 w-5" />
                          </div>
                          <h3 className="overflow-hidden">
                            {f?.name?.length > 25
                              ? f?.name?.substring(0, 25) + ".."
                              : f?.name}
                          </h3>
                          <div>
                            <ArrowDownToLine className="h-5 w-5" />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex justify-end text-xs opacity-75">
                      {a.created_at
                        ? new Date(a?.created_at).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "just now"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-[40vh] w-full flex justify-center items-center">
                <h2>
                  There is no activities or collections published for the
                  current time
                </h2>
              </div>
            )}
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
