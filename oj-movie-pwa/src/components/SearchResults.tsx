import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { SimilarMovieResponse } from "../services/movieApi";
import { searchMovies } from "../services/movieApi";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = location.state?.query || "";
  const genre = location.state?.genre || "";

  const [results, setResults] = React.useState<SimilarMovieResponse[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const data = await searchMovies(query);
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, genre]);

  const openMovie = (id: string | number) => {
    navigate(`/movie/${id}`);
  };

  if (!query) {
    return (
      <div className="p-6 text-white">
        <h2>No search query provided.</h2>
      </div>
    );
  }

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for "{query}"
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && <p>No movies found.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {results.map((movie) => (
          <div
            key={movie.id}
            onClick={() => openMovie(movie.id)}
            className="cursor-pointer"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto rounded"
            />
            <p className="mt-2 font-medium">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
