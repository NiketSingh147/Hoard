import { useState } from "react";

function Hero() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-4 md:py-4 bg-gradient-to-b from-[var(--bg)] via-[color-mix(in_srgb,var(--bg)_80%,var(--accent))] to-transparent">

      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 42%, transparent), transparent)",
        }}
      ></div>

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
              background: "var(--primary)",
            }}
          />

          {/* Heading */}
          <h1 className="font-script text-4xl md:text-6xl text-[var(--text)] leading-tight relative">
            Light Up Your Nights
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-[var(--muted)] max-w-xl relative">
            Discover aesthetic night lamps that transform your room into a glowing paradise.
          </p>

        </div>

        {/* BUTTON (unchanged position) */}
        <button
          className="mt-6 px-6 py-3 rounded-lg text-white hover:brightness-95 transition shadow-lg"
          style={{
            backgroundColor: "var(--primary)",
            boxShadow: "0 10px 24px color-mix(in srgb, var(--primary) 40%, transparent)",
          }}
        >
          Explore Collection
        </button>

      </div>

    </section>
  );
}

export default Hero;
