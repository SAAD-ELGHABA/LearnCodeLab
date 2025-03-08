import {
  faArrowRightFromBracket,
  faBell,
  faPlus,
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/action";

function NavBar() {
  const nav = useNavigate();
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    if (confirm("log out !")) {
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
        nav("/");
      }
    }
  };
  return (
    <header className="bg-[#21252B] py-4 border-t-1 border-blue-400 text-white">
      <nav className="container mx-auto flex items-center ">
        <div className="font-bold text-blue-400 text-xl w-1/4 text-center">
          LearnCodeLab
        </div>
        <div className="w-2/4 flex items-center">
          <div className="w-1/3 space-x-4 text-sm">
            <a href="#" className="text-gray-300 hover:text-white">
              Latest Posts
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Collections
            </a>
          </div>
          <div className="w-2/3 flex items-center bg-gray-700 rounded-md p-2 text-sm">
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
              className="bg-transparent border-none outline-none text-gray-300 w-full"
            />
          </div>
        </div>
        <div className="w-1/4  flex justify-center space-x-1 text-sm">
          <FontAwesomeIcon
            icon={faPlus}
            className="hover:bg-gray-700 p-3 rounded-full  cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faBell}
            className="hover:bg-gray-700 p-3 rounded-full cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faQuestion}
            className="hover:bg-gray-700 p-3 rounded-full cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faUser}
            className="hover:bg-gray-700 p-3 rounded-full cursor-pointer"
          />
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="hover:bg-gray-700 p-3 rounded-full cursor-pointer"
            onClick={handleLogOut}
          />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
