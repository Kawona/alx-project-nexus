import { useState } from "react";

interface MovieSearchBarProps {
  onSearch: (query: string) => void;
  onGenreChange: (genre: string) => void;
  genres: string[];
}

const MovieSearchBar: React.FC<MovieSearchBarProps> = ({
  onSearch,
  onGenreChange,
  genres,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Search handler
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value; 
    setSearchQuery(value);
  };

  const handleGenreChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value = e.target.value; 
    onGenreChange(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 my-4">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="w-full md:w-[60%]">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a movie..."
          className="w-full px-3 py-2 border rounded-md text-black"
        />
      </form>

      {/* Genre Dropdown */}
      <select
        onChange={handleGenreChange}
        className="w-full md:w-[40%] px-3 py-2 border rounded-md text-black"
      >
        <option value="">All Genres</option>

        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieSearchBar;
