import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts, getProductsBySelection } from "../data/categories";
import { useCart } from "../context/CartContext";

function Products({ activeCategory, activeSubcategory }) {
  const { cartItems } = useCart();
  const [gridCols, setGridCols] = useState(2);
  const [activeSuggestionId, setActiveSuggestionId] = useState(null);
  const hasSelection = Boolean(activeCategory && activeSubcategory);
  const products = hasSelection
    ? getProductsBySelection(activeCategory, activeSubcategory)
    : getAllProducts();
  const bestsellers = getAllProducts().filter((item) => item.bestseller);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth >= 1024) setGridCols(4);
      else if (window.innerWidth >= 768) setGridCols(3);
      else setGridCols(2);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  useEffect(() => {
    if (!activeSuggestionId) return;
    const stillInCart = cartItems.some((item) => item.id === activeSuggestionId);
    if (!stillInCart) {
      setActiveSuggestionId(null);
    }
  }, [activeSuggestionId, cartItems]);

  const sourceIndex = products.findIndex((item) => item.id === activeSuggestionId);
  const rowEndIndex =
    sourceIndex >= 0
      ? Math.min(Math.floor(sourceIndex / gridCols) * gridCols + gridCols - 1, products.length - 1)
      : -1;

  const suggestions = useMemo(() => {
    if (!activeSuggestionId) return [];
    const source = products.find((item) => item.id === activeSuggestionId);
    if (!source) return [];

    return getAllProducts()
      .filter((item) => item.id !== source.id)
      .sort((a, b) => {
        const aScore = Number(a.categorySlug === source.categorySlug) + Number(a.subcategorySlug === source.subcategorySlug);
        const bScore = Number(b.categorySlug === source.categorySlug) + Number(b.subcategorySlug === source.subcategorySlug);
        return bScore - aScore;
      })
      .slice(0, 10);
  }, [activeSuggestionId, products]);

  return (
    <>
      {/* AMAZING DEALS */}
      <section className="px-3 sm:px-4 md:px-8 py-12 bg-[var(--bg)]">
        <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-8 font-stencil">
          {hasSelection ? "SELECTED PRODUCTS" : "AMAZING DEALS"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
          {products.map((item, index) => (
            <div key={item.id} className="contents">
              <ProductCard {...item} onProductAdded={(product) => setActiveSuggestionId(product.id)} />
              {index === rowEndIndex && suggestions.length > 0 && (
                <div
                  className="col-span-full rounded-2xl border border-[var(--border)] p-3 md:p-4 lg:p-5 mt-1 transition-all duration-300 ease-out"
                  style={{ backgroundColor: "color-mix(in srgb, var(--primary) 12%, transparent)" }}
                >
                  <h3 className="text-lg md:text-xl font-semibold mb-3">✨ You May Also Like</h3>
                  <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 snap-x">
                    {suggestions.map((suggestion) => (
                      <div key={`suggest-${suggestion.id}`} className="min-w-[210px] sm:min-w-[230px] md:min-w-[250px] snap-start">
                        <ProductCard {...suggestion} onProductAdded={(product) => setActiveSuggestionId(product.id)} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>   

      {!hasSelection && (
        <section className="px-3 sm:px-4 md:px-8 py-12 bg-[var(--bg)]">
          <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-8 font-stencil">
            BESTSELLERS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
            {bestsellers.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default Products;
