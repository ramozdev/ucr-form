"use server";

import {
  CreateTaskInput,
  createTaskSchema,
} from "@/app/_validation/tasks/create";

export async function createTask(formData: CreateTaskInput) {
  const result = createTaskSchema.parse(formData);

  return result;
}
