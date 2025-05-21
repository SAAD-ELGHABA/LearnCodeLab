import { FaFacebookF, FaInstagram, FaYoutube , FaTwitter } from "react-icons/fa";
// import { FiX } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import LCL from '../Assets/LCL.png';
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0a1128] text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* Left side */}
        <div className="flex flex-col items-center  lg:items-start ">
          <Link to='/'>
          <img className="text-2xl font-bold text-white mb-4" src={LCL}/>
          
          </Link>
          <p className="mb-2 text-sm">+212 6 18 76 91 58</p>
          <p className="mb-2 text-sm">learncodelab@gmail.com</p>
          <div className="flex space-x-4 mt-6">
            <button className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
              <FaTwitter size={18} />
            </button>
            <button className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
              <FaFacebookF size={18} />
            </button>
            <button className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
              <FaInstagram size={18} />
            </button>
            <button className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
              <FaYoutube size={18} />
            </button>
          </div>
        </div>

        {/* Center */}
<div className="flex flex-col items-center  lg:items-start">
  <h3 className="text-white font-semibold mb-4">Quick Links</h3>
  
  {/* Ligne 1 */}
  <div className="flex gap-6 text-sm mb-8">
    <Link to="/" className="hover:underline">Home</Link>
    <Link to="/Blog" className="hover:underline">Blog</Link>
    <Link to="/ContactUs" className="hover:underline">Contact Us</Link>
  </div>

  {/* Ligne 2 */}
  <div className="flex gap-6 text-sm">
    <Link to="/About" className="hover:underline">About</Link>
    <Link to="/Learn" className="hover:underline">Learn</Link>
    <Link to="/Languages" className="hover:underline">Languages</Link>
  </div>
</div>


        {/* Right side */}
        <div>
          <form className="flex flex-col space-y-4">
            <div>
              <label className="text-sm mb-1 block" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="mail@mail.com"
                className="w-full p-2 rounded bg-white text-gray-800 text-sm focus:outline-none"
              />
            </div>
            <div className="relative">
              <label className="text-sm mb-1 block" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="6digits"
                className="w-full p-2 rounded bg-white text-gray-800 text-sm focus:outline-none"
              />
              <IoEyeOutline className="absolute right-3 top-9 text-gray-500 cursor-pointer" size={20} />
            </div>
            <button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white rounded py-2 mt-2 cursor-pointer">
              Log in
            </button>
          </form>
        </div>

      </div>

      {/* Bottom */}
      <hr className="border-gray-700 my-8" />
      <div className="text-center text-xs text-gray-400">
        © 2025 Learn Code Lab. All rights reserved
      </div>
    </footer>
  );
}
