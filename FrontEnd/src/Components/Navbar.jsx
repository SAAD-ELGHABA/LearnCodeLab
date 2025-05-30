import { Link } from "react-router-dom";
import LCL from "../Assets/LCL.png";
export default function Navbar() {
  return (
    <header className="bg-gray-900 sticky top-0 shadow-sm shadow-gray-800 text-white py-1  z-50">
      <nav className="container mx-auto flex items-center justify-around py-4">
        <Link
          to={"/"}
          className="font-bold text-2xl w-1/4 text-center  
             bg-gradient-to-r from-blue-100 to-blue-800 bg-clip-text text-transparent"
        >
          LearnCodeLab
        </Link>
        <ul className="hidden md:flex space-x-6 text-sm">
          <li>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/About" className="hover:text-blue-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/Blog" className="hover:text-blue-400">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/ContactUs" className="hover:text-blue-400">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/block" className="hover:text-blue-400">
              Learn
            </Link>
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
