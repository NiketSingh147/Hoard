import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getCategoryProducts,
  getSubcategoryProducts,
  getAllProducts,
} from "../data/categories";
import ProductCard from "./ProductCard";
import Breadcrumbs from "./Breadcrumbs";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function CategoryPage() {
  const { categorySlug, subSlug } = useParams();
  const { cartItems } = useCart();
  const [gridCols, setGridCols] = useState(2);
  const [activeSuggestionId, setActiveSuggestionId] = useState(null);

  const category = useMemo(() => getCategoryBySlug(categorySlug), [categorySlug]);
  const subcategory = useMemo(
    () => (subSlug ? getSubcategoryBySlug(categorySlug, subSlug) : null),
    [categorySlug, subSlug],
  );

  const products = useMemo(() => {
    if (!category) return [];
    if (subSlug) return getSubcategoryProducts(categorySlug, subSlug);
    return getCategoryProducts(categorySlug);
  }, [category, categorySlug, subSlug]);

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

  if (!category || (subSlug && !subcategory)) {
    return (
      <section className="px-4 md:px-8 py-16 bg-[var(--bg)] text-[var(--text)] min-h-[55vh]">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Categories", to: "/" }, { label: "Not Found" }]} />
        <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-3 font-stencil">
          Category Not Found
        </h2>
        <p className="text-center text-sm md:text-base text-[var(--muted)]">
          Please choose a valid category or subcategory.
        </p>
      </section>
    );
  }

  return (
    <section className="px-4 md:px-8 py-16 bg-[var(--bg)] text-[var(--text)]">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Categories", to: "/" },
          { label: category.name, to: `/${category.slug}` },
          ...(subcategory ? [{ label: subcategory.name, to: `/${category.slug}/${subcategory.slug}` }] : []),
        ]}
      />

      <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-3 font-stencil">
        {subcategory ? subcategory.name : category.name}
      </h2>
      <p className="text-center text-sm md:text-base text-[var(--muted)] mb-10">
        {subcategory
          ? `From ${category.name} (${products.length} products)`
          : `${category.name} Collection (${products.length} products)`}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
        {products.map((item, index) => (
          <div key={`${item.id}-${item.subcategorySlug}`} className="contents">
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
  );
}

export default CategoryPage;
