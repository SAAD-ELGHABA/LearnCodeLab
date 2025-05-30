import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BadgeCheck } from "lucide-react";
import { themes } from "../../lib/themes.js";
import { Link } from "react-router-dom";
import NotificationBell from "../NotificationBell.jsx";
import { useState } from "react";
import PlusMenu from "../PlusMenu.jsx";
import GlobalSearch from "../GlobalSearch.jsx";

// eslint-disable-next-line react/prop-types
function NavBar({ formateur = false }) {
  const user = useSelector((state) => state.userReducer.user);
  const choosedTheme = useSelector((state) => state.themeReducer);
  return (
    <header
      className="  py-4 border-t-1 border-blue-400  sticky top-0 shadow shadow-gray-800 md:w-full "
      style={{
        backgroundColor: themes.find((theme) => theme.name === choosedTheme)
          ?.colors[1],
        zIndex: "999",
        color: themes.find((theme) => theme.name === choosedTheme)?.textColor,
      }}
    >
      <nav className="container mx-auto flex items-center ">
        <Link
          to={"/"}
          className="font-bold text-blue-400 text-xl w-1/4 text-center "
        >
          LearnCodeLab
        </Link>
        <div className="w-2/4 flex items-center justify-center">
          <GlobalSearch />
        </div>
        <div className="w-1/4  flex justify-center items-center space-x-1 text-sm">
          <PlusMenu />

          <NotificationBell />

          <Link
            to={`/profile`}
            className="relative flex items-center space-x-2 cursor-pointer px-4 py-1.5 rounded-full"
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
            {user?.image ? (
              <img
                src={`${user?.image}`}
                alt="user-image"
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="rounded-full cursor-pointer "
              />
            )}
            {formateur && (
              <BadgeCheck className="absolute top-0 right-0 w-4 h-4 text-blue-500" />
            )}
            <div className="text-xs">My Profile</div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
