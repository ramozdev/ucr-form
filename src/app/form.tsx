"use client";

import { CudAlbumInput, cudAlbumSchema } from "@/app/validation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition } from "react";
import { deleteGenre } from "@/app/_action/genres/delete";
import { deleteSong } from "@/app/_action/songs/delete";
import { createSong } from "@/app/_action/songs/create";
import { updateGenre } from "@/app/_action/genres/update";
import { updateSong } from "@/app/_action/songs/update";
import { createGenre } from "@/app/_action/genres/create";
import { UpdateSongInput } from "@/app/_validation/songs/update";
import { UpdateGenreInput } from "@/app/_validation/genres/update";
import { CreateGenreInput } from "@/app/_validation/genres/create";
import { CreateSongInput } from "@/app/_validation/songs/create";
import {
  processArrayCreate,
  processArrayDelete,
  processArrayUpdate,
  processObjectUpdate,
} from "@/lib/cud";

type Props = {
  defaultData?: CudAlbumInput;
};

export default function Form({ defaultData }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors, defaultValues },
  } = useForm<CudAlbumInput>({
    defaultValues: defaultData,
    resolver: zodResolver(cudAlbumSchema, undefined, { raw: true }),
  });

  const debugPayload = {
    update: {
      album: processObjectUpdate(watch("album")),
      genres: processArrayUpdate(watch("genres")) as UpdateGenreInput[],
      songs: processArrayUpdate(watch("songs")) as UpdateSongInput[],
    },
    delete: {
      genres: processArrayDelete(watch("genres")),
      songs: processArrayDelete(watch("songs")),
    },
    create: {
      genres: processArrayCreate(watch("genres")) as CreateGenreInput[],
      songs: processArrayCreate(watch("songs")) as CreateSongInput[],
    },
  };

  const onSubmit = handleSubmit(({ id, album, genres, songs }) => {
    startTransition(() => {
      try {
        const payload = {
          update: {
            album: processObjectUpdate(album),
            genres: processArrayUpdate(genres) as UpdateGenreInput[],
            songs: processArrayUpdate(songs) as UpdateSongInput[],
          },
          delete: {
            genres: processArrayDelete(genres),
            songs: processArrayDelete(songs),
          },
          create: {
            genres: processArrayCreate(genres) as CreateGenreInput[],
            songs: processArrayCreate(songs) as CreateSongInput[],
          },
        };

        console.log({ payload });

        // for (const id of payload.delete.genres) {
        //   deleteGenre({ id });
        // }
        // for (const id of payload.delete.songs) {
        //   deleteSong({ id });
        // }
        for (const task of payload.create.genres) {
          createGenre({
            ...task,
            artistId: id,
          });
        }
        for (const step of payload.create.songs) {
          createSong({
            ...step,
            artistId: id,
          });
        }
        for (const task of payload.update.genres) {
          updateGenre(task);
        }
        for (const step of payload.update.songs) {
          updateSong(step);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });
  });

  const _genres = useFieldArray({ control, name: "genres", keyName: "_id" });
  const _songs = useFieldArray({ control, name: "songs", keyName: "_id" });

  return (
    <main className="max-w-screen-md mx-auto">
      <form onSubmit={onSubmit} className="grid">
        <label>Album Name</label>
        <input
          {...register("album.name.value", {
            onChange: ({ target }) => {
              const { value } = target as HTMLInputElement;
              setValue(`album.name.value`, value);
              if (value !== defaultValues?.album?.name?.value) {
                setValue(`album.name.action`, `update`);
                return;
              }
              setValue(`album.name.action`, "");
            },
          })}
        />
        {/* <label>Artist</label>
        <input />
        <label>Year</label>
        <input />
        <label>Genre</label>
        <input />
        <label>Rating</label>
        <input />
        <label>Songs</label>
        <input /> */}

        <div className="mb-4">
          {_songs.fields.map((field, index) => {
            if (field.songId.action === "delete") return null;

            return (
              <div key={field._id}>
                <div className="flex gap-2">
                  <div>
                    <label htmlFor={`songs.${index}.name.value`}>Name</label>
                    <input
                      {...register(`songs.${index}.name.value`, {
                        onChange: ({ target }) => {
                          const { value } = target as HTMLInputElement;
                          setValue(`songs.${index}.name.value`, value);
                          if (field.songId.action !== "create") {
                            if (
                              value !==
                              defaultValues?.songs?.[index]?.name?.value
                            ) {
                              setValue(`songs.${index}.name.action`, `update`);
                              return;
                            }
                            setValue(`songs.${index}.name.action`, "");
                          }
                        },
                      })}
                    />
                  </div>
                  <button
                    type="button"
                    className="mt-auto"
                    onClick={() => {
                      if (field.songId.value === "") {
                        _songs.remove(index);
                        return;
                      }
                      _songs.update(index, {
                        ...field,
                        songId: {
                          ...field.songId,
                          action: "delete",
                        },
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center">
            <button
              type="button"
              className="mb-8"
              onClick={() => {
                _songs.append({
                  favorite: { value: "1", action: "create" },
                  name: { value: "", action: "create" },
                  songId: { value: "", action: "create" },
                  artistId: { value: "", action: "create" },
                });
              }}
            >
              Añadir tarea
            </button>
          </div>
        </div>

        <button>Save changes</button>
      </form>

      <pre>{JSON.stringify(debugPayload, null, 2)}</pre>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </main>
  );
}
