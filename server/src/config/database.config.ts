import mongoose from "mongoose";
import APIError from "@/lib/error.js";

let isConnected = false;
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new APIError(
      500,
      "Failed to connect to MongoDB",
      {
        type: "DatabaseError",
        details: [
          {
            field: "MONGODB_URI",
            message:
              "Could not connect to the database. Please check the connection string.",
          },
        ],
      },
      (error as Error).stack
    );
  }
};

export const getDatabaseConnection = () => {
  if (!isConnected) {
    throw new APIError(500, "Database not connected", {
      type: "DatabaseError",
      details: [
        {
          field: "MONGODB_URI",
          message: "Database connection has not been established.",
        },
      ],
    });
  }
  return mongoose.connection;
};
