import { useEffect, useRef, useState } from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import categories from "../data/categories";

function Navbar({ themeName, onToggleTheme, onCategorySelect }) {
  const [scrolled, setScrolled] = useState(false);
  const [openDesktopCategory, setOpenDesktopCategory] = useState(null);
  const closeTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();

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
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    },
    [],
  );

  const desktopHoverClass =
    themeName === "orange" ? "hover:text-orange-100" : "hover:text-violet-300";

  const handleDesktopEnter = (slug) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDesktopCategory(slug);
  };

  const handleDesktopLeave = () => {
    closeTimeoutRef.current = setTimeout(
      () => setOpenDesktopCategory(null),
      120,
    );
  };

  const handleCategoryClick = (categorySlug) => {
    navigate(`/${categorySlug}`);
    setOpenDesktopCategory(null);
  };

  const handleSubcategoryClick = (categorySlug, subcategorySlug) => {
    onCategorySelect?.(categorySlug, subcategorySlug);
    navigate(`/${categorySlug}/${subcategorySlug}`);
    setOpenDesktopCategory(null);
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div
        className={`mx-auto pointer-events-auto transition-[margin,padding] duration-300 ease-out ${
          scrolled ? "mt-0 px-0" : "mt-4 px-[2.5%] md:px-[5%]"
        }`}
      >
        <nav
          className={`relative px-4 md:px-6 py-3 backdrop-blur-md border border-[var(--border)] transition-[border-radius,box-shadow,background-color,border-color] duration-300 ease-out ${
            scrolled
              ? "rounded-none"
              : "rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
          }`}
          style={{
            backgroundColor:
              themeName === "orange"
                ? "rgb(244 94 41 / 90%)"
                : "var(--nav-surface)",
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="lg:hidden w-[8.5rem]">
              <img
                src="/images/logo2.png"
                alt="Hoard logo"
                onClick={() => navigate("/")}
                className="w-[8.5rem] h-auto object-contain cursor-pointer md:hidden"
              />
            </div>

            <img
              src="/images/logo2.png"
              alt="Hoard logo"
              onClick={() => navigate("/")}
              className="hidden md:block lg:hidden absolute left-1/2 -translate-x-1/2 w-[8.5rem] h-auto object-contain cursor-pointer"
            />

            <div className="hidden lg:flex items-center gap-8 text-[18px] font-semibold text-white flex-1">
              <img
                src="/images/logo2.png"
                alt="Hoard logo"
                onClick={() => navigate("/")}
                className="w-[8.5rem] h-auto object-contain cursor-pointer"
              />

              <div className="flex items-center justify-center flex-1 gap-8">
                <button
                  onClick={() => navigate("/")}
                  className={`relative transition duration-300 ${desktopHoverClass}`}
                >
                  Home
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                      location.pathname === "/" ? "w-full" : "w-0"
                    }`}
                    style={{ backgroundColor: "var(--primary)" }}
                  ></span>
                </button>

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
                        onClick={() => handleCategoryClick(category.slug)}
                        className={`relative transition duration-300 ${desktopHoverClass}`}
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
                        className={`absolute left-1/2 top-full z-50 mt-3 pt-2 -translate-x-1/2 transition-all duration-300 ease-out ${
                          isOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-2 pointer-events-none"
                        }`}
                      >
                        <div
                          className="relative isolate flex gap-4 px-4 py-3 backdrop-blur-2xl border border-white/15 rounded-xl shadow-[0_16px_36px_rgba(0,0,0,0.38)]"
                          style={{
                            backgroundColor:
                              themeName === "orange"
                                ? "rgba(255,255,255,0.95)"
                                : "rgba(10,12,20,0.95)",
                          }}
                        >
                          <div className="flex flex-col gap-2 min-w-[220px]">
                            {category.subcategories.map((subcategory) => (
                              <button
                                key={subcategory.slug}
                                onClick={() =>
                                  handleSubcategoryClick(
                                    category.slug,
                                    subcategory.slug,
                                  )
                                }
                                className={`text-left px-3 py-2 rounded-lg transition duration-200 ${
                                  themeName === "orange"
                                    ? "text-black hover:bg-orange-500/20 hover:text-orange-600"
                                    : "text-white hover:bg-violet-500/20"
                                }`}
                              >
                                <span className="flex items-center gap-3">
                                  <img
                                    src={subcategory.image || category.image}
                                    alt={subcategory.name}
                                    className="w-7 h-7 rounded-full object-cover border border-white/30"
                                  />
                                  <span>{subcategory.name}</span>
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="hidden xl:flex items-center px-4 py-2 rounded-full w-[16%] ml-auto border border-white/10 backdrop-blur-md"
              style={{
                backgroundColor:
                  themeName === "orange"
                    ? "rgba(255,255,255,0.18)"
                    : "rgba(255,255,255,0.08)",
              }}
            >
              <Search className="text-white/80 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-white ml-2 w-full text-sm placeholder:text-white/70"
              />
            </div>

            <div className="flex items-center gap-1 text-white">
              <button
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="w-10 h-10 p-0 flex items-center justify-center transition"
              >
                <span
                  className="w-6 h-6 rounded-full border-2 border-white/50 shadow-lg shadow-black/30 ring-2 ring-white/20"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              </button>

              <button
                className={`relative w-10 h-10 p-0 flex items-center justify-center rounded-full transition duration-200 ${
                  themeName === "orange"
                    ? "hover:text-orange-200"
                    : "hover:text-violet-300"
                }`}
                onClick={() => navigate("/cart")}
              >
                <ShoppingBag size={24} />

                {getCartCount() > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-[5px] flex items-center justify-center text-[10px] font-bold rounded-full"
                    style={{
                      backgroundColor:
                        themeName === "orange" ? "#ff3b30" : "#7c3aed",
                      color: "white",
                    }}
                  >
                    {getCartCount() > 99 ? "99+" : getCartCount()}
                  </span>
                )}
              </button>

              <button
                className={`w-10 h-10 p-0 flex items-center justify-center rounded-full transition duration-200 ${
                  themeName === "orange"
                    ? "hover:text-orange-200"
                    : "hover:text-violet-300"
                }`}
              >
                <User size={24} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
