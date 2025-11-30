import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { addToWatchlist } from "../../utils/watchlist";
import { useAuth } from "../../context/AuthContext";

export interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  rating?: number;
  year?: string;
  trailer?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster,
  rating,
  year,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth()!;

  const handleAddToWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!user) {
      alert("You must sign in to add movies to your watchlist.");
      navigate("/signin");
      return;
    }

    addToWatchlist({ id, title, poster, rating, year });
    alert("Added to Watchlist!");
  };

  return (
    <div
      onClick={() => navigate(`/movie/${id}`)}
      className="group cursor-pointer bg-[#1a1a1a] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
    >
      <div className="relative">
        <img src={poster} alt={title} className="w-full h-64 object-cover" />

        {rating && (
          <div className="absolute top-2 left-3 flex items-center gap-1 bg-black/70 px-2 py-1 rounded text-yellow-400 text-xs font-bold">
            <FaStar /> {rating}
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-white font-bold text-lg">{title}</h3>
        {year && <p className="text-gray-400 text-sm">{year}</p>}

        <button
          onClick={handleAddToWatchlist}
          className="w-full bg-gray-700 text-white px-2 py-1 rounded"
        >
          + Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
