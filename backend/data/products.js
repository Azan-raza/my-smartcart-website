const defaultReviews = [
  {
    name: "Ayesha",
    rating: 5,
    comment: "Premium fabric and very comfortable fit.",
    date: new Date("2026-01-20")
  },
  {
    name: "Usman",
    rating: 4,
    comment: "Great quality for the price, would buy again.",
    date: new Date("2026-02-02")
  }
];

const productSeeds = [
  ["Essential Cotton Tee", "T-Shirts", 24, 19, ["Black", "White", "Olive"], true],
  ["Relaxed Graphic Tee", "T-Shirts", 28, null, ["Cream", "Navy"], false],
  ["Vintage Wash Tee", "T-Shirts", 30, 24, ["Stone", "Charcoal"], false],
  ["Everyday Crew Tee", "T-Shirts", 22, null, ["White", "Sky Blue"], false],
  ["Athletic Fit Tee", "T-Shirts", 26, 21, ["Black", "Red"], true],
  ["Oversized Street Tee", "T-Shirts", 32, 27, ["Sand", "Forest"], true],
  ["Classic Fleece Hoodie", "Hoodies", 52, 45, ["Black", "Grey"], true],
  ["Zip-Up Urban Hoodie", "Hoodies", 58, null, ["Navy", "Olive"], false],
  ["Heavyweight Winter Hoodie", "Hoodies", 68, 59, ["Charcoal", "Maroon"], true],
  ["Minimal Logo Hoodie", "Hoodies", 54, null, ["Sand", "White"], false],
  ["Performance Hoodie", "Hoodies", 60, 52, ["Black", "Royal"], true],
  ["Slim Chino Pants", "Pants", 64, 55, ["Khaki", "Navy"], false],
  ["Relaxed Cargo Pants", "Pants", 70, 62, ["Olive", "Black"], true],
  ["Tailored Formal Pants", "Pants", 72, null, ["Charcoal", "Navy"], false],
  ["Drawstring Linen Pants", "Pants", 58, 49, ["Beige", "White"], false],
  ["Jogger Utility Pants", "Pants", 66, 58, ["Black", "Grey"], true],
  ["Denim Straight Pants", "Pants", 74, 65, ["Indigo", "Blue"], true],
  ["Oxford Button Shirt", "Shirts", 56, 48, ["White", "Sky Blue"], false],
  ["Checked Casual Shirt", "Shirts", 50, null, ["Red", "Black"], false],
  ["Linen Summer Shirt", "Shirts", 62, 54, ["Cream", "Sage"], true],
  ["Flannel Overshirt", "Shirts", 68, 59, ["Brown", "Grey"], true],
  ["Mandarin Collar Shirt", "Shirts", 52, 44, ["White", "Olive"], false],
  ["Puffer Winter Jacket", "Jackets", 110, 95, ["Black", "Navy"], true],
  ["Bomber Flight Jacket", "Jackets", 98, 86, ["Olive", "Black"], true],
  ["Denim Trucker Jacket", "Jackets", 92, null, ["Blue", "Black"], false],
  ["Waterproof Shell Jacket", "Jackets", 120, 105, ["Grey", "Teal"], true],
  ["Wool Blend Coat", "Jackets", 140, 124, ["Camel", "Charcoal"], false],
  ["Lightweight Windbreaker", "Jackets", 88, 76, ["Navy", "White"], true]
];

const MIN_PRICE_PKR = 1000;
const MAX_PRICE_PKR = 6000;
const roundToNearestFifty = (value) => Math.round(value / 50) * 50;

const basePrices = productSeeds.map((item) => item[2]);
const minBasePrice = Math.min(...basePrices);
const maxBasePrice = Math.max(...basePrices);

const categoryDescriptions = {
  "T-Shirts": "Designed with breathable combed cotton and reinforced seams for all-day comfort.",
  Hoodies: "Crafted with soft fleece interiors and structured silhouettes for layered streetwear style.",
  Pants: "Built with durable stitching and balanced stretch to support both casual and smart outfits.",
  Shirts: "Tailored with clean cuts and premium textures for polished everyday dressing.",
  Jackets: "Engineered with weather-ready materials and modern detailing for versatile outerwear."
};

const categoryImagePools = {
  "T-Shirts": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80"
  ],
  Hoodies: [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80"
  ],
  Pants: [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1603252109303-2751441f6f8b?auto=format&fit=crop&w=900&q=80"
  ],
  Shirts: [
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=80"
  ],
  Jackets: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
  ]
};

const buildImages = (category, idx) => {
  const pool = categoryImagePools[category] || categoryImagePools["T-Shirts"];
  const first = pool[idx % pool.length];
  const second = pool[(idx + 1) % pool.length];
  const third = pool[(idx + 2) % pool.length];
  return [first, second, third];
};

const products = productSeeds.map((item, idx) => {
  const [name, category, price, discountPrice, colors, isBestSeller] = item;
  const rating = Number((3.8 + ((idx % 12) * 0.1)).toFixed(1));
  const priceScale = (price - minBasePrice) / (maxBasePrice - minBasePrice);
  const mappedPrice = MIN_PRICE_PKR + priceScale * (MAX_PRICE_PKR - MIN_PRICE_PKR);
  const increasedPrice = roundToNearestFifty(mappedPrice);

  const increasedDiscountPrice = discountPrice
    ? roundToNearestFifty((discountPrice / price) * increasedPrice)
    : null;

  return {
    name,
    category,
    price: increasedPrice,
    ...(increasedDiscountPrice ? { discountPrice: increasedDiscountPrice } : {}),
    images: buildImages(category, idx),
    description: `${name} is part of our ${category} line. ${categoryDescriptions[category]} Suitable for everyday use with a premium finish and long-lasting comfort.`,
    sizes: ["S", "M", "L", "XL"],
    colors,
    countInStock: 5 + (idx % 16),
    rating,
    numReviews: 2,
    reviews: defaultReviews,
    isBestSeller,
    createdAt: new Date(Date.now() - idx * 24 * 60 * 60 * 1000)
  };
});

export default products;
