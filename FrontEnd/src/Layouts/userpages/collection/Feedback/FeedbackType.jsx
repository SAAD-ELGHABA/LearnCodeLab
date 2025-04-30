import { Code, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars, react/prop-types
function FeedbackType({setTypeFeedback}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="border border-blue-500 rounded px-4 py-2 text-xs cursor-pointer hover:shadow-blue-500 shadow transition duration-300 flex items-center gap-2"
        >
          Add Your Feedback
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 border-gray-300 rounded shadow-lg z-50">
            <ul className="flex flex-col text-sm">
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer flex items-center gap-2"
                onClick={() => {
                    setTypeFeedback("commentaire");
                    setIsDropdownOpen(false);
                }}
              >
                <MessageCircle className="h-4" />
                <span>Commentaire</span>
              </li>
              <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer flex items-center gap-2"
                onClick={() => {
                    setTypeFeedback("code");
                    setIsDropdownOpen(false);
                }}
              >
                <Code className="h-4" />
                <span>Code</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackType;
