"use server";

import {
  UpdateSongInput,
  updateSongSchema,
} from "@/app/_validation/songs/update";

export function updateSong(formData: UpdateSongInput) {
  const { songId, name } = updateSongSchema.parse(formData);

  return { songId, name };
}
