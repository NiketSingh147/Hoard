import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeroSlider from "./components/HeroSlider";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import OfferBar from "./components/OfferBar";
import Reviews from "./components/Reviews";
import CategoryPage from "./components/CategoryPage";
import { themes } from "./theme/themes";
import { Route, Routes } from "react-router-dom";

function App() {
  const [currentTheme, setCurrentTheme] = useState("dark");

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
          <Route path="/category/:categorySlug/:subSlug" element={<CategoryPage />} />
          <Route path="/:categorySlug/:subSlug" element={<CategoryPage />} />
        </Routes>
      </div>

      <WhatsappFloat />
      <OfferBar themeName={currentTheme} />
      <div className="h-20"></div>
      <Footer themeName={currentTheme} />

    </div>
  );
}

export default App;
