import MovieCard from "./ui/MovieCard";
import type { MovieCardProps } from "./ui/MovieCard";

interface HorizontalMovieSliderProps {
  title: string;
  movies: MovieCardProps[];
}

const HorizontalMovieSlider: React.FC<HorizontalMovieSliderProps> = ({ title, movies }) => {
  return (
    <div className="mt-10 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <button className="text-sm text-gray-400 hover:text-white">See All</button>
      </div>

      {/* Movie slider */}
      <div
        className={`flex space-x-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory ${
          movies.length < 3 ? "justify-center" : ""
        }`}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-40 sm:w-48 md:w-52 lg:w-56 snap-start"
          >
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster={movie.poster}
              rating={movie.rating}
              year={movie.year}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalMovieSlider;
