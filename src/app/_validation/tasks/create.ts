import { z } from "zod";

const createTaskSchema = z.object({
  name: z.string(),
  completed: z.boolean(),
});

export { createTaskSchema };

type CreateTaskInput = z.input<typeof createTaskSchema>;

export type { CreateTaskInput };
