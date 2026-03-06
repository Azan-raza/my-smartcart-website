import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import Product from "../models/Product.js";
import products from "../data/products.js";
import getProductImage from "../utils/getProductImage.js";

dotenv.config();

const seedProducts = async () => {
  const connected = await connectDb();
  if (!connected) {
    throw new Error("No database connection. Set valid MONGO_URI or run local MongoDB.");
  }
  const normalizedProducts = products.map((product) => {
    const title = product.title || product.name;
    const image = getProductImage({
      title,
      description: product.description,
      category: product.category
    });

    return {
      ...product,
      title,
      name: product.name || title,
      image,
      images: [image]
    };
  });
  await Product.deleteMany({});
  await Product.insertMany(normalizedProducts);
  await mongoose.connection.close();
};

seedProducts().catch(async (error) => {
  await mongoose.connection.close();
  process.exit(1);
});
