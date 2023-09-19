"use server";

import {
  DeleteGenreInput,
  deleteGenreSchema,
} from "@/app/_validation/genres/delete";

export function deleteGenre(formData: DeleteGenreInput) {
  const { id: genreId } = deleteGenreSchema.parse(formData);

  return { id: genreId };
}
