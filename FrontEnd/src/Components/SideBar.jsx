import {
  Home,
  Settings,
  Bookmark,
  Users,
  Code,
  Folder,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/action.js";
import { useState } from "react";
import ConfirmAlert from "../Components/ConfirmAlert.jsx";
import {themes} from '../lib/themes.js'

// eslint-disable-next-line react/prop-types
function SideBar({ isOpen, setIsOpen ,formateur=false}) {
    const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
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
    { to: formateur ? "/formateur":"/user", icon: <Home className="h-4 w-4" />, label: "Home" },
    { to: formateur ? "/saves-formateur":"/saves", icon: <Bookmark className="h-4 w-4" />, label: "My saves" },
    { to: formateur ? "/formateur-groups":"/groups", icon: <Users className="h-4 w-4" />, label: `${formateur ? "Groups":"My Groups"}` },
    !formateur && { to: "/languages", icon: <Code className="h-4 w-4" />, label: "Languages" },
    { to: formateur ? "/resources-formateur":"/resources", icon: <Folder className="h-4 w-4" />, label: "Resources" },
    { to: formateur ? "/settings-formateur":"/settings", icon: <Settings className="h-4 w-4" />, label: "Settings" },
    !formateur && { to: "/help", icon: <HelpCircle className="h-4 w-4" />, label: "Help/Support" },
  ];

  return (
    <div className="overflow-hidden h-full flex flex-col ">
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
            <span
              className="cursor-pointer text-xl ml-auto"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </span>
          ) : (
            <span
              className="cursor-pointer text-xl ml-auto"
              onClick={() => setIsOpen(true)}
            >
              &#9776;
            </span>
          )}
        </div>

        <ul className="mt-5 text-sm">
          {links.map((link) => (
            link &&
<Link
  key={link.to}
  to={link.to}
  className="space-x-2 py-3 ps-8 cursor-pointer flex items-center transition-colors duration-200"
  style={{
    backgroundColor:
      link.to === location.pathname
        ? themes.find((theme) => theme.name === choosedTheme)?.colors[0]
        : "transparent",
  }}
  onMouseEnter={(e) => {
    if (link.to !== location.pathname) {
      e.currentTarget.style.backgroundColor =
        themes.find((theme) => theme.name === choosedTheme)?.colors[0];
    }
  }}
  onMouseLeave={(e) => {
    if (link.to !== location.pathname) {
      e.currentTarget.style.backgroundColor = "transparent";
    }
  }}
>
  {link.icon}
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
            className="space-x-2  py-3 ps-8 cursor-pointer flex items-center"
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
           
          >
            <LogOut className="h-4 w-4" />
            {isOpen && <span className="">Logout</span>}
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
