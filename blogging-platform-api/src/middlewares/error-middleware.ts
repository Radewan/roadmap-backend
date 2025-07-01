import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../errors/response-error";
import { ZodError } from "zod";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: `Validation Errors : ${JSON.stringify(error)}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.statusCode).json({
      error: error.message,
    });
  } else {
    res.status(500).json({
      error: error.message,
    });
  }
};
