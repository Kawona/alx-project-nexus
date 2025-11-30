import React, { useState } from "react";
import { fetchMoviesByGenre } from "../src/services/movieApi";
import MovieCard from "../src/components/ui/MovieCard";
import type { MovieCardProps } from "../src/types/MovieCardProps";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 878, name: "Sci-Fi" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
];

export default function MoviesGenrePage() {
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleGenreClick = async (genreId: number) => {
    setSelected(genreId);
    setLoading(true);

    try {
      const results = await fetchMoviesByGenre(genreId);
      setMovies(results);
    } catch (error) {
      console.error("Failed to load movies by genre:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Browse by Genre</h1>

      {/* Genre Buttons */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {GENRES.map((g) => (
          <button
            key={g.id}
            onClick={() => handleGenreClick(g.id)}
            className={`px-4 py-2 rounded-lg border transition 
              ${
                selected === g.id
                  ? "bg-yellow-400 text-black border-yellow-500"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700"
              }
            `}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && <p className="text-lg">Loading...</p>}

      {/* No movies */}
      {!loading && movies.length === 0 && selected && (
        <p>No movies found for this genre.</p>
      )}

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {!loading &&
          movies.map((m) => (
            <MovieCard key={m.id} {...m} />
          ))}
      </div>
    </div>
  );
}
