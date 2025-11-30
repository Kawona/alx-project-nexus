import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Play, Plus, ThumbsUp } from "lucide-react";
import { Button } from "../src/components/Button";

import CastSection from "../src/components/CastSection";
import TrailerSection from "../src/components/movie/TrailerSection";
import SimilarMovies from "../src/components/SimilarMovie";

import {
  fetchMovieDetails,
  fetchSimilarMovies,
  type MovieDetailsResponse,
  type CastMemberResponse,
  type SimilarMovieResponse,
} from "../src/services/movieApi";

import { useWatchlist } from "../src/context/WatchlistContext";
import { useAuth } from "../src/context/AuthContext";

// FIXED Movie Interface
interface Movie {
  id: number;
  title: string;
  year: string;
  rating: number; // FIXED (was string)
  duration?: string; // FIXED (optional, API does not provide it)
  genre: string[];
  description: string;
  banner: string;
  poster: string;
  trailer?: string;
  cast: CastMemberResponse[];
}

// FIXED Similar Movie Interface
interface SimilarMovieCard {
  id: number;
  title: string;
  poster: string;
  rating: number;
  release_date: string;
}

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovieCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [playTrailer, setPlayTrailer] = useState(false);

  const watchlist = useWatchlist();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const loadMovieData = async () => {
      setLoading(true);
      try {
        const data: MovieDetailsResponse = await fetchMovieDetails(Number(id));

        // FIX rating, description, genres, banner fallback
        const movieData: Movie = {
          id: data.id,
          title: data.title,
          year: data.year ?? "N/A",
          rating: data.rating ?? 0, // FIX: Always number
          duration: data.duration ?? undefined, // FIX optional field
          genre: data.genres ?? [], // FIX: array fallback
          description: data.description ?? "No description available.",
          banner: data.banner || data.poster,
          poster: data.poster,
          trailer: data.trailer,
          cast: data.main_actors ?? [],
        };

        setMovie(movieData);

        // Load Similar Movies
        const similar: SimilarMovieResponse[] = await fetchSimilarMovies(Number(id));

        const mappedSimilar: SimilarMovieCard[] = similar.map((m) => ({
          id: m.id,
          title: m.title,
          poster: m.poster,
          rating: m.rating ?? 0, // FIX: number only
          release_date: m.year ?? "Unknown",
        }));

        setSimilarMovies(mappedSimilar);

        // Auto-play trailer if ?trailer=true
        if (searchParams.get("trailer") === "true" && movieData.trailer) {
          setPlayTrailer(true);
        }
      } catch (err) {
        console.error("Failed to load movie:", err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    loadMovieData();
  }, [id, searchParams]);

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  if (!movie)
    return <div className="text-white text-center mt-20">Movie not found.</div>;

  const isAdded = watchlist?.isInWatchlist(movie.id) ?? false;

  const handleToggleWatchlist = () => {
    auth.requireAuth(() => {
      if (!watchlist) return;
      if (isAdded) {
        watchlist.removeFromWatchlist(movie.id);
      } else {
        watchlist.addToWatchlist(movie);
      }
    });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO */}
      <div
        className="relative w-full h-[75vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        <div className="absolute bottom-16 left-10 max-w-xl">
          <div className="flex items-start gap-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-40 rounded-lg shadow-lg"
            />

            <div>
              <h1 className="text-4xl font-extrabold mb-2">{movie.title}</h1>

              <div className="flex items-center gap-3 text-gray-300 text-sm mb-3">
                <span>{movie.year}</span> |{" "}
                <span>{movie.rating} Rating</span> |{" "}
                <span>{movie.duration ?? "N/A"}</span>
              </div>

              <p className="text-gray-300 mb-4">{movie.description}</p>

              {/* GENRES */}
              <div className="flex gap-2 mb-4">
                {movie.genre.map((g, i) => (
                  <span key={i} className="text-xs bg-gray-800 px-3 py-1 rounded-full">
                    {g}
                  </span>
                ))}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-4 mt-4">
                {movie.trailer && (
                  <Button
                    variant="primary"
                    size="md"
                    icon={Play}
                    onClick={() => setPlayTrailer(true)}
                  >
                    Play Trailer
                  </Button>
                )}

                <Button
                  variant="secondary"
                  size="md"
                  icon={Plus}
                  onClick={handleToggleWatchlist}
                >
                  {isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
                </Button>

                <Button variant="secondary" size="md" icon={ThumbsUp}>
                  Like
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRAILER */}
      {playTrailer && movie.trailer && (
        <TrailerSection youtubeKey={movie.trailer} title={movie.title} />
      )}

      {/* CAST */}
      <CastSection cast={movie.cast} />

      {/* SIMILAR MOVIES */}
      {similarMovies.length > 0 && (
        <div className="mt-10 px-10">
          <h2 className="text-xl font-semibold mb-4">Similar Movies</h2>
          <SimilarMovies movies={similarMovies} />
        </div>
      )}
    </div>
  );
}
