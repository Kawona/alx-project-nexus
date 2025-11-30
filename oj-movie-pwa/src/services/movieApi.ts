import axios from "axios";

const API = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "en-US",
  },
});


export interface RawMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  overview?: string;
  genre_ids?: number[];
}

export interface RawCast {
  name: string;
  character: string;
  profile_path: string | null;
}

export interface FullMovie {
  id: number;
  title: string;
  poster: string;
  rating?: number;
  year?: string;
  trailer?: string;
  genres?: number[];
  description?: string;
  cast?: CastMemberResponse[];
}


export interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  rating?: number;
  year?: string;
  trailer?: string;
  genres?: number[];
}

// Cast used in MovieDetails → CastSection
export interface CastMemberResponse {
  name: string;
  role: string;
  image: string;
}

// Similar movies mapping
export interface SimilarMovieResponse {
  id: number;
  title: string;
  poster: string;
  rating?: number;
  year?: string;
}

// Movie Details full response for MovieDetails.tsx
export interface MovieDetailsResponse {
  id: number;
  title: string;
  poster: string;
  duration?: string;
  rating?: number;
  year: string;
  description: string;
  banner: string;
  trailer?: string;
  genres: string[];
  main_actors: CastMemberResponse[];
}


// Converts TMDB RawMovie → UI MovieCardProps
export function mapToMovieCard(movie: RawMovie): MovieCardProps {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/placeholder.png",
    rating: movie.vote_average
      ? Number(movie.vote_average.toFixed(1))
      : undefined,
    year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
    genres: movie.genre_ids ?? [],
  };
}

// Now Playing
export async function fetchLatestMovies(): Promise<MovieCardProps[]> {
  const res = await API.get("/movie/now_playing");
  return res.data.results.map(mapToMovieCard);
}

// Popular
export async function fetchPopularMovies(): Promise<MovieCardProps[]> {
  const res = await API.get("/movie/popular");
  return res.data.results.map(mapToMovieCard);
}

// Top Rated
export async function fetchTopRatedMovies(): Promise<MovieCardProps[]> {
  const res = await API.get("/movie/top_rated");
  return res.data.results.map(mapToMovieCard);
}

// Search
export async function searchMovies(query: string): Promise<MovieCardProps[]> {
  const res = await API.get("/search/movie", { params: { query } });
  return res.data.results.map(mapToMovieCard);
}

// Movies by Genre
export async function fetchMoviesByGenre(
  genreId: number
): Promise<MovieCardProps[]> {
  const res = await API.get("/discover/movie", {
    params: { with_genres: genreId },
  });
  return res.data.results.map(mapToMovieCard);
}

// Similar Movies
export async function fetchSimilarMovies(
  id: number
): Promise<SimilarMovieResponse[]> {
  const res = await API.get(`/movie/${id}/similar`);
  return res.data.results.map((m: any) => ({
    id: m.id,
    title: m.title,
    poster: m.poster_path
      ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
      : "/placeholder.png",
    rating: m.vote_average
      ? Number(m.vote_average.toFixed(1))
      : undefined,
    year: m.release_date ? m.release_date.split("-")[0] : "N/A",
  }));
}


export async function fetchMovieDetails(
  id: number
): Promise<MovieDetailsResponse> {
  const res = await API.get(`/movie/${id}`);

  // Trailer
  const videos = await API.get(`/movie/${id}/videos`);
  const trailer = videos.data.results.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  // Cast (first 10)
  const castRes = await API.get(`/movie/${id}/credits`);
  const main_actors: CastMemberResponse[] = castRes.data.cast
    .slice(0, 10)
    .map((c: any) => ({
      name: c.name,
      role: c.character,
      image: c.profile_path
        ? `https://image.tmdb.org/t/p/w500${c.profile_path}`
        : "/placeholder.png",
    }));

  return {
    id: res.data.id,
    title: res.data.title,
    poster: res.data.poster_path
      ? `https://image.tmdb.org/t/p/w500${res.data.poster_path}`
      : "/placeholder.png",
    rating: res.data.vote_average
      ? Number(res.data.vote_average.toFixed(1))
      : undefined,
    year: res.data.release_date
      ? res.data.release_date.split("-")[0]
      : "N/A",
    description: res.data.overview,
    banner: res.data.backdrop_path
      ? `https://image.tmdb.org/t/p/original${res.data.backdrop_path}`
      : "/placeholder.png",
    trailer: trailer?.key,
    genres: res.data.genres.map((g: any) => g.name),
    main_actors,
  };
}
