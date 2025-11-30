import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { FullMovie } from "../services/movieApi";
import { useAuth } from "./AuthContext";

type WatchlistContextType = {
  watchlist: FullMovie[];
  addToWatchlist: (movie: FullMovie) => boolean;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  clearWatchlist: () => void;
};

const WatchlistContext = createContext<WatchlistContextType | null>(null);

const STORAGE_KEY = "watchlist_v1";

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<FullMovie[]>([]);
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

  const addToWatchlist = (movie: FullMovie) => {
    if (!auth || !auth.user) {
      // consumer should call auth.requireAuth before calling addToWatchlist,
      // but we also protect here
      return false;
    }
    if (watchlist.some((m) => m.id === movie.id)) return false;
    setWatchlist((s) => [movie, ...s]);
    return true;
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((s) => s.filter((m) => m.id !== id));
  };

  const isInWatchlist = (id: number) => watchlist.some((m) => m.id === id);

  const clearWatchlist = () => setWatchlist([]);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, clearWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
