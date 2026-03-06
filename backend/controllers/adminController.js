import Product from "../models/Product.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getAdminStats = asyncHandler(async (req, res) => {
  const [productsCount, usersCount, ordersCount] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments(),
    Order.countDocuments()
  ]);

  res.json({ productsCount, usersCount, ordersCount });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

export const createProduct = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  payload.title = payload.title || payload.name;
  payload.name = payload.name || payload.title;

  const product = new Product(payload);
  await product.save();
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const payload = { ...req.body };
  payload.title = payload.title || payload.name;
  payload.name = payload.name || payload.title;

  Object.assign(product, payload);
  await product.save();

  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

export const promoteUserToAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = "admin";
  await user.save();

  res.json({ message: "User promoted to admin" });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (orderStatus) {
    order.orderStatus = orderStatus;
  }

  if (paymentStatus) {
    order.paymentStatus = paymentStatus;
  }

  await order.save();

  res.json(order);
});
