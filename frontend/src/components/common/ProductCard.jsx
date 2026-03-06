import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { currency } from "../../utils/format";
import { getDefaultProductImageUrl, getProductImageUrl } from "../../utils/productImage";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const effectivePrice = product.discountPrice || product.price;
  const productName = product.title || product.name;
  const productImage = getProductImageUrl(product);

  const handleAddToCart = () => {
    if (!product.countInStock) return;
    const size = product.sizes?.[0] || "M";
    const color = product.colors?.[0] || "Default";
    const key = `${product._id}-${size}-${color}`;

    addToCart({
      key,
      productId: product._id,
      name: productName,
      image: productImage,
      price: effectivePrice,
      quantity: 1,
      size,
      color
    });
    toast.success("Added to cart");
  };

  return (
    <article className="group card overflow-hidden p-0">
      <Link to={`/products/${product._id}`} className="block overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          onError={(e) => {
            e.currentTarget.src = getDefaultProductImageUrl();
          }}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-200">
            {product.category}
          </p>
          {product.isBestSeller && (
            <p className="rounded-full bg-amber-400/20 px-2.5 py-1 text-[11px] font-bold text-amber-500">
              Best Seller
            </p>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
          <span>Stock: {product.countInStock}</span>
          <span>Rating: {Number(product.rating || 0).toFixed(1)}</span>
        </div>
        <Link to={`/products/${product._id}`} className="mt-1 block font-semibold hover:text-teal-600">
          {productName}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-black tracking-tight">{currency(effectivePrice)}</span>
          {product.discountPrice && (
            <span className="text-sm text-slate-400 line-through">{currency(product.price)}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.countInStock <= 0}
          className="btn-primary mt-3 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
