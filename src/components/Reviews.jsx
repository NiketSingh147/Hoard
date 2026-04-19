import reviews from "../data/reviews.json";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Reviews() {
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
 const [itemsPerView, setItemsPerView] = useState(3);
  const nextSlide = () => {
    setIndex((prev) => (prev >= reviews.length - itemsPerView ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev >= reviews.length - itemsPerView ? 0 : prev + 1));
  };

  const openImage = (img) => setSelectedImage(img);
  const closeImage = () => setSelectedImage(null);

  // ✅ SINGLE interval (pauses when modal open)
  useEffect(() => {
    if (selectedImage) return;

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev >= reviews.length - itemsPerView ? 0 : prev + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedImage, itemsPerView]);

 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="px-4 md:px-8 py-20 bg-black text-white relative">
      <h2 className="text-3xl md:text-4xl font-stencil text-center mb-14">
        CUSTOMER FEEDBACK
      </h2>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto overflow-x-hidden overflow-y-visible py-4">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * (100 / itemsPerView)}%)`,
          }}
        >
          {reviews.concat(reviews).map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <ReviewCard item={item} openImage={openImage} />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-purple-500 transition"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-purple-500 transition"
        >
          <ChevronRight />
        </button>
      </div>

      {/* ✅ IMAGE MODAL */}
      {selectedImage && (
        <div
          onClick={closeImage}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center"
        >
          <button
            onClick={closeImage}
            className="absolute top-6 right-6 text-white text-2xl hover:text-purple-400"
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[60vh] max-w-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </section>
  );
  function ReviewCard({ item, openImage }) {
    return (
      <div
className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 
hover:border-purple-500/40 hover:-translate-y-2 transition duration-300 group overflow-visible"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 
      bg-purple-500/10 blur-xl transition"
        ></div>

        <div className="relative z-10">
          {/* IMAGE */}
          <div className="w-full aspect-square bg-black rounded-xl border border-white/10 mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={item.image}
              alt="product"
              onClick={() => openImage(item.image)}
              className="w-full h-full object-contain cursor-pointer "
            />
          </div>

          {/* USER */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
            <span className="text-green-400 text-xs">✔ Verified</span>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mt-3">
            {[...Array(item.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400">
                ★
              </span>
            ))}
          </div>

          {/* Text */}
          <p className="text-sm text-gray-300 mt-3 leading-relaxed">
            {item.review}
          </p>
        </div>
      </div>
    );
  }
}

export default Reviews;
