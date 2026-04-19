import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/images/hero1.webp",
  },
  {
    src: "/images/hero2.webp",
    style: "md:scale-110", // ONLY applies on desktop
  },
  {
    src: "/images/hero3.webp",
    style: " md:scale-110", // ONLY applies on desktop
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;

    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchEndX - touchStartX > 50) prevSlide();
  };

  return (
    <div
      className="relative w-full h-[45vh] sm:h-[55vh] md:h-[70vh] max-h-[650px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
<img
  key={index}
  src={slide.src || slide}
  alt="hero"
  className={`absolute w-full h-full object-contain md:object-cover ${
    slide.style || ""
  } transition-opacity duration-700 ${
    index === current ? "opacity-100" : "opacity-0"
  }`}
/>
      ))}

      {/* Overlay (dark gradient for text readability later) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
      >
        <ChevronRight />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
