import { z } from "zod";

const updateTaskSchema = z
  .object({
    name: z.string(),
    completed: z.boolean(),
  })
  .partial()
  .extend({
    taskId: z.string(),
  });

export { updateTaskSchema };

type UpdateTaskInput = z.input<typeof updateTaskSchema>;

export type { UpdateTaskInput };
