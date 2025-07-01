import { UserLoginRequest, UserRegisterRequest } from "../models/user-model";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user-service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userRegisterRequest = req.body as UserRegisterRequest;
      const response = await UserService.register(userRegisterRequest);
      res.status(201).json({
        token: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userLoginRequest = req.body as UserLoginRequest;
      const response = await UserService.login(userLoginRequest);
      res.status(200).json({
        token: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
