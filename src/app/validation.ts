import { z } from "zod";

const itemSchema = z.object({
  value: z.string(),
  action: z.enum(["", "create", "update", "delete", "id"]),
});

const cudAlbumSchema = z.object({
  id: z.string(),
  album: z.object({
    albumId: itemSchema,
    artistId: itemSchema,
    name: itemSchema,
  }),
  genres: z
    .object({
      genreId: itemSchema,
      artistId: itemSchema,
      name: itemSchema,
    })
    .array(),
  songs: z
    .object({
      songId: itemSchema,
      artistId: itemSchema,
      favorite: itemSchema,
      name: itemSchema,
    })
    .array(),
});

export { cudAlbumSchema };

type CudAlbumInput = z.input<typeof cudAlbumSchema>;

export type { CudAlbumInput };
