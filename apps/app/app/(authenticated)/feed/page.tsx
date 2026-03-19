import Link from "next/link";
import { Header } from "../components/header";
import {
  Avatar,
  AvatarFallback,
} from "@repo/design-system/components/ui/avatar";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/design-system/components/ui/card";
import { Separator } from "@repo/design-system/components/ui/separator";
import { getMockFilm, mockReviews } from "../film-social/mock";

const FeedPage = async () => {
  const reviews = [...mockReviews].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <>
      <Header page="Feed" pages={["Film Social"]}>
        <div className="mr-4 flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/films/search">Write a review</Link>
          </Button>
        </div>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="mx-auto w-full max-w-2xl space-y-4">
          {reviews.map((review) => {
            const film = getMockFilm(review.filmId);
            if (!film) return null;
            const initials = review.author.name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <Card key={review.id}>
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="leading-tight">
                        <div className="font-medium">{review.author.name}</div>
                        <div className="text-muted-foreground text-xs">
                          @{review.author.handle}
                        </div>
                      </div>
                    </div>
                    <Badge variant={review.spoiler ? "destructive" : "secondary"}>
                      {review.spoiler ? "Spoilers" : "No spoilers"}
                    </Badge>
                  </div>
                  <Separator />
                  <CardTitle className="text-base">
                    <Link className="hover:underline" href={`/films/${film.id}`}>
                      {film.title} ({film.year})
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    {"★".repeat(review.rating)}
                    <span className="ml-2 text-xs">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{review.text}</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary" disabled>
                      Like
                    </Button>
                    <Button size="sm" variant="secondary" disabled>
                      Comment
                    </Button>
                    <Button size="sm" variant="secondary" disabled>
                      Share
                    </Button>
                    <span className="ml-auto text-xs text-muted-foreground">
                      Mock feed (API wiring next)
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FeedPage;

