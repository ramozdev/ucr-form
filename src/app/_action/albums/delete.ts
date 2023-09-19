"use server";

import {
  DeleteAlbumInput,
  deleteAlbumSchema,
} from "@/app/_validation/albums/delete";

export function deleteAlbum(formData: DeleteAlbumInput) {
  const { id } = deleteAlbumSchema.parse(formData);

  return { id };
}
