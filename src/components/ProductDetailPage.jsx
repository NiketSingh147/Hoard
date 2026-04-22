import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Expand, Star, Truck, RotateCcw } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getAllProducts, getProductById } from "../data/categories";
import ProductCard from "./ProductCard";
import Breadcrumbs from "./Breadcrumbs";

const PACK_OPTIONS = [2, 5, 10, 15, 20];

function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = useMemo(() => getProductById(productId), [productId]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPack, setSelectedPack] = useState(2);
  const [showFullscreen, setShowFullscreen] = useState(false);

  if (!product) {
    return (
      <section className="px-4 md:px-8 py-16 bg-[var(--bg)] text-[var(--text)] min-h-[55vh]">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Categories", to: "/" }, { label: "Not Found" }]} />
        <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-3 font-stencil">
          Product Not Found
        </h2>
      </section>
    );
  }

  const allImages = product.images?.length ? product.images : [product.image];
  const activeImage = allImages[activeImageIndex];
  const selectedPrice = product.price * selectedPack;
  const selectedOriginalPrice = (product.originalPrice || product.price) * selectedPack;
  const formattedReviews = product.reviewCount?.toLocaleString?.() || product.reviewCount || 0;
  const bestsellers = getAllProducts()
    .filter((item) => item.bestseller && item.id !== product.id)
    .slice(0, 8);

  const handleAddToCart = () => {
    addToCart(product, selectedPack);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedPack);
    navigate("/cart");
  };

  return (
    <>
      <section className="px-4 md:px-8 py-10 md:py-14 bg-[var(--bg)] text-[var(--text)]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Categories", to: "/" },
              { label: product.categoryName || "Category", to: `/${product.categorySlug}` },
              ...(product.subcategoryName
                ? [{ label: product.subcategoryName, to: `/${product.categorySlug}/${product.subcategorySlug}` }]
                : []),
              { label: product.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 xl:gap-12">
            <div className="space-y-4">
              <div className="grid grid-cols-[72px_1fr] sm:grid-cols-[88px_1fr] gap-4 items-start">
                <div className="flex flex-col gap-3">
                  {allImages.map((img, index) => (
                    <button
                      key={`${img}-${index}`}
                      onClick={() => setActiveImageIndex(index)}
                      className={`rounded-lg overflow-hidden border-2 transition ${
                        index === activeImageIndex ? "border-[var(--primary)]" : "border-[var(--border)]"
                      }`}
                    >
                      <img src={img} alt={`${product.title} ${index + 1}`} className="w-full h-16 sm:h-20 object-cover" />
                    </button>
                  ))}
                </div>

                <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 md:p-6">
                  <button
                    onClick={() => setShowFullscreen(true)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[var(--accent)] border border-[var(--border)] hover:scale-105 transition"
                  >
                    <Expand size={16} />
                  </button>
                  <img
                    src={activeImage}
                    alt={product.title}
                    className="w-full h-[300px] sm:h-[420px] object-contain cursor-zoom-in"
                    onClick={() => setShowFullscreen(true)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">{product.title}</h1>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    <Star size={14} className="fill-yellow-400" />
                    <span className="text-sm font-semibold text-[var(--text)]">{product.rating || 4.5}</span>
                  </div>
                  <span className="text-sm text-[var(--muted)]">({formattedReviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-3xl font-bold">Rs {selectedPrice}</span>
                <span className="text-lg text-[var(--muted)] line-through">Rs {selectedOriginalPrice}</span>
                {product.discount && <span className="text-red-500 font-semibold">{product.discount}</span>}
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
                <h3 className="font-semibold mb-3">Pack</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PACK_OPTIONS.map((pack) => (
                    <button
                      key={pack}
                      onClick={() => setSelectedPack(pack)}
                      className={`py-2.5 rounded-lg border text-sm font-semibold transition ${
                        selectedPack === pack
                          ? "border-[var(--primary)] bg-[var(--accent)]"
                          : "border-[var(--border)] hover:border-[var(--primary)]"
                      }`}
                    >
                      Pack of {pack}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 rounded-lg font-semibold transition duration-300 border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 rounded-lg font-semibold transition duration-300"
                  style={{ backgroundColor: "var(--primary)", color: "var(--bg)" }}
                >
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] flex items-center gap-3">
                  <RotateCcw size={16} className="text-[var(--primary)]" />
                  <div>
                    <p className="font-semibold text-sm">{product.delivery?.returnPolicy}</p>
                    <p className="text-xs text-[var(--muted)]">Hassle-free return policy</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] flex items-center gap-3">
                  <Truck size={16} className="text-[var(--primary)]" />
                  <div>
                    <p className="font-semibold text-sm">{product.delivery?.shipping}</p>
                    <p className="text-xs text-[var(--muted)]">Delivery in {product.delivery?.eta}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 md:p-5">
                <h3 className="text-xl font-bold mb-3">Product Information</h3>
                <div className="divide-y divide-[var(--border)]">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-[1fr_1.2fr] gap-4 py-2.5 text-sm md:text-base">
                      <p className="text-[var(--muted)]">{spec.label}</p>
                      <p className="font-semibold">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 md:p-5">
                <h3 className="text-xl font-bold mb-3">Product Description</h3>
                <ul className="space-y-2.5 pl-5 list-disc text-sm md:text-base">
                  {product.highlights.map((point) => (
                    <li key={point} className="leading-relaxed text-[var(--text)]">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {bestsellers.length > 0 && (
        <section className="px-4 md:px-8 pb-16 bg-[var(--bg)] text-[var(--text)]">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-stencil mb-6">BESTSELLERS YOU MAY LIKE</h3>
            <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-2">
              {bestsellers.map((item) => (
                <div key={item.id} className="min-w-[240px] md:min-w-0">
                  <ProductCard {...item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {showFullscreen && (
        <div
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowFullscreen(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <img src={activeImage} alt={product.title} className="w-full max-h-[85vh] object-contain rounded-lg" />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
                >
                  <ChevronLeft size={22} className="text-white" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
                >
                  <ChevronRight size={22} className="text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetailPage;
