import { useState } from "react";
import { Heart, ShoppingBag, X, ChevronLeft, ChevronRight, Star } from "lucide-react";

function ProductCard({ 
  image, 
  title, 
  price, 
  originalPrice, 
  discount,
  images = [],
  rating = 4.3,
  reviewCount = 0,
  id 
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Combine single image with images array
  const allImages = images && images.length > 0 ? images : [image];
  const currentImage = allImages[currentImageIndex] || image;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = () => {
    setModalImageIndex(currentImageIndex);
    setShowModal(true);
  };

  const handleModalPrev = () => {
    setModalImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleModalNext = () => {
    setModalImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <div key={i} className="relative">
            <Star size={14} className="text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} size={14} className="text-gray-300" />
        );
      }
    }
    return stars;
  };

  const discount_percent = discount ? parseInt(discount) : 0;
  const savings = originalPrice ? Math.round(originalPrice - price) : 0;

  return (
    <>
      <div
        className="relative rounded-xl overflow-hidden group
        bg-[var(--surface)] border border-[var(--border)]
        hover:-translate-y-2 transition duration-300 ease-out"
        style={{
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* Image Container */}
        <div 
          className="relative w-full aspect-square bg-[var(--accent)] flex items-center justify-center overflow-hidden rounded-t-xl cursor-pointer group/image"
          onClick={handleImageClick}
        >
          <img
            src={currentImage}
            alt={title}
            className="w-full h-full object-contain transition duration-500 group-hover:scale-105"
          />

          {/* Discount Badge */}
          {discount && (
            <span className="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md">
              {discount}
            </span>
          )}

          {/* Wishlist Button - Theme-aware */}
          <button 
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 p-2.5 rounded-full transition duration-300 shadow-md
            opacity-0 group-hover:opacity-100
            backdrop-blur-sm"
            style={{
              backgroundColor: isWishlisted 
                ? "rgba(239, 68, 68, 0.9)" 
                : "rgba(255, 255, 255, 0.15)",
              border: isWishlisted 
                ? "2px solid rgb(239, 68, 68)" 
                : "2px solid rgba(255, 255, 255, 0.3)",
              color: isWishlisted ? "white" : "currentColor",
              transform: isWishlisted ? "scale(1.1)" : "scale(1)",
            }}
            onMouseEnter={(e) => {
              if (!isWishlisted) {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isWishlisted) {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
              }
            }}
          >
            <Heart 
              size={18} 
              fill={isWishlisted ? "currentColor" : "none"}
              className={isWishlisted ? "text-white" : "text-white/80"}
            />
          </button>

          {/* Image Navigation - Show on hover if multiple images */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm
                opacity-0 group-hover/image:opacity-100 transition duration-300 hover:bg-white/30"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm
                opacity-0 group-hover/image:opacity-100 transition duration-300 hover:bg-white/30"
              >
                <ChevronRight size={18} className="text-white" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover/image:opacity-100 transition duration-300">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className="w-2 h-2 rounded-full transition duration-300"
                    style={{
                      backgroundColor: idx === currentImageIndex ? "white" : "rgba(255,255,255,0.5)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4 md:p-5 flex flex-col gap-3 relative z-10">
          {/* Product Title */}
          <h3 className="text-sm md:text-base font-semibold text-[var(--text)] line-clamp-2 leading-snug">
            {title}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[var(--text)] font-bold text-lg md:text-xl">Rs {price}</span>

            {originalPrice && (
              <>
                <span className="text-[var(--muted)] line-through text-sm font-medium">Rs {originalPrice}</span>
                {savings > 0 && (
                  <span className="text-green-500 text-xs font-semibold">Save Rs {savings}</span>
                )}
              </>
            )}
          </div>

          {/* Rating Section - Bottom right */}
          {reviewCount > 0 && (
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="font-semibold text-[var(--text)]">{rating}</span>
              <div className="flex gap-0.5">
                {renderStars(rating)}
              </div>
              <span className="text-[var(--muted)]">({reviewCount})</span>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            className="mt-2 md:mt-3 flex items-center justify-center gap-2
            py-2.5 rounded-lg text-sm font-semibold
            transition duration-300 ease-out
            active:scale-95 w-full hover:shadow-lg"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--bg)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ShoppingBag size={18} />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none rounded-xl" style={{
          background: `linear-gradient(135deg, var(--primary) 0%, transparent 100%)`,
          opacity: 0.02
        }}></div>
      </div>

      {/* Fullscreen Image Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-10 right-0 md:top-4 md:right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm
              hover:bg-white/20 transition duration-300 z-50"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Image Display */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={allImages[modalImageIndex]}
                alt={title}
                className="w-full h-full object-contain max-h-[75vh]"
              />

              {/* Modal Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handleModalPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm
                    hover:bg-white/30 transition duration-300"
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  <button
                    onClick={handleModalNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm
                    hover:bg-white/30 transition duration-300"
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>

                  {/* Modal Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white text-sm font-medium">
                      {modalImageIndex + 1} / {allImages.length}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Product Title in Modal */}
            <div className="mt-4 text-white">
              <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
              <p className="text-white/70 text-sm mt-2">Rs {price}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;

