import APIError from "@/lib/error.js";
import type { NextFunction, Request, Response } from "express";

export default function globalErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  void next;

  let customError: APIError;

  if (err instanceof APIError) {
    customError = err;
  } else {
    const unknownError = err as Error;

    customError = new APIError(
      500,
      unknownError.message || "Internal Server Error",
      undefined,
      unknownError.stack
    );
  }

  res.status(customError.statusCode).json({
    success: customError.success,
    statusCode: customError.statusCode,
    message: customError.message,
    error: customError.error,
  });
}
