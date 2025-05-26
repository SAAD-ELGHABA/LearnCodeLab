import { Outlet } from "react-router-dom";
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
import {  useSelector } from "react-redux";
import axios from "axios";
import {themes} from '../lib/themes.js'
function StagiaireLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [ishovering, setIshovering] = useState(false);
  const [ChatToggle, setChatToggle] = useState(false);
  const dispatch = useDispatch();
  const choosedTheme = useSelector(
    (state) => state.themeReducer
  );
    
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
  return (
    <div style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[0] ,color:themes.find((theme) => theme.name === choosedTheme).textColor }}>
      <NavBar />

      <div className="flex">
        <motion.aside
          initial={{ width: 250 }}
          animate={{ width: isOpen ? 250 : 70 }}
          transition={{ duration: 0.3 }}
          className="sticky top-18 left-0 h-screen flex flex-col shadow-lg"
          style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[1],color:themes.find((theme) => theme.name === choosedTheme).textColor }}
        >
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </motion.aside>

        <section
          className={`p-2 transition-all duration-300 ${
            isOpen ? "w-5/6" : "w-6/6"
          }
           m-1 rounded`}
           style={{ backgroundColor: themes.find((theme) => theme.name === choosedTheme).colors[0] }}
        >
          <Outlet />
        </section>

        {ChatToggle && (
          <aside
            className={`w-2/6 border-r-gray-500 fixed top-0 right-0 bg-[#21252B] h-screen transition-transform duration-1000 shadow-lg ${
              ChatToggle ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Chat_bot />
          </aside>
        )}
      </div>

      <button
        onClick={() => setChatToggle(!ChatToggle)}
        className="fixed bottom-4  right-4  px-4 py-4 rounded cursor-pointer "
        title="Open The Chat AI"
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
    </div>
  );
}

export default StagiaireLayout;
