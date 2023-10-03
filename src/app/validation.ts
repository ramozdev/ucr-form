import { z } from "zod";

const cudItemSchema = z.object({
  value: z.string(),
  action: z.enum(["", "CREATE", "UPDATE", "REMOVE", "ID"]),
});

const cudTodoSchema = z.object({
  todo: z.object({
    todoId: cudItemSchema,
    name: cudItemSchema,
    description: cudItemSchema,
  }),
  tasks: z
    .object({
      taskId: cudItemSchema,
      name: cudItemSchema,
      completed: cudItemSchema.pick({ action: true }).extend({
        value: z.boolean(),
      }),
    })
    .array(),
});

export { cudTodoSchema };

type CudTodoInput = z.input<typeof cudTodoSchema>;

export type { CudTodoInput };
