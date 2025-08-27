import React from "react";
import { OrbitingCircle } from "./ui/OrbitingCircle";

const Skills = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-8">
      {/* Responsive heading */}
      <h2 className="text-4xl font-poppins sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
        <span className="text-asset">S</span>kills
      </h2>

      {/* Orbit container with responsive sizing */}
      <div className="relative w-full max-w-[500px] aspect-square">
        <OrbitingCircle />
      </div>
    </section>
  );
};

export default Skills;
