import { z } from "zod";

const updateGenreSchema = z
  .object({
    name: z.string(),
  })
  .partial()
  .extend({
    songId: z.string(),
  });

export { updateGenreSchema };

type UpdateGenreInput = z.input<typeof updateGenreSchema>;

export type { UpdateGenreInput };
