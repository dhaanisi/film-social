import { env } from "@/env";
import { z } from "zod";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function ensureConfigured() {
  if (!env.TMDB_ACCESS_TOKEN) {
    throw new Error(
      "TMDB is not configured. Set TMDB_ACCESS_TOKEN with your TMDB v4 read access token."
    );
  }

  return env.TMDB_ACCESS_TOKEN;
}

function tmdbHeaders(): HeadersInit {
  const accessToken = ensureConfigured();

  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

function tmdbUrl(path: string, params?: Record<string, string | undefined>) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined) url.searchParams.set(key, value);
  }

  return url.toString();
}

const TmdbMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string().optional().catch(""),
  release_date: z.string().optional().catch(""),
  poster_path: z.string().nullable().optional().catch(null),
});

const TmdbSearchResponseSchema = z.object({
  results: z.array(TmdbMovieSchema),
});

export type TmdbMovie = z.infer<typeof TmdbMovieSchema>;

export async function tmdbSearchMovies(query: string): Promise<TmdbMovie[]> {
  const q = query.trim();
  if (!q) return [];

  const response = await fetch(
    tmdbUrl("/search/movie", {
      query: q,
      include_adult: "false",
      language: "en-US",
      page: "1",
    }),
    {
      headers: tmdbHeaders(),
      // Cache search a bit to be nice to TMDB.
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`TMDB search failed (${response.status}): ${text}`);
  }

  const json = await response.json();
  const parsed = TmdbSearchResponseSchema.parse(json);
  return parsed.results;
}

export async function tmdbGetMovie(movieId: string): Promise<TmdbMovie> {
  const response = await fetch(
    tmdbUrl(`/movie/${encodeURIComponent(movieId)}`, {
      language: "en-US",
    }),
    {
      headers: tmdbHeaders(),
      next: { revalidate: 60 * 60 },
    }
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`TMDB movie failed (${response.status}): ${text}`);
  }

  const json = await response.json();
  return TmdbMovieSchema.parse(json);
}

export function tmdbPosterUrl(
  posterPath: string | null | undefined,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" = "w342"
) {
  if (!posterPath) return undefined;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

