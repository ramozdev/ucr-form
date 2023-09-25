import { z } from "zod";

const updateSongSchema = z
  .object({
    name: z.string(),
    favorite: z.string(),
    artistId: z.string(),
  })
  .partial()
  .extend({
    songId: z.string(),
  });

export { updateSongSchema };

type UpdateSongInput = z.input<typeof updateSongSchema>;

export type { UpdateSongInput };
