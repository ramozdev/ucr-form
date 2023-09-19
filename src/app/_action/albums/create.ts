"use server";

import {
  CreateAlbumInput,
  createAlbumSchema,
} from "@/app/_validation/albums/create";

export function createAlbum(formData: CreateAlbumInput) {
  const { artistId, name } = createAlbumSchema.parse(formData);

  return { artistId, name };
}
