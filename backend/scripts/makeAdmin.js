import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const makeAdmin = async () => {
  const email = process.argv[2];

  if (!email) {
    throw new Error("Provide user email: npm run make-admin -- user@example.com");
  }

  const connected = await connectDb();
  if (!connected) {
    throw new Error("No database connection. Set valid MONGO_URI or run local MongoDB.");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  user.role = "admin";
  await user.save();

  await mongoose.connection.close();
};

makeAdmin().catch(async () => {
  await mongoose.connection.close();
  process.exit(1);
});
