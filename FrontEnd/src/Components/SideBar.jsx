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

// eslint-disable-next-line react/prop-types
function SideBar({ isOpen, setIsOpen }) {
  const user = useSelector((state) => state.userReducer.user);
  const location = useLocation(); 

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
          <li className="space-x-2 hover:bg-[#21252B] py-3 ps-8 cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
