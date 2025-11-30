import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { MovieCardProps } from "../services/movieApi";
import { useAuth } from "./AuthContext";

type WatchlistContextType = {
  watchlist: MovieCardProps[];
  addToWatchlist: (movie: MovieCardProps) => boolean;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  clearWatchlist: () => void;
};

const WatchlistContext = createContext<WatchlistContextType | null>(null);

const STORAGE_KEY = "watchlist_v1";

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<MovieCardProps[]>([]);
  const auth = useAuth();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWatchlist(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load watchlist:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (e) {
      console.error("Failed to save watchlist:", e);
    }
  }, [watchlist]);

  const addToWatchlist = (movie: MovieCardProps) => {
    if (!auth || !auth.user) return false;

    if (watchlist.some((m) => m.id === movie.id)) return false;

    setWatchlist((prev) => [movie, ...prev]);
    return true;
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  const isInWatchlist = (id: number) => watchlist.some((m) => m.id === id);

  const clearWatchlist = () => setWatchlist([]);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        clearWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext)!;
