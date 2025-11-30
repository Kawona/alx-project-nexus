import React, { useEffect, useState } from "react";
import MovieCard from "../src/components/ui/MovieCard";
import type { MovieCardProps } from "../src/services/movieApi";

// Placeholder TV shows with genre added
const dummyTVShows: MovieCardProps[] = [
  { id: 101, title: "Stranger Things", poster: "/stranger-things.jpg", year: "2016", rating: 8.7, genre: ["Sci-Fi", "Drama"] },
  { id: 102, title: "Breaking Bad", poster: "/breaking-bad.jpg", year: "2008", rating: 9.5, genre: ["Crime", "Drama"] },
  { id: 103, title: "The Witcher", poster: "/witcher.jpg", year: "2019", rating: 8.2, genre: ["Fantasy", "Action"] },
  { id: 104, title: "Money Heist", poster: "/money-heist.jpg", year: "2017", rating: 8.3, genre: ["Crime", "Thriller"] },
  { id: 105, title: "The Mandalorian", poster: "/mandalorian.jpg", year: "2019", rating: 8.8, genre: ["Action", "Adventure", "Sci-Fi"] },
  { id: 106, title: "Loki", poster: "/loki.jpg", year: "2021", rating: 8.2, genre: ["Action", "Fantasy", "Adventure"] },
];

export default function TVShowsPage() {
  const [tvShows, setTVShows] = useState<MovieCardProps[]>([]);

  useEffect(() => {
    // Simulate fetch
    setTVShows(dummyTVShows);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
        TV Shows
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {tvShows.map((show) => (
          <MovieCard
            key={show.id}
            id={show.id}
            title={show.title}
            poster={show.poster}
            rating={show.rating}
            year={show.year}
            genre={show.genre} // <-- added
          />
        ))}
      </div>
    </div>
  );
}
