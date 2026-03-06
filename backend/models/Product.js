import mongoose from "mongoose";
import getProductImage from "../utils/getProductImage.js";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    image: { type: String, default: "/products/default-product.jpg" },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    sizes: {
      type: [String],
      enum: ["S", "M", "L", "XL"],
      default: ["S", "M", "L", "XL"]
    },
    colors: { type: [String], required: true },
    countInStock: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
    isBestSeller: { type: Boolean, default: false }
  },
  { timestamps: true }
);

productSchema.pre("validate", function ensureTitleAndImage(next) {
  if (!this.title && this.name) {
    this.title = this.name;
  }
  if (!this.name && this.title) {
    this.name = this.title;
  }

  const imagePath = getProductImage({
    title: this.title || this.name,
    description: this.description,
    category: this.category
  });

  this.image = imagePath;
  if (!Array.isArray(this.images) || !this.images.length) {
    this.images = [imagePath];
  } else {
    this.images[0] = this.images[0] || imagePath;
  }

  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
