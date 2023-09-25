"use server";

import {
  DeleteSongInput,
  deleteSongSchema,
} from "@/app/_validation/songs/delete";

export async function deleteSong(formData: DeleteSongInput) {
  const { id: songId } = deleteSongSchema.parse(formData);

  return { id: songId };
}
