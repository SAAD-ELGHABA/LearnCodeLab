import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="bg-[#0E1C2D] text-white min-h-screen">
      {/* Hero Section */}
      <header className="text-center pt-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 drop-shadow-lg uppercase">
          Your Way to Get <br /> Your Diploma!
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          This is LearnCodeLab, your assistant in the world of programming.
          Learn, Practice, and Share Your Code with Ease.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
          Let's start!
        </button>
      </header>

      {/* Illustration */}
      <div className="flex justify-center mt-10">
        <img
          src="./../aassets/acc 1.png"
          alt="People coding"
          className="w-[60%] md:w-[40%] drop-shadow-xl"
        />
      </div>

      {/* Why Learn Code Lab? */}
      <section className="mt-16 px-6">
        <h2 className="text-3xl text-center font-bold mb-10">Why Learn Code Lab?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <FeatureCard title="Fast ⚡" description="Achieve results in record time thanks to our optimized technology, ensuring quick and efficient processing." />
          <FeatureCard title="Secure 🔒" description="Safeguard your data with our advanced security systems, providing peace of mind and confidentiality." />
          <FeatureCard title="Easy to Use ✌️" description="Enjoy an intuitive interface designed to simplify your experience, making it accessible for everyone." />
          <FeatureCard title="Collaboration 👥" description="Collaborate seamlessly and efficiently with tools designed for teamwork and community engagement." />
        </div>
      </section>

      {/* Supported Languages - Carousel */}
      <LanguageCarousel />
    </div>
  );
}

// Feature Card Component
const FeatureCard = ({ title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 shadow-lg hover:scale-105 transition">
    <h4 className="text-lg font-bold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

// Carousel Component
const LanguageCarousel = () => {
  const [index, setIndex] = useState(0);
  const languages = [
    { name: "Algorithm", icon: "/icons/algorithm.png" },
    { name: "Python", icon: "/icons/python.png" },
    { name: "HTML5", icon: "/icons/html5.png" },
    { name: "CSS3", icon: "/icons/css3.png" },
    { name: "JavaScript", icon: "/icons/javascript.png" },
    { name: "PHP", icon: "/icons/php.png" },
    { name: "Laravel", icon: "/icons/laravel.png" },
    { name: "React", icon: "/icons/react.png" },
  ];

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 2500); // Change chaque 2.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-20 text-center pb-16">
      <h3 className="text-xl text-gray-300 mb-6 uppercase">The languages that we support</h3>
      <div className="relative flex items-center justify-center">
        {/* Bouton gauche */}
        <button
          className="absolute left-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
          onClick={() => setIndex((prev) => (prev - 1 + languages.length) % languages.length)}
        >
          <FaChevronLeft className="text-white" />
        </button>

        {/* Langages en mouvement */}
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center p-4 bg-gray-900 rounded-lg shadow-md w-40"
        >
          <img src={languages[index].icon} alt={languages[index].name} className="w-16 h-16 mb-2" />
          <span className="text-gray-300 text-sm">{languages[index].name}</span>
        </motion.div>

        {/* Bouton droit */}
        <button
          className="absolute right-4 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
          onClick={() => setIndex((prev) => (prev + 1) % languages.length)}
        >
          <FaChevronRight className="text-white" />
        </button>
      </div>
    </section>
  );
};
