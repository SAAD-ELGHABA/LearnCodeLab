import peapleCoding from "../assets/acc 1.png";
import Carousel from "../Components/Carousel/Carousel.jsX";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
    <>
      <div className=" text-white min-h-screen z-50">
        <div className="flex items-end container mx-auto justify-evenly">
          <header className="text-start pt-20 w-2/5">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-400 drop-shadow-lg uppercase">
              Your Way to Get <br /> Your Diploma!
            </h1>
            <p className="mt-4 text-gray-300 w-2/3">
              This is LearnCodeLab, your assistant in the world of programming.
              Learn, Practice, and Share Your Code with Ease.
            </p>
            <div className="flex space-x-2">
              <button className="mt-6 px-6 py-3 text-blue-400 border cursor-pointer border-blue-400 rounded-md transition w-1/4 text-sm">
                Let&apos;s start!
              </button>
              <button className="bg-blue-400 mt-6 px-6 py-3 border hover:text-white cursor-pointer border-blue-400 hover:bg-blue-600 rounded-md transition w-1/4 text-sm">
                sign in
              </button>
            </div>
          </header>
          <div className="flex justify-center mt-10 w-1/2">
            <img
              src={peapleCoding}
              alt="People coding"
              className="w-full drop-shadow-xl"
            />
          </div>
        </div>
        <motion.div
          id="animated-section"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className=" text-white rounded-lg text-center mt-20"
        >
          <section className="mt-16 px-6">
            <fieldset className="border-1 border-blue-400 p-6 rounded">
              <legend className="text-3xl font-bold text-center px-4">
                Why Learn Code Lab?
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-6">
                <FeatureCard
                  title="Fast ⚡"
                  description="Achieve results in record time thanks to our optimized technology, ensuring quick and efficient processing."
                />
                <FeatureCard
                  title="Secure 🔒"
                  description="Safeguard your data with our advanced security systems, providing peace of mind and confidentiality."
                />
                <FeatureCard
                  title="Easy to Use ✌️"
                  description="Enjoy an intuitive interface designed to simplify your experience, making it accessible for everyone."
                />
                <FeatureCard
                  title="Collaboration 👥"
                  description="Collaborate seamlessly and efficiently with tools designed for teamwork and community engagement."
                />
              </div>
            </fieldset>
          </section>
        </motion.div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl text-center font-bold mt-10">
            OFPPT ROADMAP
          </h2>
          <Carousel />
        </div>
      </div>
    </>
  );
}

const FeatureCard = ({ title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 shadow-lg hover:scale-105 transition">
    <h4 className="text-lg font-bold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);
