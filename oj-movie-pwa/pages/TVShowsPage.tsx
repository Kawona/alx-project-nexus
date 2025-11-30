import { useEffect, useState } from "react";
import MovieCard from "../src/components/ui/MovieCard";
import type { MovieCardProps } from "../src/services/movieApi";


const dummyTVShows: MovieCardProps[] = [
  {
    id: 66732, 
    title: "Stranger Things",
    poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    year: "2016",
    rating: 8.7,
  },
  {
    id: 1396, 
    title: "Breaking Bad",
    poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    year: "2008",
    rating: 9.5,
  },
  {
    id: 71912, 
    title: "The Witcher",
    poster: "https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
    year: "2019",
    rating: 8.2,
  },
  {
    id: 71446, 
    title: "Money Heist",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    year: "2017",
    rating: 8.3,
  },
  {
    id: 82856, 
    title: "The Mandalorian",
    poster: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
    year: "2019",
    rating: 8.8,
  },
];


export default function TVShowsPage() {
  const [tvShows, setTVShows] = useState<MovieCardProps[]>([]);

  useEffect(() => {
    setTVShows(dummyTVShows);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
        TV Shows
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {tvShows.map((show) => (
          <MovieCard
            key={show.id}
            id={show.id}
            title={show.title}
            poster={show.poster}
            rating={show.rating}
            year={show.year}
          />
        ))}
      </div>
    </div>
  );
}
