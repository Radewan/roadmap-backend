import { prismaClient } from "../applications/database";
import { TodoCreateRequest, toTodoResponse } from "../models/todo-model";
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
}
