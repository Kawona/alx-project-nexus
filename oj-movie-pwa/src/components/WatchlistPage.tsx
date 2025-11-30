import { useEffect, useState } from "react";
import MovieCard from "../components/ui/MovieCard";
import type { MovieCardProps } from "../services/movieApi";
import { getWatchlist, removeFromWatchlist } from "../utils/watchlist";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<MovieCardProps[]>([]);
  const [alert, setAlert] = useState<string>("");

  useEffect(() => {
    setWatchlist(getWatchlist());
  }, []);

  const showAlert = (message: string) => {
    setAlert(message);
    setTimeout(() => setAlert(""), 2000);
  };

  const handleRemove = (id?: number) => {
    if (!id) return;
    removeFromWatchlist(id);
    setWatchlist(getWatchlist());
    showAlert("Movie removed from Watchlist!");
  };

  const handleClearAll = () => {
    localStorage.removeItem("watchlist");
    setWatchlist([]);
    showAlert("Watchlist cleared!");
  };

  const handleWatchTrailer = (trailer?: string) => {
    if (!trailer) {
      showAlert("Trailer not available for this movie.");
      return;
    }
    window.open(trailer, "_blank");
  };

  if (watchlist.length === 0) {
    return (
      <div className="text-center mt-20 text-white">
        <h2 className="text-2xl font-bold mb-4">Your Watchlist is empty</h2>
        <p>Add some movies to your watchlist to see them here!</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {alert && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-2 rounded shadow-lg z-50">
          {alert}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">Your Watchlist</h1>
        <button
          onClick={handleClearAll}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
        >
          Clear All
        </button>
      </div>

      {/* Horizontal Scroll Slider */}
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {watchlist.map((movie) => (
          <div key={movie.id} className="flex-none w-40 sm:w-48 md:w-52 lg:w-56 snap-start">
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster={movie.poster}
              rating={movie.rating}
              year={movie.year}
            />
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => handleRemove(movie.id)}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-semibold text-sm"
              >
                Remove
              </button>
              {movie.trailer && (
                <button
                  onClick={() => handleWatchTrailer(movie.trailer)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded font-semibold text-sm"
                >
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
