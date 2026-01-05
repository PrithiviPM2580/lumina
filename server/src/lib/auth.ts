import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDatabaseConnection } from "@/config/database.config.js";
import APIError from "./error.js";

const client = getDatabaseConnection();

if (!client.db) {
  throw new APIError(500, "Database connection is not established.");
}
const auth = betterAuth({
  database: mongodbAdapter(client.db),
  emailAndPassword: {
    enabled: true,
  },
});

export default auth;
