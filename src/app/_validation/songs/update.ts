import { z } from "zod";

const updateSongSchema = z
  .object({
    name: z.string(),
    favorite: z.boolean(),
    artistId: z.number(),
  })
  .partial()
  .extend({
    songId: z.string(),
  });

export { updateSongSchema };

type UpdateSongInput = z.input<typeof updateSongSchema>;

export type { UpdateSongInput };
