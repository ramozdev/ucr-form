"use server";

import {
  UpdateTaskInput,
  updateTaskSchema,
} from "@/app/_validation/tasks/update";

export async function updateTask(formData: UpdateTaskInput) {
  const result = updateTaskSchema.parse(formData);

  return result;
}
