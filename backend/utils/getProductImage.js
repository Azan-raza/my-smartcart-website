import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsDir = path.resolve(__dirname, "..", "public", "products");
const DEFAULT_IMAGE = "/products/default-product.jpg";
const REMOTE_DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80";

const TYPE_KEYWORDS = {
  hoodie: ["hoodie", "hooded", "fleece"],
  tshirt: ["tshirt", "t-shirt", "tee", "crew tee"],
  shirt: ["shirt", "button-down", "buttondown", "oxford", "flannel"],
  sneakers: ["sneaker", "sneakers", "trainer", "running shoe", "shoe"],
  jacket: ["jacket", "coat", "windbreaker", "bomber", "puffer"],
  jeans: ["jeans", "denim", "jogger", "pants", "trouser"],
  dress: ["dress", "gown", "maxi", "midi"]
};

const GENDER_KEYWORDS = {
  men: ["men", "man", "male", "boys"],
  women: ["women", "woman", "female", "girls"],
  unisex: ["unisex", "all gender", "all-gender"]
};

const REMOTE_FALLBACKS = {
  hoodie: [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80"
  ],
  shirt: [
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80"
  ],
  tshirt: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?auto=format&fit=crop&w=1200&q=80"
  ],
  sneakers: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80"
  ],
  jacket: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1200&q=80"
  ],
  jeans: [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=1200&q=80"
  ],
  dress: [
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80"
  ]
};

const slugify = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const containsKeyword = (text, keyword) => {
  const normalizedKeyword = keyword.toLowerCase().trim();
  if (!normalizedKeyword) return false;

  if (normalizedKeyword.includes(" ")) {
    return text.includes(normalizedKeyword);
  }

  const pattern = new RegExp(`\\b${escapeRegex(normalizedKeyword)}\\b`, "i");
  return pattern.test(text);
};

const detectKeyword = (text, dictionary) => {
  for (const [key, words] of Object.entries(dictionary)) {
    if (words.some((word) => containsKeyword(text, word))) {
      return key;
    }
  }
  return "";
};

const getAvailableFiles = () => {
  try {
    return new Set(fs.readdirSync(productsDir).map((file) => file.toLowerCase()));
  } catch {
    return new Set();
  }
};

const resolveCandidate = (availableFiles, baseName) => {
  if (!baseName) return "";
  const normalizedBase = baseName.toLowerCase();
  const directMatch = [".jpg", ".jpeg", ".png", ".webp"].some((ext) =>
    normalizedBase.endsWith(ext)
  )
    ? normalizedBase
    : `${normalizedBase}.jpg`;

  if (availableFiles.has(directMatch)) {
    return `/products/${directMatch}`;
  }

  for (const ext of [".jpg", ".jpeg", ".png", ".webp"]) {
    const candidate = `${normalizedBase}${ext}`;
    if (availableFiles.has(candidate)) {
      return `/products/${candidate}`;
    }
  }

  return "";
};

const pickRemoteFallback = (typeKey, seedKey) => {
  const pool = REMOTE_FALLBACKS[typeKey] || [];
  if (!pool.length) return REMOTE_DEFAULT_IMAGE;
  const seed = (seedKey || "").split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return pool[seed % pool.length];
};

const getProductImage = ({ title = "", description = "", category = "" } = {}) => {
  const safeTitle = title || "";
  const safeDescription = description || "";
  const safeCategory = category || "";
  const searchableText = `${safeTitle} ${safeDescription} ${safeCategory}`.toLowerCase();

  const titleSlug = slugify(safeTitle);
  const categorySlug = slugify(safeCategory);
  const typeKeyword = detectKeyword(searchableText, TYPE_KEYWORDS) || categorySlug;
  const genderKeyword = detectKeyword(searchableText, GENDER_KEYWORDS);
  const availableFiles = getAvailableFiles();

  const candidates = [
    titleSlug,
    `${genderKeyword}-${titleSlug}`,
    `${titleSlug}-${genderKeyword}`,
    `${genderKeyword}-${typeKeyword}`,
    `${typeKeyword}-${genderKeyword}`,
    typeKeyword,
    `${genderKeyword}-${categorySlug}`,
    categorySlug,
    "default-product"
  ];

  for (const candidate of candidates) {
    const resolved = resolveCandidate(availableFiles, candidate);
    if (resolved) return resolved;
  }

  if (availableFiles.has("default-product.jpg")) {
    return DEFAULT_IMAGE;
  }

  return pickRemoteFallback(typeKeyword, titleSlug || categorySlug);
};

export default getProductImage;
