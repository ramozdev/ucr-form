import { z } from "zod";

const createSongSchema = z.object({
  name: z.string(),
  artistId: z.string(),
});

export { createSongSchema };

type CreateSongInput = z.input<typeof createSongSchema>;

export type { CreateSongInput };
