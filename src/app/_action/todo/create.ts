"use server";

import {
  CreateTodoInput,
  createTodoSchema,
} from "@/app/_validation/todo/create";

export async function createTodo(formData: CreateTodoInput) {
  const result = createTodoSchema.parse(formData);

  return result;
}
