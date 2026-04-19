import { useState } from "react";

function Hero() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-4 md:py-4 bg-gradient-to-b from-black to-gray-900">

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Glow wrapper ONLY for text */}
        <div
          className="relative"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPos({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >

          {/* Glow */}
          <div
            className={`pointer-events-none absolute rounded-full blur-3xl transition-opacity duration-300 ${
              hovered ? "opacity-30" : "opacity-0"
            }`}
            style={{
              width: "180px",
              height: "180px",
              left: pos.x - 90,
              top: pos.y - 90,
              background: "rgba(168,85,247,1.0)",
            }}
          />

          {/* Heading */}
          <h1 className="font-script text-4xl md:text-6xl text-white leading-tight relative">
            Light Up Your Nights
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-gray-400 max-w-xl relative">
            Discover aesthetic night lamps that transform your room into a glowing paradise.
          </p>

        </div>

        {/* BUTTON (unchanged position) */}
        <button className="mt-6 px-6 py-3 bg-purple-500 rounded-lg text-white hover:bg-purple-600 transition shadow-lg shadow-purple-500/30">
          Explore Collection
        </button>

      </div>

    </section>
  );
}

export default Hero;