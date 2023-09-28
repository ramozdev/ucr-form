"use server";

import {
  UpdateTodoInput,
  updateTodoSchema,
} from "@/app/_validation/todo/update";

export async function updateTodo(formData: UpdateTodoInput) {
  const result = updateTodoSchema.parse(formData);

  return result;
}
