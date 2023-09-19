import { z } from "zod";

const createGenreSchema = z.object({
  name: z.string(),
  artistId: z.number(),
});

export { createGenreSchema };

type CreateGenreInput = z.input<typeof createGenreSchema>;

export type { CreateGenreInput };
