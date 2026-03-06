import ProductCard from "../common/ProductCard";

const RelatedProducts = ({ products }) => {
  if (!products?.length) {
    return null;
  }

  return (
    <section className="mt-10">
      <h3 className="mb-4 text-2xl font-bold">Related Products</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
