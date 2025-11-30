import React, { useEffect, useState } from "react";
import Hero from "../src/components/Hero";
import HorizontalMovieSlider from "../src/components/HorizontalMovieSlider";
import type { MovieCardProps } from "../src/services/movieApi";
import {
  fetchLatestMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../src/services/movieApi";

export default function HomePage() {
  const [latestMovies, setLatestMovies] = useState<MovieCardProps[]>([]);
  const [popularMovies, setPopularMovies] = useState<MovieCardProps[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieCardProps[]>([]);

  // Genre-based categories
  const [actionMovies, setActionMovies] = useState<MovieCardProps[]>([]);
  const [comedyMovies, setComedyMovies] = useState<MovieCardProps[]>([]);
  const [sciFiMovies, setSciFiMovies] = useState<MovieCardProps[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);

      try {
        const [latest, popular, topRated] = await Promise.all([
          fetchLatestMovies(),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
        ]);

        setLatestMovies(latest);
        setPopularMovies(popular);
        setTopRatedMovies(topRated);

        setActionMovies(latest.filter((m) => m.genres?.includes(28)));
        setComedyMovies(latest.filter((m) => m.genres?.includes(35)));
        setSciFiMovies(latest.filter((m) => m.genres?.includes(878)));
      } catch (err) {
        console.error("Error loading movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        Loading movies...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <Hero trendingMovies={latestMovies} />

      {/* Movie Sliders */}
      <HorizontalMovieSlider title="Latest Movies" movies={latestMovies} />
      <HorizontalMovieSlider title="Popular Movies" movies={popularMovies} />
      <HorizontalMovieSlider title="Top Rated Movies" movies={topRatedMovies} />
      <HorizontalMovieSlider title="Action Movies" movies={actionMovies} />
      <HorizontalMovieSlider title="Comedy Movies" movies={comedyMovies} />
      <HorizontalMovieSlider title="Sci-Fi Movies" movies={sciFiMovies} />
    </div>
  );
}
