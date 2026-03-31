import Link from "next/link";

const TRENDING_FILMS = [
  { title: "ANORA", year: 2024, genre: "Drama" },
  { title: "THE BRUTALIST", year: 2024, genre: "Epic" },
  { title: "PAST LIVES", year: 2023, genre: "Romance" },
  { title: "DUNE: PART TWO", year: 2024, genre: "Sci-Fi" },
  { title: "INTERSTELLAR", year: 2014, genre: "Sci-Fi" },
];

const ACTIVE_ROOMS = [
  { name: "dune-lore-deep-dive", users: 34 },
  { name: "a24-transmission", users: 61 },
  { name: "criterion-archive", users: 22 },
  { name: "horror-void", users: 18 },
];

const LATEST_LOGS = [
  {
    user: "NEON_XAVI",
    film: "Dune: Part Two",
    text: "Villeneuve built a cathedral and then let it breathe. The Giedi Prime sequences shot in UV still make more visual sense than most blockbusters.",
    rating: 4,
    timestamp: "02:17 UTC",
  },
  {
    user: "KIRANREV",
    film: "Past Lives",
    text: "Celine Song understands that longing isn't dramatic. It's quiet. It sits at a bar watching the life you didn't choose.",
    rating: 5,
    timestamp: "05:44 UTC",
  },
  {
    user: "ZONE_PRIYA",
    film: "The Matrix",
    text: "Still the cleanest blend of action and philosophy. The pacing holds up surprisingly well after 25 years.",
    rating: 5,
    timestamp: "10:15 UTC",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">

      {/* ── GRID OVERLAY ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── AMBIENT GLOW ── */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-cyan/5 blur-[120px]" />

      {/* ── NAV BAR ── */}
      <nav className="relative z-10 flex items-center justify-between border-b border-border px-8 py-4 md:px-16">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-cyan/40 text-xs text-cyan">
            ▶
          </div>
          <span className="text-sm font-bold tracking-[0.3em] text-foreground">
            CELLULOID
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden text-xs text-muted-foreground md:inline">
            // NETWORK v0.1
          </span>
          <Link
            href="/sign-in"
            className="border border-border px-4 py-2 text-xs tracking-widest text-muted-foreground transition-all hover:border-cyan/50 hover:text-cyan"
          >
            SIGN IN
          </Link>
          <Link
            href="/sign-up"
            className="border border-cyan/60 bg-cyan/10 px-4 py-2 text-xs tracking-widest text-cyan transition-all hover:bg-cyan/20"
          >
            JOIN
          </Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative z-10 px-8 pb-16 pt-20 md:px-16 md:pt-28">
        <div className="grid gap-16 lg:grid-cols-5">

          {/* LEFT — HEADLINE */}
          <div className="space-y-8 lg:col-span-3">
            {/* Terminal prompt accent */}
            <div className="flex items-center gap-2 text-xs text-cyan">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-cyan" />
              <span className="tracking-[0.2em]">LIVE // CINEMATIC NETWORK</span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight md:text-7xl lg:text-8xl">
              <span className="text-foreground">WHERE</span>
              <br />
              <span className="text-foreground">FILM LOVERS</span>
              <br />
              <span className="bg-gradient-to-r from-cyan to-electric bg-clip-text text-transparent">
                BECOME CRITICS.
              </span>
            </h1>

            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              A dark-mode cinematic network to discover, review, and archive
              films. Real-time rooms. Honest takes. No algorithm — just taste.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/sign-up"
                className="group relative overflow-hidden border border-cyan bg-cyan/10 px-8 py-3.5 text-sm font-medium tracking-[0.2em] text-cyan transition-all hover:bg-cyan/20 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
              >
                <span className="relative z-10">ENTER NETWORK →</span>
              </Link>
              <Link
                href="/sign-in"
                className="border border-border px-8 py-3.5 text-sm tracking-[0.2em] text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
              >
                SIGN IN
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 border-t border-border pt-6">
              {[
                { label: "ACTIVE USERS", value: "2.4K" },
                { label: "FILMS LOGGED", value: "18K" },
                { label: "LIVE ROOMS", value: "12" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-xl font-bold text-cyan md:text-2xl">{stat.value}</p>
                  <p className="text-[10px] tracking-[0.15em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — SYSTEM PANELS */}
          <div className="space-y-4 lg:col-span-2">

            {/* ACTIVE ROOMS */}
            <div className="border border-border bg-card/50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground">
                  // ACTIVE ROOMS
                </p>
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              </div>
              <div className="space-y-2">
                {ACTIVE_ROOMS.map((room) => (
                  <div
                    key={room.name}
                    className="flex items-center justify-between border border-border/50 px-3 py-2 transition-colors hover:border-cyan/30 hover:bg-cyan/5"
                  >
                    <span className="text-xs text-foreground">#{room.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {room.users} online
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TRENDING */}
            <div className="border border-border bg-card/50 p-5">
              <p className="mb-4 text-[10px] tracking-[0.2em] text-muted-foreground">
                // TRENDING NOW
              </p>
              <div className="space-y-2">
                {TRENDING_FILMS.map((film, i) => (
                  <div
                    key={film.title}
                    className="flex items-center gap-3 border border-border/50 px-3 py-2 transition-colors hover:border-cyan/30 hover:bg-cyan/5"
                  >
                    <span className="text-[10px] text-cyan/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-foreground">{film.title}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {film.year} · {film.genre}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SYSTEM STATUS */}
            <div className="border border-border bg-card/50 p-5">
              <p className="mb-3 text-[10px] tracking-[0.2em] text-muted-foreground">
                // SYSTEM STATUS
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API</span>
                  <span className="text-success">OPERATIONAL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TMDB SYNC</span>
                  <span className="text-success">CONNECTED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LATENCY</span>
                  <span className="text-cyan">12ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="relative z-10 mx-8 border-t border-border md:mx-16">
        <span className="absolute -top-2.5 left-8 bg-background px-3 text-[10px] tracking-[0.2em] text-muted-foreground">
          LATEST TRANSMISSIONS
        </span>
      </div>

      {/* ── SAMPLE FEED ── */}
      <section className="relative z-10 px-8 pb-24 pt-12 md:px-16">
        <div className="grid gap-4 md:grid-cols-3">
          {LATEST_LOGS.map((log, i) => (
            <div
              key={i}
              className="group border border-border bg-card/30 p-6 transition-all hover:border-cyan/30 hover:bg-card/60"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-cyan">{log.user}</span>
                <span className="text-[10px] text-muted-foreground">{log.timestamp}</span>
              </div>

              <p className="mb-2 text-xs text-muted-foreground">
                reviewing{" "}
                <span className="text-foreground">{log.film}</span>
              </p>

              <p className="mb-4 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
                {log.text}
              </p>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <span
                    key={si}
                    className={si < log.rating ? "text-cyan text-xs" : "text-border text-xs"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-border px-8 py-6 md:px-16">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center border border-cyan/30 text-[8px] text-cyan">
              ▶
            </div>
            <span className="text-xs tracking-[0.2em] text-muted-foreground">
              CELLULOID © 2026
            </span>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span className="cursor-pointer transition-colors hover:text-cyan">ABOUT</span>
            <span className="cursor-pointer transition-colors hover:text-cyan">PRIVACY</span>
            <span className="cursor-pointer transition-colors hover:text-cyan">TERMS</span>
            <span className="cursor-pointer transition-colors hover:text-cyan">GITHUB</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            // BUILT FOR CINEMA LOVERS
          </p>
        </div>
      </footer>
    </div>
  );
}