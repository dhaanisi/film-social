import { Button } from "@repo/design-system/components/ui/button";
import type { Dictionary } from "@repo/internationalization";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";

type CTAProps = {
  dictionary: Dictionary;
};

export const CTA = ({ dictionary }: CTAProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-lg border border-cyan/10 bg-card p-8 text-center lg:p-16">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-electric/20 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-[200px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/5 blur-[80px]" />
        </div>

        <div className="relative flex flex-col gap-4">
          <div className="text-[10px] tracking-[0.3em] text-cyan/50">
            TRANSMISSION_INCOMING
          </div>
          <h3 className="max-w-xl text-3xl font-bold tracking-tighter md:text-5xl">
            Ready to <span className="text-cyan">enter the void</span>?
          </h3>
          <p className="max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground">
            Join thousands of cinephiles in the most opinionated corner of the
            internet. Your terminal awaits.
          </p>
        </div>
        <div className="relative flex flex-row gap-4">
          <Button asChild className="gap-3" variant="outline">
            <Link href="/contact">
              View the feed
            </Link>
          </Button>
          <Button asChild className="gap-3">
            <Link href={env.NEXT_PUBLIC_APP_URL}>
              Initialize account <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);
