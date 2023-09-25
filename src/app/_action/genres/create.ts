"use server";

import {
  CreateGenreInput,
  createGenreSchema,
} from "@/app/_validation/genres/create";

export async function createGenre(formData: CreateGenreInput) {
  const { artistId, name } = createGenreSchema.parse(formData);

  return { artistId, name };
}
