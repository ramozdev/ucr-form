import { z } from "zod";

const deleteGenreSchema = z.object({ id: z.string() });

export { deleteGenreSchema };

type DeleteGenreInput = z.input<typeof deleteGenreSchema>;

export type { DeleteGenreInput };
