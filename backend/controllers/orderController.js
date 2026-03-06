import mongoose from "mongoose";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { stripe } from "../config/stripe.js";
import asyncHandler from "../middleware/asyncHandler.js";

const getPrimaryImage = (product) =>
  product.image || (Array.isArray(product.images) && product.images.length ? product.images[0] : "/products/default-product.jpg");

export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!items || !items.length) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const normalizedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error("Invalid product in cart");
      }

      const effectivePrice = product.discountPrice || product.price;

      return {
        product: product._id,
        name: product.name,
        image: getPrimaryImage(product),
        price: effectivePrice,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      };
    })
  );

  const totalAmount = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    items: normalizedItems,
    shippingAddress,
    totalAmount,
    paymentMethod: "Stripe",
    paymentStatus: "Pending",
    orderStatus: "Processing"
  });

  const lineItems = normalizedItems.map((item) => {
    const absoluteHttpsImage = /^https:\/\//i.test(item.image) ? item.image : null;
    return {
    price_data: {
      currency: "pkr",
      product_data: {
        name: `${item.name} (${item.size}/${item.color})`,
        ...(absoluteHttpsImage ? { images: [absoluteHttpsImage] } : {})
      },
      unit_amount: Math.round(item.price * 100)
    },
    quantity: item.quantity
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    metadata: {
      orderId: order._id.toString(),
      userId: req.user._id.toString()
    }
  });

  order.stripeSessionId = session.id;
  await order.save();

  res.status(201).json({ url: session.url });
});

export const placeCashOnDeliveryOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!items || !items.length) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const normalizedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error("Invalid product in cart");
      }

      const effectivePrice = product.discountPrice || product.price;

      return {
        product: product._id,
        name: product.name,
        image: getPrimaryImage(product),
        price: effectivePrice,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      };
    })
  );

  const totalAmount = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    items: normalizedItems,
    shippingAddress,
    totalAmount,
    paymentMethod: "CashOnDelivery",
    paymentStatus: "Pending",
    orderStatus: "Processing"
  });

  res.status(201).json({
    message: "Order placed with Cash on Delivery",
    order
  });
});

export const confirmCheckoutSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
    res.status(400);
    throw new Error("sessionId is required");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const order = await Order.findOne({ stripeSessionId: sessionId }).populate(
    "items.product",
    "name title image images"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (session.payment_status === "paid" && order.paymentStatus !== "Paid") {
    order.paymentStatus = "Paid";
    await order.save();
  }

  res.json({ order });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session?.metadata?.orderId && mongoose.Types.ObjectId.isValid(session.metadata.orderId)) {
      await Order.findByIdAndUpdate(session.metadata.orderId, { paymentStatus: "Paid" });
    }
  }

  if (event.type === "checkout.session.async_payment_failed") {
    const session = event.data.object;
    if (session?.metadata?.orderId && mongoose.Types.ObjectId.isValid(session.metadata.orderId)) {
      await Order.findByIdAndUpdate(session.metadata.orderId, { paymentStatus: "Failed" });
    }
  }

  res.json({ received: true });
};
