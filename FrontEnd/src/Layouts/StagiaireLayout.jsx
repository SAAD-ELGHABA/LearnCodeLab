import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/user_components/NavBar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Chat_bot from "../Components/Chat_bot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { getCollections } from "../functions/getCollections";
import { saves } from "../functions/getMySaves";
import { useSelector } from "react-redux";
import { themes } from "../lib/themes.js";
import axios from "axios";
import { logout } from "../redux/action.js";
import ConfirmAlert from "../Components/ConfirmAlert.jsx";
function StagiaireLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [ishovering, setIshovering] = useState(false);
  const [ChatToggle, setChatToggle] = useState(false);
  const dispatch = useDispatch();
  const choosedTheme = useSelector((state) => state.themeReducer);
  const [toggleLogOut, setToggleLogOut] = useState(false);
  const nav = useNavigate();
  const token = useSelector((state) => state.userReducer.token);
  useEffect(() => {
    const CollectionsPromise = async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await getCollections(dispatch);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error loading collections"
        );
        console.error(error);
      }
    };

    const fetchSaves = async () => {
      await saves(dispatch);
    };

    fetchSaves();
    CollectionsPromise();
  }, [dispatch]);
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

  return (
    <div
      style={{
        backgroundColor: themes.find((theme) => theme.name === choosedTheme)
          .colors[0],
        color: themes.find((theme) => theme.name === choosedTheme).textColor,
      }}
    >
      <NavBar />

      <div className="flex">
        <motion.aside
          initial={{ width: 250 }}
          animate={{ width: isOpen ? 250 : 70 }}
          transition={{ duration: 0.3 }}
          className="fixed top-18 left-0 h-screen z-40 flex flex-col shadow-lg"
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              .colors[1],
            color: themes.find((theme) => theme.name === choosedTheme)
              .textColor,
          }}
        >
          <SideBar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setToggleLogOut={setToggleLogOut}
          />
        </motion.aside>

        <section
          className="transition-all duration-300 p-2 m-1 rounded min-h-screen w-full overflow-hidden"
          style={{
            marginLeft: isOpen ? 250 : 70, // match sidebar width
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              .colors[0],
          }}
        >
          <Outlet />
        </section>

        {ChatToggle && (
          <section
            className={`fixed w-screen h-screen top-0 z-50 flex bg-[#00000081] justify-center items-center shadow-lg transition-all duration-300 ${
              isOpen ? "w-1/3" : "w-0"
            }`}
            style={{
              color: themes.find((theme) => theme.name === choosedTheme)
                .textColor,
              border: `1px solid ${
                themes.find((theme) => theme.name === choosedTheme).borderColor
              }`,
              zIndex: 1005,
            }}
            onClick={() => setChatToggle(false)}
          >
            <Chat_bot />
          </section>
        )}
      </div>

      <button
        onClick={() => setChatToggle(!ChatToggle)}
        className="fixed bottom-4  right-4  px-4 py-4 rounded cursor-pointer "
        title="Open The Chat AI"
        style={{ zIndex: 1005 }}
      >
        <div className="flex justify-between items-center space-x-2">
          {ishovering && (
            <p className="pt-1 text-blue-500 text-sm">
              {ChatToggle
                ? "Close The Chat Assistant"
                : "Open The Chat Assistant"}
            </p>
          )}
          <FontAwesomeIcon
            onMouseEnter={() => setIshovering(true)}
            onMouseLeave={() => setIshovering(false)}
            icon={faRobot}
            className="text-blue-500 hover:text-blue-600 text-lg drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          />
        </div>
      </button>
      {toggleLogOut && (
        <ConfirmAlert
          message={"Are You Sure .. you wanna log out !!"}
          onCancel={() => {
            setToggleLogOut(false);
          }}
          onConfirm={handleLogOut}
          isLogout={isLogOut}
        />
      )}
    </div>
  );
}

export default StagiaireLayout;
