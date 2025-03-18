import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/user_components/NavBar";
import { useState } from "react";
import { motion } from "framer-motion";

function StagiaireLayout() {
  const [isOpen, setIsOpen] = useState(true);

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
            isOpen ? "w-4/6" : "w-5/6"
          } bg-[#21252B] m-1 rounded`}
        >
          <Outlet />
        </section>

        <aside className="w-1/6 bg-[#21252B] h-screen">test</aside>
      </div>
    </div>
  );
}

export default StagiaireLayout;
