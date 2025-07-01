import { Request, Response, NextFunction } from "express-serve-static-core";
import { PostRequest } from "../models/post-model";
import { PostService } from "../services/post-service";

export class PostController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const postRequest = req.body as PostRequest;
      const response = await PostService.create(postRequest);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}
