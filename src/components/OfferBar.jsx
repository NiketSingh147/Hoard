import { useEffect, useState } from "react";

const offers = [
  "🔥 Flat 50% OFF on all night lamps",
  "🚚 Free Shipping above ₹499",
  "🎁 Use code HOARD10 for extra 10% OFF",
  "⚡ Limited Time Deal – Shop Now",
];

function OfferBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full z-[60]">
<div className="bg-white/10 backdrop-blur-md border-t border-white/10
text-white py-1 md:py-2 px-3 md:px-4 shadow-md overflow-hidden">

    <div className="whitespace-nowrap flex items-center justify-center relative h-6 md:h-5">

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${offers.length * 100}%`,
        }}
      >
        {offers.map((offer, i) => (
          <div
            key={i}
className="w-full flex-shrink-0 flex items-center justify-center text-center text-[11px] md:text-sm"
          >
            {offer}
          </div>
        ))}
      </div>

    </div>

  </div>
</div>
  );
}

export default OfferBar;
