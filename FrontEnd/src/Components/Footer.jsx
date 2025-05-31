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
<<<<<<< HEAD
          <Link
          to={"/"}
          className="font-bold text-2xl  text-center  
             bg-gradient-to-r from-blue-100 to-blue-800 bg-clip-text text-transparent"
        >
          LearnCodeLab
        </Link>
=======
          <Link to='/'>
          <img className="text-2xl font-bold text-white mb-4" src={LCL}/>
          
          </Link>
>>>>>>> 27c02272435c323488386150c779909c9f511c29
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
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.275922399814!2d-7.9670547246442895!3d31.59889834325853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafefd72c155555%3A0x48c2c108c7c6008c!2sInstitut%20Sp%C3%A9cialis%C3%A9%20De%20Technologie%20Appliqu%C3%A9e%20NTIC!5e0!3m2!1sfr!2sma!4v1748630029213!5m2!1sfr!2sma" className="w-full h-46"  style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
