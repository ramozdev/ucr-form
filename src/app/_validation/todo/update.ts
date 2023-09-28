import { z } from "zod";

const updateTodoSchema = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .partial()
  .extend({
    taskId: z.string(),
  });

export { updateTodoSchema };

type UpdateTodoInput = z.input<typeof updateTodoSchema>;

export type { UpdateTodoInput };
