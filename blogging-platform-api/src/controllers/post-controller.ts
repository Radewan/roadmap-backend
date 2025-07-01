import { Request, Response, NextFunction } from "express-serve-static-core";
import { PostRequest } from "../models/post-model";
import { PostService } from "../services/post-service";
import { ResponseError } from "../errors/response-error";

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

  static async put(req: Request, res: Response, next: NextFunction) {
    try {
      const postRequest = req.body as PostRequest;
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        throw new ResponseError(400, "Invalid post id");
      }
      const response = await PostService.put(postRequest, postId);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        throw new ResponseError(400, "Invalid post id");
      }
      await PostService.delete(postId);
      res.status(204).json({});
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = parseInt(req.params.postId);
      if (isNaN(postId)) {
        throw new ResponseError(400, "Invalid post id");
      }
      const response = await PostService.get(postId);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const term = (req.query.term as string) ?? "";
      const response = await PostService.getAll(term);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
