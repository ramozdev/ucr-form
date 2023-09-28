import { z } from "zod";

const deleteTodoSchema = z.string();

export { deleteTodoSchema };

type DeleteTodoInput = z.input<typeof deleteTodoSchema>;

export type { DeleteTodoInput };
