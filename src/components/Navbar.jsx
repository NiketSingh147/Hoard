import { useEffect, useRef, useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import categories from "../data/categories";

function Navbar({ themeName, onToggleTheme, onCategorySelect }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDesktopCategory, setOpenDesktopCategory] = useState(null);
  const closeTimeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > 50;
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    },
    [],
  );

  const handleDesktopEnter = (slug) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDesktopCategory(slug);
  };

  const handleDesktopLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDesktopCategory(null);
    }, 120);
  };

  const handleSubcategoryClick = (categorySlug, subcategorySlug) => {
    onCategorySelect?.(categorySlug, subcategorySlug);
    navigate(`/category/${categorySlug}/${subcategorySlug}`);
    setOpenDesktopCategory(null);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div
          className={`mx-auto pointer-events-auto transition-[margin,padding] duration-300 ease-out ${
            scrolled ? "mt-0 px-0" : "mt-4 px-[2.5%] md:px-[7.5%] lg:px-[5%]"
          }`}
        >
          <nav
            className={`flex items-center justify-between px-6 py-3 backdrop-blur-md border border-[var(--border)]
            transition-[border-radius,box-shadow,background-color,border-color] duration-300 ease-out ${
              scrolled
                ? "rounded-none"
                : "rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
            }`}
            style={{
              backgroundColor:
                themeName === "orange" ? "rgb(244 94 41 / 90%)" : "var(--nav-surface)",
            }}
          >
            <div className="flex items-center gap-3">
              <Menu
                className="cursor-pointer transition text-white hover:text-white/90"
                onClick={() => setMenuOpen(true)}
              />

              <img
                src="/images/logo2.png"
                alt="logo"
                onClick={() => navigate("/")}
                className="w-[6rem] md:w-[8.5rem] h-auto object-contain cursor-pointer"
              />
            </div>

            <div className="hidden lg:flex gap-8 text-base md:text-lg font-medium text-[var(--muted)]">
              {categories.map((category) => {
                const isOpen = openDesktopCategory === category.slug;

                return (
                  <div
                    key={category.slug}
                    className="group relative"
                    onMouseEnter={() => handleDesktopEnter(category.slug)}
                    onMouseLeave={handleDesktopLeave}
                  >
                    <button
                      className="relative inline-block transition duration-300 group-hover:scale-105 text-white hover:text-white/90"
                    >
                      {category.name}
                    </button>

                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                        isOpen ? "w-full" : "w-0"
                      }`}
                      style={{ backgroundColor: "var(--primary)" }}
                    ></span>

                    <div
                      className={`absolute left-1/2 top-full z-50 mt-3 pt-3 -translate-x-1/2 transition-all duration-300 ease-out ${
                        isOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                      onMouseEnter={() => handleDesktopEnter(category.slug)}
                      onMouseLeave={handleDesktopLeave}
                    >
                      <div
                        className="relative isolate flex gap-4 px-4 py-3 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_16px_36px_rgba(0,0,0,0.38)]"
                        style={{
                          backgroundColor:
                            themeName === "orange"
                              ? "rgba(255,255,255,0.82)"
                              : "rgba(2,6,23,0.86)",
                        }}
                      >
                        {themeName === "dark" && (
                          <div className="absolute inset-0 rounded-xl bg-black/25 pointer-events-none"></div>
                        )}
                        <div className="flex items-center gap-4 whitespace-nowrap">
                          {category.subcategories.map((subcategory) => (
                            <button
                              key={subcategory.slug}
                              onClick={() =>
                                handleSubcategoryClick(
                                  category.slug,
                                  subcategory.slug,
                                )
                              }
                              className={`text-sm md:text-base font-medium hover:scale-105 transition duration-200 ${
                                themeName === "orange"
                                  ? "text-black hover:text-orange-500"
                                  : "text-white hover:text-violet-400"
                              }`}
                            >
                              {subcategory.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="hidden md:flex items-center px-4 py-2 rounded-full w-[30%] border border-white/10"
              style={{
                backgroundColor:
                  themeName === "orange"
                    ? "rgba(255,255,255,0.18)"
                    : "var(--surface)",
              }}
            >
              <Search className="text-white/80 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-white ml-2 w-full text-sm placeholder:text-white/70"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                title={
                  themeName === "dark"
                    ? "Switch to Orange Theme"
                    : "Switch to Dark Theme"
                }
                className="w-6 h-6 rounded-full border-2 border-white/50 shadow-lg shadow-black/30 ring-2 ring-white/20 hover:scale-110 transition"
                style={{ backgroundColor: "var(--primary)" }}
              />

              <Heart className="cursor-pointer transition text-white hover:text-white/90" />
              <ShoppingBag className="cursor-pointer transition text-white hover:text-white/90" />
              <User className="cursor-pointer transition text-white hover:text-white/90" />
            </div>
          </nav>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="w-[300px] h-full backdrop-blur-xl border-r border-[var(--border)]
            shadow-[0_0_40px_rgba(0,0,0,0.6)] p-6 animate-slideIn relative"
            style={{
              backgroundColor:
                themeName === "orange" ? "rgb(244 94 41 / 90%)" : "var(--surface)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 text-[var(--muted)] transition text-lg hover:text-[var(--text)]"
            >
              x
            </button>

            <h2 className="text-xl md:text-2xl font-stencil mb-8 tracking-wide">
              Categories
            </h2>

            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.slug} className="group">
                  <div className="flex justify-between items-center">
                    <p className="text-base md:text-lg font-medium text-[var(--text)]">
                      {category.name}
                    </p>
                    <span className="text-[var(--muted)] transition group-hover:text-[var(--text)]">
                      -&gt;
                    </span>
                  </div>

                  <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 ease-in-out">
                    <div className="pl-3 mt-2 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <button
                          key={subcategory.slug}
                          onClick={() =>
                            handleSubcategoryClick(
                              category.slug,
                              subcategory.slug,
                            )
                          }
                          className="block text-base md:text-[17px] text-[var(--muted)] hover:text-[var(--text)] hover:translate-x-1 transition-all duration-300 ease-out"
                        >
                          {subcategory.name}
                        </button>
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
