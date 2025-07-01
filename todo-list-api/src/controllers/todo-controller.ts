import { Response, NextFunction } from "express";
import { TodoCreateRequest } from "../models/todo-model";
import { TodoService } from "../services/todo-service";
import { UserRequest } from "../types/user-request";
import { ResponseError } from "../errors/response-error";

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

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const todoId = parseInt(req.params.todoId);
      if (isNaN(todoId)) {
        throw new ResponseError(400, "Invalid todoId");
      }
      const todoCreateRequest = req.body as TodoCreateRequest;
      const response = await TodoService.update(
        todoCreateRequest,
        todoId,
        user
      );
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const todoId = parseInt(req.params.todoId);
      if (isNaN(todoId)) {
        throw new ResponseError(400, "Invalid todoId");
      }
      await TodoService.delete(todoId, user);
      res.status(204).json({});
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      let page = parseInt(req.query.page as string);
      if (isNaN(page)) {
        page = 1;
      }
      let limit = parseInt(req.query.limit as string);
      if (isNaN(limit)) {
        limit = 10;
      }
      const response = await TodoService.get(page, limit, user);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
