import express, { type Express } from "express";
import globalErrorHandler from "./middlewares/global-error-handler.js";
import cors from "cors";
import routes from "@/routes/index.route.js";

const app: Express = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(globalErrorHandler);

export default app;
