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

export const mockFilms: MockFilm[] = [
  {
    id: "tt0133093",
    title: "The Matrix",
    year: 1999,
    tagline: "Welcome to the Real World.",
    genres: ["Action", "Sci-Fi"],
  },
  {
    id: "tt0110912",
    title: "Pulp Fiction",
    year: 1994,
    tagline: "Just because you are a character doesn't mean you have character.",
    genres: ["Crime", "Drama"],
  },
  {
    id: "tt0109830",
    title: "Forrest Gump",
    year: 1994,
    tagline: "Life is like a box of chocolates...",
    genres: ["Drama", "Romance"],
  },
  {
    id: "tt0120737",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    tagline: "One ring to rule them all.",
    genres: ["Adventure", "Fantasy"],
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    year: 2014,
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    genres: ["Adventure", "Drama", "Sci-Fi"],
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

