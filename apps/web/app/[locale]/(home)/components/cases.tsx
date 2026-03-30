"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@repo/design-system/components/ui/carousel";
import type { Dictionary } from "@repo/internationalization";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

type CasesProps = {
  dictionary: Dictionary;
};

const filmPosters = [
  { title: "DUNE: PART TWO", year: 2024, rating: 4.5 },
  { title: "PAST LIVES", year: 2023, rating: 5 },
  { title: "THE MATRIX", year: 1999, rating: 5 },
  { title: "INTERSTELLAR", year: 2014, rating: 4 },
  { title: "PULP FICTION", year: 1994, rating: 5 },
  { title: "PARASITE", year: 2019, rating: 5 },
  { title: "MOONLIGHT", year: 2016, rating: 4.5 },
  { title: "ARRIVAL", year: 2016, rating: 4 },
  { title: "HER", year: 2013, rating: 4.5 },
  { title: "BLADE RUNNER 2049", year: 2017, rating: 4.5 },
];

export const Cases = ({ dictionary }: CasesProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <div className="w-full border-y border-cyan/5 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-muted-foreground/40">
            <div className="h-[1px] w-8 bg-cyan/20" />
            NOW_TRENDING
          </div>
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {filmPosters.map((film, index) => (
                <CarouselItem
                  className="basis-1/3 md:basis-1/4 lg:basis-1/5"
                  key={index}
                >
                  <div className="group flex aspect-[2/3] flex-col items-center justify-end rounded-lg border border-cyan/10 bg-muted/30 p-4 transition-all duration-300 hover:border-cyan/30 hover:shadow-lg hover:shadow-cyan/5">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span className="text-[10px] font-bold tracking-tight text-foreground/80 transition-colors group-hover:text-cyan">
                        {film.title}
                      </span>
                      <span className="text-[9px] text-muted-foreground/40">
                        {film.year}
                      </span>
                      <div className="mt-1 flex items-center gap-0.5">
                        {Array.from(
                          { length: Math.floor(film.rating) },
                          (_, i) => (
                            <Star
                              className="h-2.5 w-2.5 fill-cyan/20 text-cyan"
                              key={i}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
