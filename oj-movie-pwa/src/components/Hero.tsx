import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MovieCardProps } from "../services/movieApi";
import { addToWatchlist } from "../utils/watchlist";


const defaultMovie: MovieCardProps = {
  id: 0,
  title: "Default Movie",
  poster: "/default-poster.jpg",
  year: "2025",
  genres: [28], 
  rating: 8.0,
  trailer: "",
};

interface HeroProps {
  trendingMovies: MovieCardProps[];
}

export default function Hero({ trendingMovies }: HeroProps) {
  const [movie, setMovie] = useState<MovieCardProps | null>(defaultMovie);
  const navigate = useNavigate();

  useEffect(() => {
    if (trendingMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * trendingMovies.length);
      setMovie(trendingMovies[randomIndex]);
    } else {
      setMovie(defaultMovie);
    }
  }, [trendingMovies]);

  if (!movie) return null;

  const handleExplore = () => {
    if (movie.id !== 0) {
      navigate(`/movie/${movie.id}`);
    } else {
      alert("Movie details not available.");
    }
  };

  const handleWatchTrailer = () => {
    if (movie.id && movie.trailer) {
      navigate(`/movie/${movie.id}?trailer=true`);
    } else {
      alert("Trailer not available for this movie.");
    }
  };

  const handleAddToWatchlist = () => {
    if (movie.id !== 0) {
      addToWatchlist(movie);
      alert("Added to Watchlist!");
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.poster}')` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl h-full mx-auto flex items-center">
        <div className="flex flex-col gap-6 ml-10">
          
          {/* Title & Genre */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg">
              {movie.title}
            </h1>

            
            <p className="text-gray-300 text-lg md:text-xl mt-2">
              {movie.genres?.join(", ")} • {movie.year}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleExplore}
              className="bg-yellow-400 text-black px-5 py-2 rounded font-semibold hover:bg-yellow-500 transition"
            >
              Explore Now
            </button>

            <button
              onClick={handleWatchTrailer}
              className="bg-transparent border border-gray-500 text-white px-5 py-2 rounded font-semibold hover:bg-gray-700 transition"
            >
              Watch Trailer
            </button>

            <button
              onClick={handleAddToWatchlist}
              className="bg-gray-700 text-white px-5 py-2 rounded font-semibold hover:bg-gray-600 transition"
            >
              + Watchlist
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
