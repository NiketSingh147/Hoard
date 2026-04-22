import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import reviews from "../data/reviews.json";

function Reviews() {
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(3);

  const nextSlide = () => {
    setIndex((prev) => (prev >= reviews.length - itemsPerView ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev <= 0 ? reviews.length - itemsPerView : prev - 1));
  };

  useEffect(() => {
    if (selectedImage) return undefined;

    const interval = setInterval(() => {
      setIndex((prev) => (prev >= reviews.length - itemsPerView ? 0 : prev + 1));
    }, 3200);

    return () => clearInterval(interval);
  }, [selectedImage, itemsPerView]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="px-3 sm:px-4 md:px-8 py-12 bg-[var(--bg)] text-[var(--text)] relative">
      <h2 className="text-3xl md:text-4xl font-stencil text-center mb-8">CUSTOMER FEEDBACK</h2>

      <div className="relative max-w-7xl mx-auto overflow-x-hidden overflow-y-visible py-4">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * (100 / itemsPerView)}%)` }}
        >
          {reviews.concat(reviews).map((item, i) => (
            <div key={`${item.id}-${i}`} className="flex-shrink-0 px-2 md:px-3" style={{ width: `${100 / itemsPerView}%` }}>
              <ReviewCard item={item} openImage={setSelectedImage} />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute -left-1 md:left-0 top-1/2 -translate-y-1/2 bg-[var(--surface)] border border-[var(--border)] backdrop-blur-md p-2.5 rounded-full hover:bg-[var(--primary)] hover:text-[var(--bg)] transition"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-1 md:right-0 top-1/2 -translate-y-1/2 bg-[var(--surface)] border border-[var(--border)] backdrop-blur-md p-2.5 rounded-full hover:bg-[var(--primary)] hover:text-[var(--bg)] transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <img
            src={selectedImage}
            alt="review preview"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[70vh] max-w-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}

function ReviewCard({ item, openImage }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative p-4 md:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] 
      hover:border-[var(--primary)] hover:-translate-y-2 transition duration-300 
      h-full flex flex-col overflow-visible group"
      style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
      onMouseEnter={(event) => {
        event.currentTarget.style.boxShadow =
          "0 12px 30px rgba(0,0,0,0.18), 0 0 28px color-mix(in srgb, var(--primary) 38%, transparent)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
      }}
    >

      {/* 🔥 GLOW LAYER (ADDED) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition duration-300 pointer-events-none"
        style={{
          backgroundColor: "color-mix(in srgb, var(--primary) 18%, transparent)",
        }}
      ></div>

      {/* ✅ CONTENT WRAPPER (IMPORTANT) */}
      <div className="relative z-10 flex flex-col h-full">

        <div className="w-full aspect-square bg-[var(--bg)] rounded-xl border border-[var(--border)] mb-4 flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            onClick={() => openImage(item.image)}
            className="w-full h-full object-contain cursor-pointer"
          />
        </div>

        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-xs text-[var(--muted)]">{item.date}</p>
          </div>
          <span className="text-green-400 text-xs inline-flex items-center gap-1">
            <CheckCircle2 size={12} />
            Verified
          </span>
        </div>

        <div className="flex gap-0.5 mt-1 mb-3">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <p className={`text-sm text-[var(--muted)] leading-relaxed ${expanded ? "" : "clamp-3"}`}>
          {item.review}
        </p>

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-auto pt-3 text-xs font-semibold text-[var(--primary)] hover:opacity-80 transition text-left"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
}

export default Reviews;
