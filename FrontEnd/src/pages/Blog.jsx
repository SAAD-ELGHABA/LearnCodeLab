import React, { useState } from 'react';
import {
  FaCode, FaReact, FaJsSquare, FaCss3Alt, FaHtml5, FaPhp,
  FaPython, FaJava, FaBootstrap, FaLaravel, FaSearch
} from 'react-icons/fa';
import { FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const allArticles = [
  {
    id: 1,
    title: "Mastering JavaScript",
    excerpt: "A quick guide to understanding the basics of modern JavaScript.",
    icon: <FaJsSquare className="text-yellow-500 text-3xl" />,
    image: "/src/Assets/JAVASCRIPT.jpg",
    author: "Youssef El Dev",
    date: "April 2025",
    tech: "JavaScript",
  },
  {
    id: 2,
    title: "React.js from A to Z",
    excerpt: "Learn about hooks, components, routing, and more in React.",
    icon: <FaReact className="text-blue-500 text-3xl" />,
    image: "/src/Assets/REACT.jpg",
    author: "Imane Codeuse",
    date: "March 2025",
    tech: "React",
  },
  {
    id: 3,
    title: "Design with CSS",
    excerpt: "Create amazing interfaces effortlessly with Tailwind.",
    icon: <FaCss3Alt className="text-indigo-500 text-3xl" />,
    image: "/src/Assets/CSS.jpg",
    author: "Ahmed UI/UX",
    date: "February 2025",
    tech: "CSS",
  },
  {
    id: 4,
    title: "Modern HTML5 Structure",
    excerpt: "Solid foundations for building semantic web pages.",
    icon: <FaHtml5 className="text-orange-500 text-3xl" />,
    image: "/src/Assets/HTML.jpg",
    author: "Sara Web",
    date: "January 2025",
    tech: "HTML",
  },
  {
    id: 5,
    title: "PHP and Back-end Basics",
    excerpt: "Start with PHP to create dynamic applications.",
    icon: <FaPhp className="text-indigo-700 text-3xl" />,
    image: "/src/Assets/PHP.jpg",
    author: "Anas Backend",
    date: "December 2024",
    tech: "PHP",
  },
  {
    id: 6,
    title: "Laravel",
    excerpt: "The PHP framework favored by modern developers.",
    icon: <FaLaravel className="text-red-500 text-3xl" />,
    image: "/src/Assets/LARAVEL.jpg",
    author: "Khadija Dev",
    date: "November 2024",
    tech: "Laravel",
  },
  {
    id: 7,
    title: "Styling with Bootstrap",
    excerpt: "Build quickly with Bootstrap components.",
    icon: <FaBootstrap className="text-purple-600 text-3xl" />,
    image: "/src/Assets/BOOTSTRAP.jpg",
    author: "Omar Frontend",
    date: "October 2024",
    tech: "Bootstrap",
  },
  {
    id: 8,
    title: "Python for Beginners",
    excerpt: "A versatile and easy-to-learn language.",
    icon: <FaPython className="text-green-500 text-3xl" />,
    image: "/src/Assets/PYTHON.jpg",
    author: "Nora AI",
    date: "September 2024",
    tech: "Python",
  },
  {
    id: 9,
    title: "Programming in C",
    excerpt: "Learn the basics of C programming and memory management.",
    icon: <FaCode className="text-gray-700 text-3xl" />,
    image: "/src/Assets/C.jpg",
    author: "Ismail CDev",
    date: "August 2024",
    tech: "C",
  },
];

const Blog = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedTech, setSelectedTech] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const technologies = ["All", ...new Set(allArticles.map(a => a.tech))];

  const filteredArticles = allArticles.filter(article =>
    (selectedTech === "All" || article.tech === selectedTech) &&
    article.tech.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedArticles = showAll ? filteredArticles : filteredArticles.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 px-6 py-16">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-gray-800"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Blog <span className="text-blue-500">LearnCodeLab</span>
      </motion.h1>

      <motion.p
        className="text-center max-w-3xl mx-auto text-base text-gray-600 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Discover the latest trends in web development, practical tutorials,
        and tips shared by our community of enthusiasts.
      </motion.p>

      {/* Search bar with X */}
      <motion.div
        className="w-full md:w-1/3 mb-6 mx-auto relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaSearch className="absolute top-3 left-3 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search for a technology..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowAll(false);
          }}
          className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
        />
        {searchTerm && (
          <FiXCircle
            onClick={() => setSearchTerm("")}
            className="absolute top-3 right-3 text-gray-400 text-lg cursor-pointer "
          />
        )}
      </motion.div>

      {/* Article cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-20">
        {displayedArticles.map((article) => (
          <motion.div
            key={article.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition duration-500"
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: article.id * 0.05 }}
          >
            <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                {article.icon}
                <span className="text-sm text-gray-500">{article.date}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.excerpt}</p>
              <p className="text-xs text-gray-500">✍️ {article.author}</p>
              <button className="mt-2 px-3 py-1 rounded-lg bg-blue-400 text-white text-sm hover:bg-blue-600 transition cursor-pointer">
                Read article →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredArticles.length > 3 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition cursor-pointer"
          >
            {showAll ? "See less" : "See more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
