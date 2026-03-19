import { env } from "@/env";

export type TmdbSearchResult = {
  id: string;
  title: string;
  year?: number;
  overview: string;
  posterPath: string | null;
  posterUrl?: string;
};

export type TmdbMovie = {
  id: string;
  title: string;
  year?: number;
  overview: string;
  posterPath: string | null;
  posterUrl?: string;
};

export async function apiTmdbSearchMovies(query: string) {
  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("api_key", env.NEXT_PUBLIC_TMDB_API_KEY as string);
  url.searchParams.set("query", query);

  const response = await fetch(url.toString(), { cache: "no-store" });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`API TMDB search failed (${response.status}): ${text}`);
  }

  const data = await response.json();

  return (data.results ?? []).map((movie: any) => ({
    id: String(movie.id),
    title: movie.title,
    year: movie.release_date
      ? Number(movie.release_date.split("-")[0])
      : undefined,
    overview: movie.overview ?? "",
    posterPath: movie.poster_path ?? null,
    posterUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
  }));
}

export async function apiTmdbGetMovie(movieId: string) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}`);
  url.searchParams.set("api_key", env.NEXT_PUBLIC_TMDB_API_KEY as string);

  const response = await fetch(url.toString(), { cache: "no-store" });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`API TMDB movie failed (${response.status}): ${text}`);
  }

  const movie = await response.json();

  return {
    id: String(movie.id),
    title: movie.title,
    year: movie.release_date
      ? Number(movie.release_date.split("-")[0])
      : undefined,
    overview: movie.overview ?? "",
    posterPath: movie.poster_path ?? null,
    posterUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
  };
}
