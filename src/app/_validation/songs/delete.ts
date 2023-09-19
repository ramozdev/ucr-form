import { z } from "zod";

const deleteSongSchema = z.object({ id: z.string() });

export { deleteSongSchema };

type DeleteSongInput = z.input<typeof deleteSongSchema>;

export type { DeleteSongInput };
