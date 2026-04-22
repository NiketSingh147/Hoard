import { useEffect, useState } from "react";

const offers = [
  "Flat 50% OFF on all night lamps",
  "Free Shipping above Rs 499",
  "Use code HOARD10 for extra 10% OFF",
  "Limited Time Deal - Shop Now",
];

function OfferBar({ themeName }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full z-[60]">
      <div
        className="backdrop-blur-md border-t border-white/10 py-0.5 md:py-1 px-3 md:px-4 shadow-md overflow-hidden"
        style={{
          backgroundColor:
            themeName === "orange" ? "rgb(244 94 41 / 45%)" : "var(--offer-surface)",
          color: themeName === "orange" ? "#111111" : "#ffffff",
        }}
      >
        <div className="whitespace-nowrap flex items-center justify-center relative h-5 md:h-5">
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
                className="w-full flex-shrink-0 flex items-center justify-center text-center text-[10px] md:text-sm"
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
