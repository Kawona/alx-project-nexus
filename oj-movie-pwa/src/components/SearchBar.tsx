import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { requireAuth } = useAuth() || {};

  const handleSearch = () => {
    if (!query.trim()) return;

    requireAuth?.(() => {
      navigate("/search", {
        state: {
          query,
          genre: ""
        }
      });
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full flex items-center bg-white rounded">
      <input
        type="text"
        className="w-full px-4 py-2 text-black rounded-l outline-none"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="bg-yellow-400 text-black px-4 py-2 rounded-r hover:bg-yellow-500"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
