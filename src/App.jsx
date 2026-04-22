import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeroSlider from "./components/HeroSlider";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import OfferBar from "./components/OfferBar";
import BottomNav from "./components/BottomNav";
import Reviews from "./components/Reviews";
import CategoryPage from "./components/CategoryPage";
import CartPage from "./components/CartPage";
import ProductDetailPage from "./components/ProductDetailPage";
import { themes } from "./theme/themes";
import { Route, Routes } from "react-router-dom";

function App() {
  const [currentTheme, setCurrentTheme] = useState("orange");
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "dark" && themes.orange ? "orange" : "dark"));
  };

  return (
    <div
      data-theme={currentTheme}
      className="bg-[var(--bg)] text-[var(--text)] min-h-screen pt-[80px] overflow-x-hidden"
    >

      <Navbar
        themeName={currentTheme}
        onToggleTheme={toggleTheme}
      />
      <div className="pt-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <HeroSlider />
                <Categories />
                <Products />
                <Reviews />
              </>
            }
          />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/category/:categorySlug/:subSlug" element={<CategoryPage />} />
          <Route path="/:categorySlug" element={<CategoryPage />} />
          <Route path="/:categorySlug/:subSlug" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>

      <WhatsappFloat />
      <BottomNav />
      <OfferBar themeName={currentTheme} />
      <div className="h-28 lg:h-20"></div>
      <Footer themeName={currentTheme} />

    </div>
  );
}

export default App;
