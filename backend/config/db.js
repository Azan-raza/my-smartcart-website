import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer = null;
const getNestedMongoError = (error) => {
  const servers = error?.reason?.servers;
  if (!servers?.values) return null;
  for (const server of servers.values()) {
    if (server?.error?.message) return server.error.message;
  }
  return null;
};

export const connectDb = async () => {
  const mongoUri = process.env.MONGO_URI;
  const localUri = "mongodb://127.0.0.1:27017/smartcart";

  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 8000 });
      console.log("Connected to MongoDB using MONGO_URI");
      return true;
    } catch (error) {
      console.error("Failed to connect using MONGO_URI:", error.message);
      const nested = getNestedMongoError(error);
      if (nested) {
        console.error("MongoDB server error detail:", nested);
      }
    }
  }

  // Fallback to local MongoDB if Atlas is unavailable.
  try {
    await mongoose.connect(localUri, { serverSelectionTimeoutMS: 8000 });
    console.log("Connected to local MongoDB");
    return true;
  } catch (error) {
    console.error("Failed to connect to local MongoDB:", error.message);
  }

  // Final fallback for development: start an ephemeral in-memory MongoDB.
  if (process.env.NODE_ENV !== "production") {
    try {
      memoryServer = await MongoMemoryServer.create({
        instance: { dbName: "smartcart" }
      });
      const memoryUri = memoryServer.getUri();
      await mongoose.connect(memoryUri, { serverSelectionTimeoutMS: 8000 });
      console.warn("Using in-memory MongoDB fallback (development only).");
      return true;
    } catch (error) {
      console.error("Failed to start in-memory MongoDB fallback:", error.message);
    }
  }

  return false;
};

export const isDatabaseConnected = () => mongoose.connection.readyState === 1;
