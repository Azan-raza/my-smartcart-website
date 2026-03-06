import express from "express";
import {
  getAdminStats,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  promoteUserToAdmin
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/stats", getAdminStats);

router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/users", getAllUsers);
router.patch("/users/:id/promote", promoteUserToAdmin);

router.get("/orders", getAllOrders);
router.patch("/orders/:id/status", updateOrderStatus);

export default router;
