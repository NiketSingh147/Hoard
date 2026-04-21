import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/images/hero1.webp",
  },
  {
    src: "/images/hero2.webp",
  },
  {
    src: "/images/hero3.webp",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };
  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);



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
      className="relative w-full h-[58vh] md:h-[72vh] lg:h-[82vh] overflow-hidden flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.src || slide}
            alt="hero"
            className="w-full h-full object-contain"
          />
        </div>
      ))}

      {/* Soft top blend so Hero and slider feel continuous */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-transparent to-transparent"></div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 bg-[var(--surface)] border border-[var(--border)] p-3 rounded-full hover:bg-[var(--primary)] transition"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 bg-[var(--surface)] border border-[var(--border)] p-3 rounded-full hover:bg-[var(--primary)] transition"
      >
        <ChevronRight />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-[var(--text)]" : "bg-[var(--muted)]"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;
