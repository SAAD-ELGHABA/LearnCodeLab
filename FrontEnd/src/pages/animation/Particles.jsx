import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticlesAnimation = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="absolute w-full h-full -z-50">
      {" "}
      <Particles
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: {
            color: "#0E1C2D",
          },
          particles: {
            number: {
              value: 100,
            },
            size: {
              value: 3,
            },
            move: {
              speed: 1,
            },
            shape: {
              type: "circle",
            },
          },
        }}
        style={{ width: "100%", height: "100%" }} 
      />
    </div>
  );
};

export default ParticlesAnimation;
