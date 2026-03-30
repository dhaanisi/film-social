import type { Dictionary } from "@repo/internationalization";
import { Film, MessageSquare, Star, Users } from "lucide-react";

type FeaturesProps = {
  dictionary: Dictionary;
};

const features = [
  {
    icon: Film,
    title: "REVIEW_ENGINE",
    description:
      "Write and publish film reviews with terminal-grade precision. Rate, tag, and archive your cinematic experiences.",
    span: "lg:col-span-2",
  },
  {
    icon: MessageSquare,
    title: "LIVE_ROOMS",
    description:
      "Join real-time discussions. Every room is a channel. Every channel is a community.",
    span: "",
  },
  {
    icon: Star,
    title: "RATING_SYSTEM",
    description:
      "A nuanced five-star system with half-star precision. Your taste, quantified.",
    span: "",
  },
  {
    icon: Users,
    title: "SOCIAL_GRAPH",
    description:
      "Follow critics, build watchlists, and discover films through the people you trust.",
    span: "lg:col-span-2",
  },
];

export const Features = ({ dictionary }: FeaturesProps) => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-cyan/60">
            <div className="h-[1px] w-8 bg-cyan/30" />
            SYSTEM_MODULES
          </div>
          <h2 className="max-w-xl text-left text-3xl font-bold tracking-tighter md:text-5xl">
            Built for the <span className="text-cyan">obsessed</span>.
          </h2>
          <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-lg">
            Every feature is designed for people who don't just watch films —
            they study them.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group flex aspect-square h-full flex-col justify-between rounded-lg border border-cyan/10 bg-card p-6 transition-all duration-300 hover:border-cyan/30 hover:shadow-lg hover:shadow-cyan/5 lg:aspect-auto ${feature.span}`}
            >
              <div className="flex items-center gap-3">
                <feature.icon className="h-6 w-6 text-cyan/60 transition-colors group-hover:text-cyan" />
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground/40">
                  v2.0.4
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold tracking-tight text-foreground/90 transition-colors group-hover:text-cyan">
                  {feature.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
