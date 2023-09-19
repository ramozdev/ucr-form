import { z } from "zod";

const updateAlbumSchema = z
  .object({
    name: z.string(),
  })
  .partial()
  .extend({
    songId: z.string(),
  });

export { updateAlbumSchema };

type UpdateAlbumInput = z.input<typeof updateAlbumSchema>;

export type { UpdateAlbumInput };
