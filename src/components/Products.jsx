import ProductCard from "./ProductCard";
import { getAllProducts, getProductsBySelection } from "../data/categories";

function Products({ activeCategory, activeSubcategory }) {
  const hasSelection = Boolean(activeCategory && activeSubcategory);
  const products = hasSelection
    ? getProductsBySelection(activeCategory, activeSubcategory)
    : getAllProducts();
  const bestsellers = getAllProducts().filter((item) => item.bestseller);

  return (
    <>
      {/* AMAZING DEALS */}
      <section className="px-4 md:px-8 py-16 bg-[var(--bg)]">
        <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-10 font-stencil">
          {hasSelection ? "SELECTED PRODUCTS" : "AMAZING DEALS"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </section>   

      {!hasSelection && (
        <section className="px-4 md:px-8 py-16 bg-[var(--bg)]">
          <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-10 font-stencil">
            BESTSELLERS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
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
