"use server";

import {
  UpdateAlbumInput,
  updateAlbumSchema,
} from "@/app/_validation/albums/update";

export function updateAlbum(formData: UpdateAlbumInput) {
  const { songId, name } = updateAlbumSchema.parse(formData);

  return { songId, name };
}
