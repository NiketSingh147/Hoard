import ProductCard from "./ProductCard";
import products from "../data/products.json";

function Products() {
  const bestsellers = products.filter((item) => item.bestseller);

  return (
    <>


      {/* AMAZING DEALS */}
      <section className="px-4 md:px-8 py-16 bg-black">
        <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-10 font-stencil">
          AMAZING DEALS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </section>   
      
         {/* BESTSELLERS */}
      <section className="px-4 md:px-8 py-16 bg-black">
        <h2 className="text-3xl md:text-4xl tracking-wide font-bold text-center mb-10 font-stencil">
          BESTSELLERS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {bestsellers.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Products;