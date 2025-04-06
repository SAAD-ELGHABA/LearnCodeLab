import {
  faArrowRightFromBracket,
  faBars,
  faBarsStaggered,
  faBookmark,
  faCircleQuestion,
  faCode,
  faFolderOpen,
  faGears,
  faHouse,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/action.js";
import { useState } from "react";
import ConfirmAlert from "../Components/ConfirmAlert.jsx";
// eslint-disable-next-line react/prop-types
function SideBar({ isOpen, setIsOpen }) {
  const user = useSelector((state) => state.userReducer.user);
  const location = useLocation();
  const nav = useNavigate();
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();

  const [isLogOut, setIsLogout] = useState(false);
  const handleLogOut = async () => {
    setIsLogout("loading");
    try {
      const response = await axios.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200) {
        dispatch(logout());
        setTimeout(() => {
          setIsLogout(false);
          nav("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setTimeout(() => {
        setIsLogout(false);
      }, 2000);
    }
  };
  const links = [
    { to: "/user", icon: faHouse, label: "Home" },
    { to: "/settings", icon: faGears, label: "Settings" },
    { to: "/saves", icon: faBookmark, label: "My saves" },
    { to: "/groups", icon: faUserGroup, label: "My Groups" },
    { to: "/languages", icon: faCode, label: "Languages" },
    { to: "/resources", icon: faFolderOpen, label: "Resources" },
    { to: "/help", icon: faCircleQuestion, label: "Help/Support" },
  ];

  return (
    <div className="overflow-hidden h-full flex flex-col">
      <div className="flex-grow">
        <div className="text-center mt-3 flex items-center px-4">
          {isOpen && (
            <h1 className="text-sm">
              Welcome{" "}
              <span className="text-blue-400">
                {user ? `${user.firstName} ${user.lastName}` : "user"}
              </span>
            </h1>
          )}
          {isOpen ? (
            <FontAwesomeIcon
              icon={faBarsStaggered}
              className="cursor-pointer text-xl ml-auto"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className="cursor-pointer text-xl ml-auto"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
        <ul className="mt-5 text-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`space-x-2 py-3 ps-8 cursor-pointer flex items-center ${
                location.pathname === link.to
                  ? "bg-[#21252B]"
                  : "hover:bg-[#21252B]"
              }`}
            >
              <FontAwesomeIcon icon={link.icon} />
              {isOpen && <span>{link.label}</span>}
            </Link>
          ))}
        </ul>
      </div>

      <div className="mb-20">
        <ul>
          <li
            onClick={() => {
              setIsLogout(true);
            }}
            className="space-x-2 hover:bg-gray-800 hover:text-blue-400 py-3 ps-8 cursor-pointer flex items-center"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>
      {isLogOut && (
        <ConfirmAlert
          message={"Are You Sure .. you wanna log out !!"}
          onCancel={() => {
            setIsLogout(false);
          }}
          onConfirm={handleLogOut}
          isLogout={isLogOut}
        />
      )}
    </div>
  );
}

export default SideBar;
