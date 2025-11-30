import { Navigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/Button";

const WatchlistPage: React.FC = () => {
  const auth = useAuth();
  const watch = useWatchlist();

  if (!auth?.user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!watch) return null;

  const movies = watch.watchlist;

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Your Watchlist</h2>

      {movies.length === 0 ? (
        <p className="text-gray-400 text-lg">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((m) => (
            <div
              key={m.id}
              className="bg-[#111] p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={m.poster}
                alt={m.title}
                className="w-full h-64 object-cover rounded-md mb-3"
              />

              <p className="font-semibold text-base mb-2">{m.title}</p>

              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => watch.removeFromWatchlist(m.id)}
              >
                Remove from Watchlist
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
