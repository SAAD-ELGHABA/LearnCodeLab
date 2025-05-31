<<<<<<< HEAD
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
          className="font-bold text-xl w-1/4 text-center  
             bg-gradient-to-r from-blue-100 to-blue-800 bg-clip-text text-transparent"
        >
          LearnCodeLab
        </Link>
=======
import {
  faBell,
  faPlus,
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BadgeCheck } from "lucide-react";
import {themes} from '../../lib/themes.js'


// eslint-disable-next-line react/prop-types
function NavBar({formateur=false}) {
  const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
  return (
    <header className="  py-4 border-t-1 border-blue-400  sticky top-0 shadow shadow-gray-800 md:w-full " style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,zIndex:'999',color:themes.find((theme) => theme.name === choosedTheme).textColor}} >
      <nav className="container mx-auto flex items-center ">
        <div className="font-bold text-blue-400 text-xl w-1/4 text-center ">
          LearnCodeLab
        </div>
        <div className="w-2/4 flex items-center">
          <div className="w-1/3 space-x-4 text-sm">
            <a href="#" className="">
              Latest Posts
            </a>
            <a href="#" className="">
              Collections
            </a>
          </div>
          <div className="w-2/3 flex items-center rounded-md p-2 text-sm" style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor ,
            border: `1px solid ${themes.find((theme) => theme.name === choosedTheme).colors[2]}` 
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Tap to search"
              className="bg-transparent border-none outline-none w-full"
                style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}
            />
          </div>
        </div>
        <div className="w-1/4  flex justify-center space-x-1 text-sm">
          <FontAwesomeIcon
            icon={faPlus}
            className=" p-3 rounded-full  cursor-pointer "
            style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}
            onMouseEnter={
              (e)=>{
                e.currentTarget.style.backgroundColor = themes.find((theme) => theme.name === choosedTheme).colors[0]
              }
              
            }
            onMouseLeave={
              (e)=>{
                e.currentTarget.style.backgroundColor = "transparent"
              }
              
            }
          />
          <FontAwesomeIcon
            icon={faBell}
            className=" p-3 rounded-full cursor-pointer"
            style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}
            onMouseEnter={
              (e)=>{
                e.currentTarget.style.backgroundColor = themes.find((theme) => theme.name === choosedTheme).colors[0]
              }
              
            }
            onMouseLeave={
              (e)=>{
                e.currentTarget.style.backgroundColor = "transparent"
              }
              
            }
          />
          <FontAwesomeIcon
            icon={faQuestion}
            className=" p-3 rounded-full cursor-pointer"
            style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}
            onMouseEnter={
              (e)=>{
                e.currentTarget.style.backgroundColor = themes.find((theme) => theme.name === choosedTheme).colors[0]
              }
              
            }
            onMouseLeave={
              (e)=>{
                e.currentTarget.style.backgroundColor = "transparent"
              }
              
            }
          />
          <div className="relative">
          <FontAwesomeIcon
            icon={faUser}
            className=" p-3 rounded-full cursor-pointer "
          />
          {
            formateur && 
          <BadgeCheck className="absolute top-0 right-0 w-4 h-4 text-blue-500"/>
          }
>>>>>>> 27c02272435c323488386150c779909c9f511c29

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
