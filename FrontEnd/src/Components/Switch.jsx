import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
function DarkLightModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setIsDarkMode(savedMode === "dark");
    } else {
      setIsDarkMode(false);
    }
  }, []);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex items-center justify-start space-x-4">
      <span>light</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="sr-only"
        />
        <span className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full"></span>
        <span
          className={`text-black ${
            isDarkMode ? "translate-x-6" : "translate-x-0"
          } absolute left-0 top-0 bottom-0 flex items-center justify-center w-6 h-6 transition-transform duration-300 bg-white rounded-full`}
        >
          {isDarkMode ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </span>
      </label>
      <span>dark</span>
    </div>
  );
}

export default DarkLightModeToggle;
