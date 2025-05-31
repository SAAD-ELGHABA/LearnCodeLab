// src/components/PlusMenu.jsx
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { themes } from "../lib/themes.js";
import {
  FilePlus2,
  ListPlus,
  MessageCircleCode,
  MessageCirclePlus,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { toast } from "sonner";
import Add from "../Layouts/userpages/Addcollection/Add.jsx";
function PlusMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const choosedTheme = useSelector((state) => state.themeReducer);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [activityInterface, setActivityInterface] = useState(false);
  const theme = themes.find((theme) => theme.name === choosedTheme);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="cursor-pointer p-2.5 rounded-full"
        style={{
          backgroundColor: themes.find((theme) => theme.name === choosedTheme)
            ?.colors[1],
          color: themes.find((theme) => theme.name === choosedTheme)?.textColor,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = themes.find(
            (theme) => theme.name === choosedTheme
          )?.colors[0];
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Plus className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="absolute top-full right-0 w-48 bg-white shadow-lg rounded-md  z-50"
          style={{
            backgroundColor: theme?.colors[1],
            color: theme?.textColor,
            border: `1px solid ${theme?.colors[2]}`,
          }}
        >
          <ul className="text-sm">
            <button
              className="flex w-full items-center space-x-2 hover:text-blue-500 px-4 py-3 cursor-pointer rounded"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme?.colors[0];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={() => setActivityInterface(true)}
            >
              <FilePlus2 className="h-4 w-4" />
              <span>New Collection</span>
            </button>
            <Link
              to={"/user"}
              className="flex items-center w-full cursor-pointer space-x-2 hover:text-blue-500 px-4 py-3 rounded"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme?.colors[0];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={() => {
                toast.info(
                  "You must go and explore the recent collections then give you feedback",
                  {
                    icon: (
                      <MessageCirclePlus className="text-blue-500 h-4 w-4" />
                    ),
                  }
                );
                setOpen(false);
              }}
            >
              <MessageCircleCode className="h-4 w-4" />
              <span>New Feedback</span>
            </Link>
            <Link
              to={"/groups"}
              className="flex items-center space-x-2 hover:text-blue-500 px-4 py-3 rounded"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme?.colors[0];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={() => {
                toast.info(
                  "You must go and explore the recent groups then participate to a group then make your activity",
                  {
                    icon: <ListPlus className="text-blue-500 h-4 w-4" />,
                  }
                );
                setOpen(false);
              }}
            >
              <ListPlus className="h-4 w-4" />
              <span>New Activity</span>
            </Link>
          </ul>
          {activityInterface && (
            <div
              className="flex flex-col h-full w-[100vw] justify-center fixed top-0 right-0 items-center rounded-lg shadow-lg bg-[#21252b5e]"
              style={{
                color: theme.textColor,
                zIndex: 1005,
              }}
              onClick={() => setActivityInterface(false)}
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
                  <Add isActivity={true} />
                </motion.div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlusMenu;
