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
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function SideBar({ isOpen, setIsOpen }) {
  const user = useSelector(state=>state.userReducer.user);
  return (
    <div className="overflow-hidden h-full flex flex-col">
      <div className="flex-grow">
        <div className="text-center mt-3 flex items-center px-4">
          {isOpen && (
            <h1 className="text-sm">
              Welcome <span className="text-blue-400">
                {user ? user.firstName+" "+user.lastName:"user"}
              </span>
            </h1>
          )}
          {isOpen ?
            <FontAwesomeIcon
              icon={faBarsStaggered}
              className="cursor-pointer text-xl ml-auto"
              onClick={() => setIsOpen(false)}
            />
           
          :
          <FontAwesomeIcon
            icon={faBars}
            className="cursor-pointer text-xl ml-auto"
            onClick={() => setIsOpen(true)}
          />
           }
        </div>
        <ul className="mt-5 text-sm">
          <Link to={'/user'} className="space-x-2 hover:bg-[#21252B] py-3 ps-8 cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faHouse} />
            {isOpen && <span>Home</span>}
          </Link>
          <Link to={'/settings'} className="space-x-2 hover:bg-[#21252B] py-3 ps-8 cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faGears} />
            {isOpen && <span>Settings</span>}
          </Link>
          <Link to="/saves" className="space-x-2 hover:bg-[#21252B] py-3 ps-8 cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faBookmark} />
            {isOpen && <span>My saves</span>}
          </Link>
          <Link to="/groups" className="space-x-2 hover:bg-[#21252B] py-3 ps-8 cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faUserGroup} />
            {isOpen && <span>My Groups</span>}
          </Link>
          <Link to="/languages" className="space-x-2 hover:bg-[#21252B] py-3 ps-8 cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faCode} />
            {isOpen && <span>Languages</span>}
          </Link>
          <Link to="/resources" className="space-x-2 hover:bg-[#21252B] py-3 ps-8 cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faFolderOpen} />
            {isOpen && <span>Resources</span>}
          </Link>
          <Link to="/help" className="space-x-2 hover:bg-[#21252B] py-3 ps-8 cursor-pointer flex items-center">
            <FontAwesomeIcon icon={faCircleQuestion} />
            {isOpen && <span>Help/Support</span>}
          </Link>
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
