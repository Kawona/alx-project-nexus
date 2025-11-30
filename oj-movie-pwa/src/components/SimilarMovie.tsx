import { useNavigate } from "react-router-dom";

interface SimilarMovieCard {
  id: number;
  title: string;
  poster: string;
  rating: number;
  release_date: string;
}

interface Props {
  movies: SimilarMovieCard[];
}

export default function SimilarMovies({ movies }: Props) {
  const navigate = useNavigate();

  if (movies.length === 0) return null;

  return (
    <div className="px-10 py-12">
      <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {movies.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/movie/${m.id}`)}
            className="cursor-pointer rounded-lg bg-gray-900 hover:bg-gray-800 transition p-2"
          >
            <img
              src={m.poster}
              alt={m.title}
              className="w-full rounded-lg object-cover"
            />
            <h3 className="text-sm mt-3 font-semibold line-clamp-1">{m.title}</h3>
            <p className="text-xs text-gray-400">
              {m.release_date !== "N/A" ? m.release_date.slice(0, 4) : "Unknown"} •{" "}
              {m.rating.toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
