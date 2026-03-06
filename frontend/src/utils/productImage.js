const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
const DEFAULT_IMAGE_PATH = "/products/default-product.jpg";

const toAbsoluteImageUrl = (pathOrUrl) => {
  if (!pathOrUrl) return `${API_BASE_URL}${DEFAULT_IMAGE_PATH}`;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (!pathOrUrl.startsWith("/")) return `${API_BASE_URL}/${pathOrUrl}`;
  return `${API_BASE_URL}${pathOrUrl}`;
};

export const getProductImageUrl = (product) => {
  const imagePath = product?.image || product?.images?.[0] || DEFAULT_IMAGE_PATH;
  return toAbsoluteImageUrl(imagePath);
};

export const getDefaultProductImageUrl = () => toAbsoluteImageUrl(DEFAULT_IMAGE_PATH);

export const getProductImages = (product) => {
  if (Array.isArray(product?.images) && product.images.length) {
    return product.images.map((imagePath) => toAbsoluteImageUrl(imagePath));
  }

  const mainImage = getProductImageUrl(product);
  return [mainImage];
};
