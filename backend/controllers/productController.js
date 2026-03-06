import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 9);
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { title: { $regex: req.query.search, $options: "i" } }
    ];
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.bestSeller === "true") {
    query.isBestSeller = true;
  }

  if (req.query.inStock === "true") {
    query.countInStock = { $gt: 0 };
  }

  const sort = {};
  if (req.query.sort === "price-asc") {
    sort.price = 1;
  } else if (req.query.sort === "price-desc") {
    sort.price = -1;
  } else {
    sort.createdAt = -1;
  }

  const [products, total] = await Promise.all([
    Product.find(query).sort(sort).skip(skip).limit(limit),
    Product.countDocuments(query)
  ]);

  res.json({
    products,
    page,
    totalPages: Math.ceil(total / limit),
    total
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id }
  })
    .limit(4)
    .sort({ createdAt: -1 });

  res.json({ product, relatedProducts });
});

export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const alreadyReviewed = product.reviews.find((r) => r.name === req.user.name);
  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You already reviewed this product");
  }

  product.reviews.push({
    name: req.user.name,
    rating: Number(rating),
    comment,
    date: new Date()
  });

  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.numReviews;

  await product.save();

  res.status(201).json({ message: "Review added" });
});
