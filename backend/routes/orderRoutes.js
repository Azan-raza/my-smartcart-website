import express from "express";
import {
  createCheckoutSession,
  placeCashOnDeliveryOrder,
  getMyOrders,
  confirmCheckoutSession,
  handleStripeWebhook
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout-session", protect, createCheckoutSession);
router.post("/cod", protect, placeCashOnDeliveryOrder);
router.get("/confirm", protect, confirmCheckoutSession);
router.get("/my-orders", protect, getMyOrders);

export const stripeWebhookHandler = handleStripeWebhook;

export default router;
