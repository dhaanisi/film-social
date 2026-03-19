import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Input } from "@repo/design-system/components/ui/input";
import Image from "next/image";
import { Header } from "../../components/header";
import { apiTmdbSearchMovies } from "../../film-social/tmdb";

type FilmSearchPageProperties = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export const generateMetadata = async ({
  searchParams,
}: FilmSearchPageProperties) => {
  const { q } = await searchParams;
  const query = q?.trim();

  return {
    title: query ? `${query} - Film search` : "Film search",
    description: query ? `Film search results for ${query}` : "Search films",
  };
};

const FilmSearchPage = async ({ searchParams }: FilmSearchPageProperties) => {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (q === undefined) {
    // Keep URL shape stable for copy/paste and deep-links.
    redirect(`/films/search?q=`);
  }

  const results = query ? await apiTmdbSearchMovies(query) : [];

  return (
    <>
      <Header page="Search films" pages={["Film Social"]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="mx-auto w-full max-w-2xl space-y-4">
          <form action="/films/search" className="flex items-center gap-2">
            <Input
              defaultValue={query}
              name="q"
              placeholder="Search by title, year, genre…"
            />
            <Button type="submit">Search</Button>
          </form>

          <div className="grid gap-3">
            {results.map((film) => (
              <Card key={film.id}>
                <CardHeader className="space-y-1">
                  <div className="flex items-start gap-3">
                    <div className="relative h-[78px] w-[52px] shrink-0 overflow-hidden rounded-md bg-muted">
                      {film.posterUrl ? (
                        <Image
                          alt={`${film.title} poster`}
                          fill
                          sizes="52px"
                          src={film.posterUrl}
                          style={{ objectFit: "cover" }}
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-base">
                        <Link
                          className="hover:underline"
                          href={`/films/${film.id}`}
                        >
                          {film.title}
                          {film.year ? ` (${film.year})` : ""}
                        </Link>
                      </CardTitle>
                      {film.overview ? (
                        <div className="line-clamp-2 text-muted-foreground text-sm">
                          {film.overview}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">TMDB</Badge>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/films/${film.id}`}>Review</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-muted-foreground text-xs">
            Powered by TMDB via `apps/api`. Posters come from `image.tmdb.org`.
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmSearchPage;

