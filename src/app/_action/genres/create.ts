"use server";

import {
  UpdateGenreInput,
  updateGenreSchema,
} from "@/app/_validation/genres/update";

export function updateGenre(formData: UpdateGenreInput) {
  const { songId, name } = updateGenreSchema.parse(formData);

  return { songId, name };
}
