import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDb, isDatabaseConnected } from "./config/db.js";
import { ensureAdminAccount } from "./scripts/ensureAdmin.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes, { stripeWebhookHandler } from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { notFound } from "./middleware/notFoundMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const devLocalhostPattern = /^http:\/\/localhost:\d+$/;
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (process.env.NODE_ENV !== "production" && devLocalhostPattern.test(origin)) {
        return callback(null, true);
      }
      if (origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    credentials: true
  })
);

// Stripe webhook must use raw body before JSON parsing middleware.
app.post(
  "/api/orders/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookHandler
);

app.use(express.json());
app.use("/products", express.static(path.join(__dirname, "public", "products")));

app.use("/api", (req, res, next) => {
  if (req.path === "/health") return next();
  if (!isDatabaseConnected()) {
    return res.status(503).json({
      message: "Database unavailable. Set a valid MONGO_URI in backend/.env and retry."
    });
  }
  return next();
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServerWithPortFallback = (initialPort) => {
  const maxAttempts = 15;
  let attempts = 0;
  let currentPort = Number(initialPort) || 5000;

  const tryListen = () => {
    const server = app.listen(currentPort, () => {
      console.log(`API listening on port ${currentPort}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE" && attempts < maxAttempts) {
        attempts += 1;
        currentPort += 1;
        return tryListen();
      }
      throw error;
    });
  };

  tryListen();
};

connectDb()
  .then(async (connected) => {
    if (connected) {
      await ensureAdminAccount();
    }
  })
  .catch(() => {
    // Start API even if admin bootstrap fails.
  })
  .finally(() => {
    startServerWithPortFallback(PORT);
  });
