const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
const DEFAULT_IMAGE_PATH = "/products/default-product.jpg";
const DEFAULT_IMAGE_URL =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80";

const toAbsoluteImageUrl = (pathOrUrl) => {
  if (!pathOrUrl) return DEFAULT_IMAGE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl === DEFAULT_IMAGE_PATH) return DEFAULT_IMAGE_URL;
  if (!pathOrUrl.startsWith("/")) return `${API_BASE_URL}/${pathOrUrl}`;
  return `${API_BASE_URL}${pathOrUrl}`;
};

export const getProductImageUrl = (product) => {
  const imagePath = product?.image || product?.images?.[0] || DEFAULT_IMAGE_PATH;
  return toAbsoluteImageUrl(imagePath);
};

export const getDefaultProductImageUrl = () => DEFAULT_IMAGE_URL;

export const getProductImages = (product) => {
  if (Array.isArray(product?.images) && product.images.length) {
    return product.images.map((imagePath) => toAbsoluteImageUrl(imagePath));
  }

  const mainImage = getProductImageUrl(product);
  return [mainImage];
};
