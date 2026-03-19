import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Separator } from "@repo/design-system/components/ui/separator";
import Image from "next/image";
import { Header } from "../../components/header";
import { apiTmdbGetMovie } from "../../film-social/tmdb";
import { getMockReviewsForFilm } from "../../film-social/mock";
import { ReviewComposer } from "./review-composer";

type FilmPageProperties = {
  params: Promise<{
    filmId: string;
  }>;
};

export const generateMetadata = async ({ params }: FilmPageProperties) => {
  const { filmId } = await params;
  const film = await apiTmdbGetMovie(filmId).catch(() => null);

  if (!film) {
    return {
      title: "Film not found",
    };
  }

  return {
    title: `${film.title} (${film.year})`,
    description: film.overview ? film.overview : `Reviews for ${film.title}`,
  };
};

const FilmPage = async ({ params }: FilmPageProperties) => {
  const { filmId } = await params;
  const film = await apiTmdbGetMovie(filmId).catch(() => null);

  if (!film) {
    notFound();
  }

  const reviews = getMockReviewsForFilm(filmId);

  return (
    <>
      <Header page={film.title} pages={["Film Social", "Films"]}>
        <div className="mr-4 flex items-center gap-2">
          <Button asChild size="sm" variant="secondary">
            <Link href="/feed">Feed</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/films/search">Pick another film</Link>
          </Button>
        </div>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="mx-auto w-full max-w-2xl space-y-4">
          <Card>
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="relative h-[150px] w-[100px] shrink-0 overflow-hidden rounded-md bg-muted">
                    {film.posterUrl ? (
                      <Image
                        alt={`${film.title} poster`}
                        fill
                        sizes="100px"
                        src={film.posterUrl}
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <CardTitle className="text-lg">
                      {film.title}{" "}
                      {film.year ? (
                        <span className="text-muted-foreground">({film.year})</span>
                      ) : null}
                    </CardTitle>
                    {film.overview ? (
                      <div className="text-sm text-muted-foreground">
                        {film.overview}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">TMDB</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <ReviewComposer filmId={film.id} filmTitle={film.title} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  No reviews yet.
                </div>
              ) : (
                reviews.map((r) => (
                  <div className="space-y-2" key={r.id}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-medium">
                        {r.author.name}{" "}
                        <span className="text-muted-foreground text-xs">
                          @{r.author.handle}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={r.spoiler ? "destructive" : "secondary"}>
                          {r.spoiler ? "Spoilers" : "No spoilers"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {"★".repeat(r.rating)}
                    </div>
                    <p className="text-sm">{r.text}</p>
                    <Separator />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FilmPage;

