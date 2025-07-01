import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import {
  TodoCreateRequest,
  toTodoGetResponse,
  toTodoResponse,
} from "../models/todo-model";
import { UserPayload } from "../models/user-model";
import { TodoValidation } from "../validations/todo-validation";
import { Validation } from "../validations/validation";

export class TodoService {
  static async create(todoCreateRequest: TodoCreateRequest, user: UserPayload) {
    const request = Validation.validate(
      TodoValidation.create,
      todoCreateRequest
    );
    const todo = await prismaClient.todo.create({
      data: {
        title: request.title,
        description: request.description,
        user_id: user.id,
      },
    });

    return toTodoResponse(todo);
  }

  static async update(
    todoCreateRequest: TodoCreateRequest,
    todoId: number,
    user: UserPayload
  ) {
    const request = Validation.validate(
      TodoValidation.create,
      todoCreateRequest
    );

    const todo = await prismaClient.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new ResponseError(404, "Todo not found!");
    }

    if (todo.user_id !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    const todoUpdate = await prismaClient.todo.update({
      where: {
        id: todoId,
      },
      data: {
        title: request.title,
        description: request.description,
        user_id: user.id,
      },
    });

    return toTodoResponse(todoUpdate);
  }

  static async delete(todoId: number, user: UserPayload) {
    const todo = await prismaClient.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      throw new ResponseError(404, "Todo not found!");
    }

    if (todo.user_id !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    const todoUpdate = await prismaClient.todo.delete({
      where: {
        id: todoId,
      },
    });
  }

  static async get(page: number, limit: number, user: UserPayload) {
    const todoTotal = await prismaClient.todo.count();

    const todos = await prismaClient.todo.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return toTodoGetResponse(todos, page, limit, todoTotal / limit);
  }
}
