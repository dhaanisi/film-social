import { tmdbGetMovie, tmdbPosterUrl } from "@/lib/tmdb";

export const GET = async (
  _request: Request,
  context: { params: Promise<{ movieId: string }> }
) => {
  const { movieId } = await context.params;
  const movie = await tmdbGetMovie(movieId);

  return Response.json({
    id: String(movie.id),
    title: movie.title,
    year: movie.release_date ? Number(movie.release_date.slice(0, 4)) : undefined,
    overview: movie.overview ?? "",
    posterPath: movie.poster_path ?? null,
    posterUrl: tmdbPosterUrl(movie.poster_path, "w500"),
  });
};

