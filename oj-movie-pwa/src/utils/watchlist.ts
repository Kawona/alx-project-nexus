export const getWatchlist = (): any[] => {
  try {
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
  } catch {
    return [];
  }
};

export const addToWatchlist = (movie: any) => {
  const stored = localStorage.getItem("watchlist");
  let list = stored ? JSON.parse(stored) : [];

  const exists = list.some((m: any) => m.id === movie.id);
  if (!exists) {
    list.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(list));
  }
};

export const removeFromWatchlist = (id: number) => {
  const list = getWatchlist().filter((m: any) => m.id !== id);
  localStorage.setItem("watchlist", JSON.stringify(list));
};
