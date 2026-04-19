const categories = [
  { 
    name: "Night Lights", 
    image: "/categories/nightLight.png",
    hoverImage: "/categories/offnightLight.png"
  },
  { name: "Kids Night Lights", image: "/categories/kids.png" },
  { name: "Divine Series", image: "/categories/divine.png" },
  { name: "Mini Aura", image: "/categories/miniaura.png" },
  { name: "Sensor Lights", image: "/categories/insensor.png" },
];

function Categories() {
  return (
    <section className="px-4 md:px-8 py-14 bg-black text-white">
<h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-10 font-stencil">
  SHOP BY CATEGORY
</h2>

     <div className="flex gap-6 overflow-x-auto scrollbar-hide justify-start md:justify-center py-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="min-w-[120px] md:min-w-[150px] flex flex-col items-center gap-3 cursor-pointer group overflow-visible"
          >
<div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-gray-900 border border-white/10 
group-hover:scale-110 group-hover:-translate-y-1 
group-hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] 
transition duration-300">
  {/* Default image (OFF) */}
  <img
    src={cat.hoverImage || cat.image}
    alt={cat.name}
    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
  />

  {/* Hover image (ON) */}
  <img
    src={cat.image}
    alt={cat.name}
    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
  />

</div>

            <p className="text-base md:text-lg font-medium text-center group-hover:text-purple-400 transition">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
