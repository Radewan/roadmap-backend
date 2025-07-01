import { Response, NextFunction } from "express";
import { TodoCreateRequest } from "../models/todo-model";
import { TodoService } from "../services/todo-service";
import { UserRequest } from "../types/user-request";

export class TodoController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const todoCreateRequest = req.body as TodoCreateRequest;
      const response = await TodoService.create(todoCreateRequest, user);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}
