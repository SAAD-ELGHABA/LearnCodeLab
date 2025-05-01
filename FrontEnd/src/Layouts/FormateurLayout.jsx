import { useState } from "react";
import NavBar from "../Components/user_components/NavBar";
import { motion } from "framer-motion";
import SideBar from "../Components/SideBar";
import { Outlet } from "react-router-dom";

function FormateurLayout() {
    const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="bg-[#273042]">
      <NavBar formateur={true}/>
    <div className="flex">
    <motion.aside
      initial={{ width: 250 }}
      animate={{ width: isOpen ? 250 : 70 }}
      transition={{ duration: 0.3 }}
      className="sticky top-20 left-0 h-screen bg-[#273042] flex flex-col text-white shadow-lg"
    >
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} formateur={true}/>
    </motion.aside>

    <section
      className={`p-2 text-white transition-all duration-300 ${
        isOpen ? "w-5/6" : "w-6/6"
      }
      bg-[#21252B] m-1 rounded`}
    >
      <Outlet />
    </section>


  </div>
  </div>
  );
}

export default FormateurLayout;
