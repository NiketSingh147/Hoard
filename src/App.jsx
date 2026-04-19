import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeroSlider from "./components/HeroSlider";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import WhatsappFloat from "./components/WhatsappFloat";
import OfferBar from "./components/OfferBar";
import Reviews from "./components/Reviews";
import CategorySidebar from "./components/CategorySidebar";
function App() {
  return (
    <div className="bg-black text-white min-h-screen pt-[80px] overflow-x-hidden">

      <Navbar />
<div className="pt-1">
  <Hero />
  <HeroSlider />
  <Categories />
  <Products />
  <Reviews />
</div>

      <WhatsappFloat />
      <OfferBar />
      <div className="h-20"></div>
      <Footer />

    </div>
  );
}

export default App;
