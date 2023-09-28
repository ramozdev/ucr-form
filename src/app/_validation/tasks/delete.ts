import { z } from "zod";

const deleteTaskSchema = z.string();

export { deleteTaskSchema };

type DeleteTaskInput = z.input<typeof deleteTaskSchema>;

export type { DeleteTaskInput };
