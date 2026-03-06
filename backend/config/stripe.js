import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;
