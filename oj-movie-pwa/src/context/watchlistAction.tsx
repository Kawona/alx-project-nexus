import React from "react";
import type { FullMovie } from "../services/movieApi";
import { useAuth } from "../context/AuthContext";
import { useWatchlist } from "../context/WatchlistContext";
import { Button } from "../components/Button";

export default function WatchlistAction({ movie }: { movie: FullMovie }) {
  const auth = useAuth();
  const watch = useWatchlist();

  if (!watch) return null;

  const inList = watch.isInWatchlist(movie.id);

  const handleAdd = () => {
    auth?.requireAuth(() => {
      const added = watch.addToWatchlist(movie);
      if (added) alert("Added to watchlist");
      else alert("Already in watchlist");
    });
  };

  const handleRemove = () => {
    auth?.requireAuth(() => {
      watch.removeFromWatchlist(movie.id);
      alert("Removed from watchlist");
    });
  };

  return inList ? (
    <Button
      variant="secondary"
      size="md"
      onClick={handleRemove}
    >
      Remove from Watchlist
    </Button>
  ) : (
    <Button
      variant="primary"
      size="md"
      onClick={handleAdd}
    >
      + Add to Watchlist
    </Button>
  );
}
