export default function Navbar() {
    return (
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">
          <span className="text-blue-400">Learn</span>CodeLab
        </div>
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="hover:text-blue-400">Home</a></li>
          <li><a href="#" className="hover:text-blue-400">Blog</a></li>
          <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
          <li><a href="#" className="hover:text-blue-400">About</a></li>
          <li><a href="#" className="hover:text-blue-400">Learn</a></li>
          <li className="relative group">
            <button className="hover:text-blue-400">Languages ▼</button>
            <ul className="absolute left-0 hidden bg-gray-800 text-white mt-2 py-2 w-40 rounded-md group-hover:block">
              <li><a href="#" className="block px-4 py-2 hover:bg-gray-700">English</a></li>
              <li><a href="#" className="block px-4 py-2 hover:bg-gray-700">French</a></li>
              <li><a href="#" className="block px-4 py-2 hover:bg-gray-700">Spanish</a></li>
            </ul>
          </li>
        </ul>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-transparent border border-blue-400 rounded-md hover:bg-blue-400 hover:text-white transition">Log In</button>
          <button className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition">Sign Up</button>
        </div>
      </nav>
    );
  }
  