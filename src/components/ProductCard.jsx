import { Heart, ShoppingBag } from "lucide-react";

function ProductCard({
  image,
  title,
  price,
  originalPrice,
  discount,
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden group 
    bg-white/5 backdrop-blur-md border border-white/10 
    hover:border-purple-500/40 hover:-translate-y-1 
    transition duration-300">

      {/* Glow layer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
      bg-gradient-to-br from-purple-500/10 to-transparent blur-xl transition"></div>

      {/* IMAGE */}
      <div className="relative aspect-square bg-black flex items-center justify-center overflow-hidden">

        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain 
          transition duration-500 group-hover:scale-110"
        />

        {/* Soft light overlay */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition"></div>

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-3 left-3 bg-red-500/90 text-white text-xs px-2 py-1 rounded-md shadow">
            {discount}
          </span>
        )}

        {/* Wishlist (hidden → show on hover) */}
        <button className="absolute top-3 right-3 p-2 rounded-full 
        bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 
        hover:bg-purple-500 transition">
          <Heart size={16} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2 relative z-10">

        {/* Title */}
        <h3 className="text-sm md:text-base font-medium text-gray-200 line-clamp-2">
          {title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-lg">
            ₹{price}
          </span>

          {originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* Button */}
        <button className="mt-2 flex items-center justify-center gap-2 
        bg-gradient-to-r from-purple-500 to-purple-600 
        hover:from-purple-600 hover:to-purple-700
        py-2.5 rounded-lg text-sm font-medium 
        hover:scale-[1.03] active:scale-95 
        transition duration-300 shadow-md">

          <ShoppingBag size={16} />
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;