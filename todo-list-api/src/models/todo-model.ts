import { Todo } from "@prisma/client";

export interface TodoResponse {
  id: number;
  title: string;
  description: string;
}

export interface TodoCreateRequest {
  title: string;
  description: string;
}

export const toTodoResponse = (todo: Todo): TodoResponse => {
  return {
    id: todo.id,
    title: todo.title,
    description: todo.description,
  };
};

export interface TodoGetResponse {
  data: TodoResponse[];
  page: number;
  limit: number;
  total: number;
}

export const toTodoGetResponse = (
  todos: Todo[],
  page: number,
  limit: number,
  total: number
): TodoGetResponse => {
  console.log(total);
  return {
    data: todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
    })),
    page: page,
    limit: limit,
    total: Math.ceil(total),
  };
};
