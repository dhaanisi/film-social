import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { Film, MoveRight, Terminal } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";

type HeroProps = {
  dictionary: Dictionary;
};

export const Hero = async ({ dictionary }: HeroProps) => (
  <div className="relative w-full overflow-hidden">
    {/* Grid background */}
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-[150px]" />
      <div className="absolute right-1/4 top-3/4 h-[300px] w-[300px] rounded-full bg-electric/5 blur-[100px]" />
    </div>

    <div className="container relative mx-auto px-4">
      <div className="flex flex-col items-center justify-center gap-10 py-28 lg:py-48">
        {/* Status badge */}
        <div className="flex items-center gap-2.5 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5">
          <Film className="h-3.5 w-3.5 text-cyan" />
          <span className="text-[11px] tracking-[0.2em] text-cyan/80">
            THE SOCIAL LAYER FOR CINEMA
          </span>
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
        </div>

        {/* Main heading */}
        <div className="flex flex-col items-center gap-6">
          <h1 className="max-w-4xl text-center text-5xl font-bold tracking-tighter md:text-8xl">
            <span className="text-cyan">CELLU</span>
            <span className="text-foreground">LOID</span>
          </h1>
          <div className="mx-auto h-[1px] w-40 bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
          <p className="max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
            Review films. Join live discussions. Build your watchlist.
            Connect with cinephiles who speak fluent cinema.
          </p>
        </div>

        {/* Terminal preview */}
        <div className="w-full max-w-lg rounded-lg border border-cyan/10 bg-black/60 p-5">
          <div className="flex items-center gap-2 border-b border-cyan/5 pb-3">
            <div className="h-2 w-2 rounded-full bg-cyan/30" />
            <div className="h-2 w-2 rounded-full bg-electric/30" />
            <div className="h-2 w-2 rounded-full bg-muted-foreground/20" />
            <span className="ml-2 text-[10px] text-muted-foreground/40">
              celluloid://terminal
            </span>
          </div>
          <div className="space-y-2 pt-3 text-sm text-muted-foreground/70">
            <p>
              <span className="text-cyan">~$</span> celluloid init --user new
            </p>
            <p>
              <span className="text-electric">→</span> Loading cinema
              database...
            </p>
            <p>
              <span className="text-electric">→</span> Connecting to live
              rooms...
            </p>
            <p>
              <span className="text-cyan">✓</span>{" "}
              <span className="text-cyan">Ready.</span> Welcome to Celluloid.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="gap-3" size="lg" variant="outline">
            <Link href="#features">See how it works</Link>
          </Button>
          <Button asChild className="gap-3" size="lg">
            <Link href={`${env.NEXT_PUBLIC_APP_URL}/sign-up`}>
              Get Started <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Subtle stats */}
        <div className="flex items-center gap-6 text-[11px] tracking-[0.15em] text-muted-foreground/40 sm:gap-8">
          <span>12,847 USERS</span>
          <span className="text-cyan/20">|</span>
          <span>94,231 REVIEWS</span>
          <span className="text-cyan/20">|</span>
          <span>342 LIVE ROOMS</span>
        </div>
      </div>
    </div>
  </div>
);
