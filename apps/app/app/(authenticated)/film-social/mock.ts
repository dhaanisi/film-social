export type MockFilm = {
  id: string;
  title: string;
  year: number;
  posterUrl?: string;
  tagline?: string;
  genres: string[];
};

export type MockReview = {
  id: string;
  filmId: string;
  author: {
    name: string;
    handle: string;
    avatarUrl?: string;
  };
  rating: 1 | 2 | 3 | 4 | 5;
  spoiler: boolean;
  text: string;
  createdAt: string; // ISO
};

export type MockRoom = {
  id: string;
  name: string;
  usersCount: number;
  lastMessage?: string;
};

export const mockFilms: MockFilm[] = [
  {
    id: "tt0133093",
    title: "The Matrix",
    year: 1999,
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    tagline: "Welcome to the Real World.",
    genres: ["Action", "Sci-Fi"],
  },
  {
    id: "tt0110912",
    title: "Pulp Fiction",
    year: 1994,
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    tagline: "Just because you are a character doesn't mean you have character.",
    genres: ["Crime", "Drama"],
  },
  {
    id: "tt0109830",
    title: "Forrest Gump",
    year: 1994,
    posterUrl: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    tagline: "Life is like a box of chocolates...",
    genres: ["Drama", "Romance"],
  },
  {
    id: "tt0120737",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    tagline: "One ring to rule them all.",
    genres: ["Adventure", "Fantasy"],
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    year: 2014,
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    genres: ["Adventure", "Drama", "Sci-Fi"],
  },
  {
    id: "tt15239678",
    title: "Dune: Part Two",
    year: 2024,
    posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nez7H.jpg",
    tagline: "Long live the fighters.",
    genres: ["Adventure", "Drama", "Sci-Fi"],
  },
  {
    id: "tt13238346",
    title: "Past Lives",
    year: 2023,
    posterUrl: "https://image.tmdb.org/t/p/w500/rzO71VFelMZgUxgME0KJ3yrf5rS.jpg",
    tagline: "What if you left your life behind?",
    genres: ["Drama", "Romance"],
  },
];

export const mockReviews: MockReview[] = [
  {
    id: "r1",
    filmId: "tt0133093",
    author: { name: "Aarav", handle: "aarav" },
    rating: 5,
    spoiler: false,
    text: "Still the cleanest blend of action and philosophy. The pacing holds up surprisingly well.",
    createdAt: "2026-03-01T10:15:00.000Z",
  },
  {
    id: "r2",
    filmId: "tt0816692",
    author: { name: "Maya", handle: "maya" },
    rating: 4,
    spoiler: true,
    text: "The emotional beats land. The third act is a little messy, but the spectacle is unmatched.",
    createdAt: "2026-03-05T18:42:00.000Z",
  },
  {
    id: "r3",
    filmId: "tt0110912",
    author: { name: "Ishaan", handle: "ishaan" },
    rating: 5,
    spoiler: false,
    text: "Iconic dialogue, perfect needle drops. Every scene feels like a short film.",
    createdAt: "2026-03-10T08:02:00.000Z",
  },
  {
    id: "r4",
    filmId: "tt15239678",
    author: { name: "NEON_XAVI", handle: "neon_xavi" },
    rating: 4,
    spoiler: false,
    text: "Villeneuve built a cathedral and then let it breathe. The Giedi Prime sequences shot in UV still make more visual sense than most blockbusters. Zendaya barely speaks and owns every frame she's in.",
    createdAt: "2026-03-15T02:17:00.000Z",
  },
  {
    id: "r5",
    filmId: "tt13238346",
    author: { name: "KIRANREV", handle: "kiranrev" },
    rating: 5,
    spoiler: false,
    text: "Celine Song understands that longing isn't dramatic. It's quiet. It sits at a bar watching the life you didn't choose and somehow doesn't break you. One of the decade's best — already.",
    createdAt: "2026-03-18T05:44:00.000Z",
  },
];

export const mockRooms: MockRoom[] = [
  {
    id: "room-1",
    name: "dune-lore-deep-dive",
    usersCount: 34,
    lastMessage: "the spice must flow but first the runtime...",
  },
  {
    id: "room-2",
    name: "horror-void",
    usersCount: 18,
    lastMessage: "that jump scare in the hallway was peak",
  },
  {
    id: "room-3",
    name: "a24-transmission",
    usersCount: 61,
  },
  {
    id: "room-4",
    name: "criterion-archive",
    usersCount: 22,
    lastMessage: "the new 4k restorations are immaculate",
  },
  {
    id: "room-5",
    name: "directors-cut",
    usersCount: 12,
  },
];

export function searchMockFilms(query: string): MockFilm[] {
  const q = query.trim().toLowerCase();
  if (!q) return mockFilms;
  return mockFilms.filter((f) => {
    const haystack = `${f.title} ${f.year} ${f.genres.join(" ")}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function getMockFilm(filmId: string): MockFilm | undefined {
  return mockFilms.find((f) => f.id === filmId);
}

export function getMockReviewsForFilm(filmId: string): MockReview[] {
  return mockReviews
    .filter((r) => r.filmId === filmId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
