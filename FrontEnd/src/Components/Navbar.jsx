import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-gray-900 sticky top-0 shadow-sm shadow-gray-800 text-white py-5  z-50">
      <nav className="container mx-auto flex items-center justify-around">
        <div className="text-xl font-bold flex justify-end">
          <span className="text-blue-400">Learn</span>CodeLab
        </div>
        <ul className="hidden md:flex space-x-6 text-sm">
          <li>
            <a href="#" className="hover:text-blue-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              Contact Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              Learn
            </a>
          </li>
        </ul>
        <div className="space-x-4 text-sm">
          <Link
            to={"/login"}
            className="px-4 py-2 bg-transparent text-blue-400 border border-blue-400 rounded-md hover:bg-blue-400 hover:text-white transition"
          >
            Log In
          </Link>
          <Link
            className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition"
            to={"/register"}
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
