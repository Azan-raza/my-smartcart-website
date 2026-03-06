import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductGallery from "../components/products/ProductGallery";
import ProductReviews from "../components/products/ProductReviews";
import RelatedProducts from "../components/products/RelatedProducts";
import Loader from "../components/common/Loader";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { currency } from "../utils/format";
import api from "../utils/api";
import { getProductImageUrl, getProductImages } from "../utils/productImage";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);
  const productName = product?.title || product?.name || "Product";
  const productImages = useMemo(() => (product ? getProductImages(product) : []), [product]);

  const effectivePrice = useMemo(() => (product ? product.discountPrice || product.price : 0), [product]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
        setRelatedProducts(Array.isArray(data?.relatedProducts) ? data.relatedProducts : []);
        setSelectedImage(0);
        setSelectedColor(data.product.colors?.[0] || "");
      } catch {
        setProduct(null);
        setRelatedProducts([]);
        toast.error("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const key = `${product._id}-${selectedSize}-${selectedColor}`;
    addToCart({
      key,
      productId: product._id,
      name: productName,
      image: getProductImageUrl(product),
      price: effectivePrice,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
    toast.success("Added to cart");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Login required");
      return;
    }

    setSubmittingReview(true);
    try {
      await api.post(`/products/${product._id}/reviews`, reviewForm);
      toast.success("Review submitted");
      const { data } = await api.get(`/products/${id}`);
      setProduct(data.product);
      setReviewForm({ rating: 5, comment: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return <Loader text="Loading product..." />;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <section className="grid gap-6 lg:grid-cols-2">
        <ProductGallery images={productImages} selected={selectedImage} onSelect={setSelectedImage} />
        <div className="card">
          <p className="text-xs uppercase tracking-wide text-slate-500">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold">{productName}</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{product.description}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold">{currency(effectivePrice)}</span>
            {product.discountPrice && <span className="text-slate-400 line-through">{currency(product.price)}</span>}
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium">Size</p>
            <div className="mt-2 flex gap-2">
              {product.sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border px-3 py-1 ${selectedSize === size ? "border-slate-900 dark:border-sky-400" : "border-slate-300"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm font-medium">Color</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-lg border px-3 py-1 ${selectedColor === color ? "border-slate-900 dark:border-sky-400" : "border-slate-300"}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              min={1}
              max={product.countInStock}
              className="w-20 rounded-lg border border-slate-300 px-2 py-2"
            />
            <button type="button" className="btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-500">Stock: {product.countInStock > 0 ? `${product.countInStock} available` : "Out of stock"}</p>
        </div>
      </section>

      <ProductReviews product={product} />

      <section className="card mt-6">
        <h3 className="text-xl font-semibold">Write a Review</h3>
        <form onSubmit={submitReview} className="mt-4 space-y-3">
          <select
            value={reviewForm.rating}
            onChange={(e) => setReviewForm((prev) => ({ ...prev, rating: Number(e.target.value) }))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>{star} Stars</option>
            ))}
          </select>
          <textarea
            value={reviewForm.comment}
            onChange={(e) => setReviewForm((prev) => ({ ...prev, comment: e.target.value }))}
            rows={3}
            placeholder="Share your experience"
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
            required
          />
          <button type="submit" className="btn-primary" disabled={submittingReview}>
            {submittingReview ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </section>

      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetailsPage;
