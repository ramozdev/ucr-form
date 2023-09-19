import { z } from "zod";

const createAlbumSchema = z.object({
  name: z.string(),
  artistId: z.number(),
});

export { createAlbumSchema };

type CreateAlbumInput = z.input<typeof createAlbumSchema>;

export type { CreateAlbumInput };
