import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-800 min-h-screen p-6 text-gray-100">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Recently Active Questions</h1>
        <p className="text-gray-400 mb-4">503 collection with 1202 code</p>
        
        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2 transition-colors">
            <span>Tap to search</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <Link 
            to="/add1" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition-colors"
          >
            <span>Add a collection</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="bg-gray-700 rounded-lg p-6 mb-6 border border-gray-600">
        <h2 className="text-xl font-semibold mb-3">Here is the title of a collection</h2>
        <p className="text-gray-300 mb-4">
          The question: can I use it in my website to handle frameworks like react and laravel using monaco?
        </p>
        
        <div className="text-sm text-gray-400 mb-4">
          <p>Here's a visual concept for your code filtering form! (s^p) It includes dropdowns for programming languages, a glowing search bar, and toggle buttons for filtering by difficulty.</p>
          <p className="mt-2">Here's a visual concept for the code collections section on your website! (s^p) It features a grid-based layout with glowing syntax-highlighted snippets, hover effects, and a live preview panel.</p>
        </div>

        <div className="border-t border-gray-600 pt-4">
          <div className="flex flex-wrap justify-between text-sm text-gray-400">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <span>Made By:</span>
              <span className="text-gray-300">Name User</span>
              <span className="bg-gray-600 px-2 py-1 rounded">Javascript</span>
            </div>
            <div className="flex gap-4">
              <span>Members: 39</span>
              <span>Rate: ★★★★☆</span>
              <span>Feedback: 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;