"use server";

import {
  CreateSongInput,
  createSongSchema,
} from "@/app/_validation/songs/create";

export function createSong(formData: CreateSongInput) {
  const { artistId, name } = createSongSchema.parse(formData);

  return { artistId, name };
}
