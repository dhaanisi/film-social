import { tmdbPosterUrl, tmdbSearchMovies } from "@/lib/tmdb";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  const results = await tmdbSearchMovies(q);

  return Response.json({
    results: results.map((m) => ({
      id: String(m.id),
      title: m.title,
      year: m.release_date ? Number(m.release_date.slice(0, 4)) : undefined,
      overview: m.overview ?? "",
      posterPath: m.poster_path ?? null,
      posterUrl: tmdbPosterUrl(m.poster_path, "w342"),
    })),
  });
};

