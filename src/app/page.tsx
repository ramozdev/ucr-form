import Form from "@/app/form";
import { CudAlbumInput } from "@/app/validation";

const songs = [
  {
    songId: "1",
    name: "Song 1",
    favorite: "true",
    artistId: "1",
  },
  {
    songId: "2",
    name: "Song 2",
    favorite: "true",
    artistId: "1",
  },
  {
    songId: "3",
    name: "Song 3",
    favorite: "true",
    artistId: "1",
  },
];

const genres = [
  {
    genreId: "1",
    name: "Genre 1",
    artistId: "1",
  },
  {
    genreId: "2",
    name: "Genre 2",
    artistId: "1",
  },
];

const defaultData: CudAlbumInput = {
  id: "1",
  album: {
    albumId: {
      action: "id",
      value: "12",
    },
    artistId: {
      action: "",
      value: "232",
    },
    name: {
      action: "",
      value: "Album 1",
    },
  },
  genres: genres.map((genre) => ({
    genreId: {
      action: "id",
      value: genre.genreId,
    },
    name: {
      action: "",
      value: genre.name,
    },
    artistId: {
      action: "",
      value: genre.artistId,
    },
  })),
  songs: songs.map((song) => ({
    songId: {
      action: "id",
      value: song.songId,
    },
    name: {
      action: "",
      value: song.name,
    },
    favorite: {
      action: "",
      value: song.favorite,
    },
    artistId: {
      action: "",
      value: song.artistId,
    },
  })),
};

export default function Home() {
  return (
    <main className="max-w-screen-md mx-auto">
      <Form defaultData={defaultData} />
    </main>
  );
}
