"use server";

import {
  DeleteTaskInput,
  deleteTaskSchema,
} from "@/app/_validation/tasks/delete";

export async function deleteTask(formData: DeleteTaskInput) {
  const result = deleteTaskSchema.parse(formData);

  return result;
}
