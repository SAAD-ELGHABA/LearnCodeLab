
import "./Particles.css"; // Import CSS file

const ParticlesBackground = () => {
  return (
    <div className="particles-container">
      {Array.from({ length: 50 }).map((_, index) => (
        <div key={index} className="particle"></div>
      ))}
    </div>
  );
};

export default ParticlesBackground;
