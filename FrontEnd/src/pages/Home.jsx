import peapleCoding from "../assets/acc 1.png";
import Carousel from "../Components/Carousel/Carousel.jsX";

export default function HomePage() {
  return (
    <div className="bg-[#0E1C2D] text-white min-h-screen z-50">
      <div className="flex items-end container mx-auto">
        <header className="text-center pt-20 w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 drop-shadow-lg uppercase">
            Your Way to Get <br /> Your Diploma!
          </h1>
          <p className="mt-4 text-gray-300 max-w-sm mx-auto">
            This is LearnCodeLab, your assistant in the world of programming.
            Learn, Practice, and Share Your Code with Ease.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
            Let&apos;s start!
          </button>
        </header>
        <div className="flex justify-center mt-10 w-1/2">
          <img
            src={peapleCoding}
            alt="People coding"
            className="w-full drop-shadow-xl"
          />
        </div>
      </div>

      <section className="mt-16 px-6">
        <h2 className="text-3xl text-center font-bold mb-10">
          Why Learn Code Lab?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
      </section>
      <div className="flex flex-col justify-center">
      <h2 className="text-3xl text-center font-bold mt-10">
          OFPPT ROADMAP
        </h2>
        <Carousel />
      </div>
    </div>
  );
}

const FeatureCard = ({ title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 shadow-lg hover:scale-105 transition">
    <h4 className="text-lg font-bold mb-2">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);
