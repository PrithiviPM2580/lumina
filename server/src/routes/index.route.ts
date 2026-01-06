import { sendResponse } from "@/utils/index.js";
import { Router } from "express";
import { type Request, type Response, type NextFunction } from "express";
import mongoose from "mongoose";
import documentRoute from "@/routes/document.route.js";

const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    sendResponse(res, 200, "Lumina API is running successfully", {
      appName: "Lumina",
      status: process.uptime() > 0 ? "Running" : "Stopped",
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || "1.0.0",
      env: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/health", (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbState =
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    sendResponse(res, 200, "Health check successful", {
      status: "ok",
      service: "Lumina API",
      environment: process.env.NODE_ENV || "development",
      database: dbState,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024 + " MB",
    });
  } catch (error) {
    next(error);
  }
});

router.use("/api/v1/documents", documentRoute);

router.get("*", (_req: Request, res: Response, next: NextFunction) => {
  try {
    sendResponse(res, 404, "Route not found");
  } catch (error) {
    next(error);
  }
});

export default router;
