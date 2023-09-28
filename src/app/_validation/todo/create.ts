import { z } from "zod";

const createTodoSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export { createTodoSchema };

type CreateTodoInput = z.input<typeof createTodoSchema>;

export type { CreateTodoInput };
