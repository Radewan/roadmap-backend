import { Todo } from "@prisma/client";

export interface TodoResponse {
  id: number;
  title: string;
  description: string;
}

export interface TodoCreateRequest{
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
