"use server";

import {
  UpdateAlbumInput,
  updateAlbumSchema,
} from "@/app/_validation/albums/update";

export async function updateAlbum(formData: UpdateAlbumInput) {
  const { songId, name } = updateAlbumSchema.parse(formData);

  return { songId, name };
}
