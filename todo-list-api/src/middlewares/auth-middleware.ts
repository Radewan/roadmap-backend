import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../types/user-request";
import { UserPayload } from "../models/user-model";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw "Unauthorized";
    }

    const secretKey = process.env.JWT_SECRET_KEY as string;
    const user = jwt.verify(token, secretKey);
    (req as UserRequest).user = user as UserPayload;
    next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
