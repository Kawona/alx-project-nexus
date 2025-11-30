import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAuth = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <header className="bg-black text-white py-4 px-6 shadow-md">

      {/* MOBILE: top row */}
      <div className="flex justify-between items-center md:hidden">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          OJ Movie App
        </Link>

        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
        </button>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          OJ Movie App
        </Link>

        {/* Search */}
        <div className="w-full md:max-w-lg">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link to="/movies-genre" className="hover:text-yellow-400 transition">Movies</Link>
          <Link to="/tv-shows" className="hover:text-yellow-400 transition">TV Shows</Link>
          <Link to="/awards" className="hover:text-yellow-400 transition">Awards</Link>

          {user && (
            <Link to="/watchlist" className="hover:text-yellow-400 transition">
              Watchlist
            </Link>
          )}

          <button
            onClick={handleAuth}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded font-semibold transition"
          >
            {user ? "Sign Out" : "Sign In"}
          </button>
        </nav>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileOpen && (
        <div className="md:hidden mt-4 bg-[#111] p-4 rounded-lg flex flex-col gap-4 animate-slideDown">

          <SearchBar />

          <Link onClick={() => setMobileOpen(false)} to="/movies-genre" className="hover:text-yellow-400 transition">
            Movies
          </Link>

          <Link onClick={() => setMobileOpen(false)} to="/tv-shows" className="hover:text-yellow-400 transition">
            TV Shows
          </Link>

          <Link onClick={() => setMobileOpen(false)} to="/awards" className="hover:text-yellow-400 transition">
            Awards
          </Link>

          {user && (
            <Link onClick={() => setMobileOpen(false)} to="/watchlist" className="hover:text-yellow-400 transition">
              Watchlist
            </Link>
          )}

          <button
            onClick={() => {
              handleAuth();
              setMobileOpen(false);
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-semibold"
          >
            {user ? "Sign Out" : "Sign In"}
          </button>
        </div>
      )}
    </header>
  );
}
