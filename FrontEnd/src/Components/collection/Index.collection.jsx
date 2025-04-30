import {
  faAnglesDown,
  faAnglesUp,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
function zIndex({ collection }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-3">{collection.title}</h2>
        <Link to={`/collection/details/${collection.user.firstName+"-"+collection.user.lastName}/${collection.slug}`} className="flex space-x-1 text-sm items-center hover:text-blue-500 cursor-pointer">
          <span>Figure Out</span>
          <FontAwesomeIcon icon={faChevronRight} className="text-xs"/>
        </Link>
      </div>
      <p className="text-gray-300 mb-4">
        The question:
        <span className="font-bold ms-2">{collection.question}</span>
      </p>

      <div className="text-sm text-gray-400 mb-4">
        <p>{collection.description}</p>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <div className="flex flex-wrap justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <span>Made By:</span>
            <span className="text-gray-300">
              {collection.user.firstName} {collection.user.lastName}
            </span>
            <span className="bg-gray-600 px-2 py-1 rounded">
              {collection.language}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <span>Members: 39</span>
            <span>Feedback: 5</span>
            <div className="flex space-x-4">
              <span className="flex items-center space-x-2 border px-2 py-1 rounded border-gray-600 hover:shadow-blue-500 shadow cursor-pointer">
                <p>Up</p>
                <FontAwesomeIcon icon={faAnglesUp} />
              </span>
              <span className="flex items-center space-x-2 border px-2 py-1 rounded border-gray-600 hover:shadow-red-500 shadow cursor-pointer">
                <p>down</p>
                <FontAwesomeIcon icon={faAnglesDown} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default zIndex;
