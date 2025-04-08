import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/user_components/NavBar";
import { useState } from "react";
import { motion } from "framer-motion";
import Chat_bot from "../Components/Chat_bot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
function StagiaireLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [ishovering, setIshovering] = useState(false);
  const [ChatToggle, setChatToggle] = useState(false);

  return (
    <div className="bg-[#273042]">
      <NavBar />

      <div className="flex">
        <motion.aside
          initial={{ width: 250 }}
          animate={{ width: isOpen ? 250 : 70 }}
          transition={{ duration: 0.3 }}
          className="sticky top-20 left-0 h-screen bg-[#273042] flex flex-col text-white shadow-lg"
        >
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </motion.aside>

        <section
          className={`p-2 text-white transition-all duration-300 ${
            isOpen ? "w-5/6" : "w-6/6"
          }
          bg-[#21252B] m-1 rounded`}
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
        {ishovering && <p className="pt-1 text-blue-500 text-sm">
        {
          ChatToggle ?"Close The Chat Assistant":"Open The Chat Assistant"
        }  
        </p>}
        <FontAwesomeIcon
          onMouseEnter={() => setIshovering(true)}
          onMouseLeave={()=>setIshovering(false)}
          icon={faRobot}
          className="text-blue-500 hover:text-blue-600 text-lg drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        />
        </div>
      </button>
    </div>
  );
}

export default StagiaireLayout;
