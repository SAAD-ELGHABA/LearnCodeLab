import { useState } from "react";
import NavBar from "../Components/user_components/NavBar";
import { motion } from "framer-motion";
import SideBar from "../Components/SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { themes } from "../lib/themes.js";

function FormateurLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const choosedTheme = useSelector((state) => state.themeReducer);
  return (
    <div
      style={{
        backgroundColor: themes.find((theme) => theme.name === choosedTheme)
          .colors[0],
        color: themes.find((theme) => theme.name === choosedTheme).textColor,
      }}
    >
      <NavBar formateur={true} />
      <div className="flex">
        <motion.aside
          initial={{ width: 250 }}
          animate={{ width: isOpen ? 250 : 70 }}
          transition={{ duration: 0.3 }}
          className="sticky top-18 left-0 h-screen  flex flex-col shadow-lg"
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              .colors[1],
            color: themes.find((theme) => theme.name === choosedTheme)
              .textColor,
          }}
        >
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} formateur={true} />
        </motion.aside>

        <section
          className={`p-2 transition-all duration-300 ${
            isOpen ? "w-5/6" : "w-6/6"
          }
           m-1 rounded`}
          style={{
            backgroundColor: themes.find((theme) => theme.name === choosedTheme)
              .colors[0],
          }}
        >
          <Outlet />
        </section>
      </div>
    </div>
  );
}

export default FormateurLayout;
