import { useEffect, useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react";
import categoriesMenu from "../data/categoriesMenu";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`fixed z-50 transition-all duration-500
        ${
          scrolled
            ? "top-0 left-0 w-full"
            : "top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] lg:w-[90%]"
        }`}
      >
        <nav
          className={`flex items-center justify-between px-6 py-3
          backdrop-blur-xl border border-gray-800
          transition-all duration-500
          ${
            scrolled
              ? "bg-black/90 rounded-none"
              : "bg-black/70 rounded-full shadow-lg"
          }`}
        >
          {/* LEFT: Menu + Logo */}
          <div className="flex items-center gap-3">
            <Menu
              className="cursor-pointer text-white hover:text-purple-400 transition"
              onClick={() => setMenuOpen(true)}
            />

            <img
              src="/images/logo2.png"
              alt="logo"
              className="w-[6rem] md:w-[8.5rem] h-auto object-contain"
            />
          </div>

          {/* LINKS */}
          <div className="hidden lg:flex gap-8 text-base md:text-lg font-medium text-gray-300">
            {["Home", "About", "Contact"].map((link, i) => (
              <a key={i} href="#" className="relative group">
                <span className="group-hover:text-white transition duration-300 group-hover:scale-105 inline-block">
                  {link}
                </span>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-gray-900/80 px-4 py-2 rounded-full w-[30%]">
            <Search className="text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white ml-2 w-full text-sm"
            />
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4">
            <Heart className="hover:text-purple-400 cursor-pointer transition" />
            <ShoppingBag className="hover:text-purple-400 cursor-pointer transition" />
            <User className="hover:text-purple-400 cursor-pointer transition" />
          </div>
        </nav>
      </div>

      {/* DRAWER OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)} // ✅ close on outside click
        >
          {/* DRAWER */}
          <div
            className=" w-[300px] h-full 
                          bg-white/5 
                          backdrop-blur-xl 
                          border-r border-white/10
                          shadow-[0_0_40px_rgba(0,0,0,0.6)]
                          p-6 animate-slideIn relative
                        "
            onClick={(e) => e.stopPropagation()}
          >
            {/* glow layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
            {/* CLOSE BUTTON (TOP RIGHT) */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-purple-400 transition text-lg"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-xl md:text-2xl font-stencil mb-8 tracking-wide">
              Categories
            </h2>

            {/* MENU */}
            <div className="space-y-6">
              {categoriesMenu.map((cat, i) => (
                <div key={i} className="group">
                  {/* MAIN CATEGORY */}
                  <div className="flex justify-between items-center cursor-pointer">
                    <p
                      className="text-base md:text-lg font-medium text-white 
          group-hover:text-purple-400 transition duration-300"
                    >
                      {cat.title}
                    </p>

                    {/* arrow */}
                    <span className="text-gray-500 group-hover:text-purple-400 transition">
                      →
                    </span>
                  </div>

                  {/* DROPDOWN SUBMENU */}
                  <div
                    className="
          max-h-0 overflow-hidden 
          group-hover:max-h-40 
          transition-all duration-500 ease-in-out
        "
                  >
                    <div className="pl-3 mt-2 space-y-2">
                      {cat.items.map((item, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="
                  block text-sm md:text-base text-gray-400 
                  hover:text-purple-400 
                  hover:translate-x-1
                  transition duration-300
                "
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
