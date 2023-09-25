"use server";

import {
  UpdateSongInput,
  updateSongSchema,
} from "@/app/_validation/songs/update";

export async function updateSong(formData: UpdateSongInput) {
  const { songId, name } = updateSongSchema.parse(formData);

  return { songId, name };
}
