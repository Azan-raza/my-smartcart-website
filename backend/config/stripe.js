import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in backend/.env");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
