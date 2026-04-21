import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import categories from "../data/categories";
import ProductCard from "./ProductCard";

function CategoryPage() {
  const { categorySlug, subSlug } = useParams();
  const navigate = useNavigate();

  const selection = useMemo(() => {
    const category = categories.find((item) => item.slug === categorySlug);
    if (!category) return null;

    const subcategory = category.subcategories.find((item) => item.slug === subSlug);
    if (!subcategory) return null;

    return { category, subcategory };
  }, [categorySlug, subSlug]);

  const products = selection?.subcategory.products ?? [];

  return (
    <section className="px-4 md:px-8 py-16 bg-[var(--bg)] text-[var(--text)]">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg 
          text-sm md:text-base font-medium transition duration-300
          bg-[var(--surface)] border border-[var(--border)]
          hover:shadow-lg hover:border-[var(--primary)]
          [data-theme='dark']&:hover:shadow-[0_8px_16px_rgba(168,85,247,0.2)]
          [data-theme='orange']&:hover:shadow-[0_8px_16px_rgba(244,94,41,0.15)]
          text-[var(--text)]"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>
      </div>

      {/* {selection && (
        <p className="text-xs md:text-sm text-[var(--muted)] opacity-40 mb-6 font-light tracking-wide">
          Home / {selection.category.name} / {selection.subcategory.name}
        </p>
      )} */}

      <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-3 font-stencil">
        {selection ? selection.subcategory.name : "Category Not Found"}
      </h2>
      <p className="text-center text-sm md:text-base text-[var(--muted)] mb-10">
        {selection ? selection.category.name : "Please choose a valid category from the navbar."}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
