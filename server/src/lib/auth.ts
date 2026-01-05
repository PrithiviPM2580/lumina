import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDatabaseConnection } from "@/config/database.config.js";
import APIError from "./error.js";
import { bearer } from "better-auth/plugins";

const client = getDatabaseConnection();

if (!client.db) {
  throw new APIError(500, "Database connection is not established.");
}
const auth = betterAuth({
  database: mongodbAdapter(client.db),
  plugins: [bearer()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  basePath: "/api/v1/auth",
});

export default auth;
