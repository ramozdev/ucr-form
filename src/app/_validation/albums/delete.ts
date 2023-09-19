import { z } from "zod";

const deleteAlbumSchema = z.object({ id: z.string() });

export { deleteAlbumSchema };

type DeleteAlbumInput = z.input<typeof deleteAlbumSchema>;

export type { DeleteAlbumInput };
