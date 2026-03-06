import bcrypt from "bcryptjs";
import User from "../models/User.js";

const DEFAULT_ADMIN_EMAIL = "aazan3045@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "korejoazan12";
const DEFAULT_ADMIN_NAME = "Smartcart Admin";

export const ensureAdminAccount = async () => {
  const email = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase();
  const password = (process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD).trim();
  const name = (process.env.ADMIN_NAME || DEFAULT_ADMIN_NAME).trim();

  if (!email || !password) {
    return;
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });
    return;
  }

  let shouldSave = false;

  if (existingUser.role !== "admin") {
    existingUser.role = "admin";
    shouldSave = true;
  }

  const matchesPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchesPassword) {
    existingUser.password = await bcrypt.hash(password, 10);
    shouldSave = true;
  }

  if (shouldSave) {
    await existingUser.save();
  }
};
