import { z } from "zod";

const ucrItemSchema = z.object({
  value: z.string(),
  action: z.enum(["", "CREATE", "UPDATE", "REMOVE", "ID"]),
});

const ucrTodoSchema = z.object({
  todo: z.object({
    todoId: ucrItemSchema,
    name: ucrItemSchema,
    description: ucrItemSchema,
  }),
  tasks: z
    .object({
      taskId: ucrItemSchema,
      name: ucrItemSchema,
      completed: ucrItemSchema.pick({ action: true }).extend({
        value: z.boolean(),
      }),
    })
    .array(),
});

export { ucrTodoSchema };

type UcrTodoInput = z.input<typeof ucrTodoSchema>;

export type { UcrTodoInput };
