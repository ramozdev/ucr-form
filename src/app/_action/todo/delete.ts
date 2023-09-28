"use server";

import {
  DeleteTodoInput,
  deleteTodoSchema,
} from "@/app/_validation/todo/delete";

export async function deleteTodo(formData: DeleteTodoInput) {
  const result = deleteTodoSchema.parse(formData);

  return result;
}
