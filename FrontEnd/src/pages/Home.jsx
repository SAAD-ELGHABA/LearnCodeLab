import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBroom, FaRecycle, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import peapleCoding from "../assets/acc 1.png";
import Carousel from "../Components/Carousel/Carousel.jsx";

// Témoignages
const testimonials = [
  {
    name: "John",
    message: "An essential tool for managing our projects. Collaboration has never been this easy.",
    rate: 3.5,
    bg: "bg-blue-900",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Marie",
    message: "This platform has transformed the way we work. Everything is so intuitive and efficient!",
    rate: 4,
    bg: "bg-[#2b1a10]",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Michael",
    message: "A reliable and secure platform that perfectly meets our needs.",
    rate: 4.5,
    bg: "bg-blue-700",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Lucas",
    message: "The speed of the service is impressive. We've saved a lot of time.",
    rate: 2.5,
    bg: "bg-gray-600",
    image: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Claire",
    message: "Even as a beginner, I found the platform very easy to use.",
    rate: 3.5,
    bg: "bg-cyan-800",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Sarah",
    message: "I highly recommend it! The features are powerful and easy to use.",
    rate: 5,
    bg: "bg-green-900",
    image: "https://i.pravatar.cc/100?img=6",
  },
];


// Composant de carte de témoignage
const TestimonialCard = ({ name, message, rate, bg, image }) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`rounded-lg p-6 text-white ${bg}`}>
      <div className="flex items-center mb-4">
        <img src={image} className="w-10 h-10 rounded-full mr-4" alt={name} />
        <h4 className="text-lg font-bold">{name}</h4>
      </div>
      <p className="mb-4 text-sm">{message}</p>
      <div className="flex items-center gap-1 text-xs">
        <span>Rate :</span>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-blue-400" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-blue-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} className="text-blue-400" />
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("animated-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="text-white min-h-screen z-50 bg-[#0f172a]">
      {/* HERO */}
      <div className="flex items-end container mx-auto justify-evenly pt-20 flex-col md:flex-row"      >
        <header className="w-full md:w-2/5 mb-20 text-center md:text-start mx-auto"        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 drop-shadow-lg uppercase">
            Your Way to Get <br /> Your Diploma !
          </h1>
          <p className="mt-4 text-gray-300 w-3/4 md:w-2/3 mx-auto md:mx-0">
            This is LearnCodeLab, your assistant in the world of programming.
            Learn, Practice, and Share Your Code with Ease.
          </p>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-2 mt-6">
            <button className="px-6 py-3 text-blue-400 border border-blue-400 rounded-md w-1/2 md:w-1/4  text-sm cursor-pointer mx-auto md:mx-5">
              Let&apos;s start!
            </button>
            <Link
              to="/register"
              className="bg-blue-400 mt-4 md:mt-0 px-6 py-3 text-center border hover:bg-blue-600 rounded-md w-1/2 md:w-1/4 text-sm cursor-pointer mx-auto md:mx-0"
              >
              Sign in
            </Link>
          </div>
        </header>
        <div className="flex justify-center mt-10 w-full md:w-1/2">
          <img src={peapleCoding} alt="People coding" className="w-full drop-shadow-xl" />
        </div>
      </div>

      {/* FEATURES */}
      <motion.div
        id="animated-section"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-white text-center mt-20 px-6"
      >
        <fieldset className="border-2 border-blue-400 p-6 rounded-lg">
          <legend className="text-3xl font-bold px-4">Why Learn Code Lab?</legend>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-6">
            <FeatureCard
              title="Fast ⚡"
              description="Achieve results in record time thanks to our optimized technology."
            />
            <FeatureCard
              title="Secure 🔒"
              description="Safeguard your data with advanced security systems."
            />
            <FeatureCard
              title="Easy to Use ✌️"
              description="An intuitive interface designed to simplify your experience."
            />
            <FeatureCard
              title="Collaboration 👥"
              description="Tools designed for teamwork and community engagement."
            />
          </div>
        </fieldset>
      </motion.div>

      {/* ROADMAP CAROUSEL */}
      <div className="flex flex-col justify-center mt-16">
        <h2 className="text-3xl text-center font-bold">OFPPT ROADMAP</h2>
        <Carousel />
      </div>

      {/* INTERFACE SECTION */}
      <section className="bg-[#1e2a3a] p-6 mt-20 rounded-lg mx-4 md:mx-20">
        <h2 className="text-center text-white font-semibold text-lg mb-4">
          The interface we are gonna offer to you
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#111827] p-4 rounded-lg text-sm text-gray-300">
          <div className="bg-black p-4 rounded">
            <code className="whitespace-pre-wrap block">
              {Array.from({ length: 20 }, (_, i) => `${i + 1}\n`).join("")}
            </code>
          </div>
          <div className="flex flex-col items-center justify-center text-center text-xs px-2">
            <FaRecycle className="text-blue-400 text-2xl mb-2" />
            <p className="text-gray-400">Your code is processed as the #1 code snippet</p>
          </div>
          <div className="bg-[#1e293b] rounded p-4 relative h-108">
            <button className="absolute top-2 left-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer text-sm">
              Run code
            </button>
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 transition cursor-pointer text-xl">
              <FaBroom title="Effacer" />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className=" mt-20 px-6 py-10 rounded-lg mx-4 md:mx-20 mb-20">
        <h2 className="text-2xl font-bold text-center text-white mb-6">What our students and Learners say</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </section>
    </div>
  );
}

// Card feature
const FeatureCard = ({ title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 shadow-lg hover:scale-105 transition">
    <h4 className="text-lg font-bold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);
