import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const genres = [
  "Action",
  "Comedy",
  "Romance",
  "Sci-Fi",
  "Horror",
  "Thriller",
  "Drama",
  "Adventure",
  "Animation",
];

export default function GenreDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800/70 text-blue-400 border border-gray-600 hover:bg-gray-800 transition"
      >
        Genres
        <FaChevronDown
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className={`absolute mt-2 w-48 rounded-md bg-gray-800 border border-gray-700 text-blue-300 z-50 shadow-lg
          transition-all duration-300 origin-top
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
        `}
      >
        {genres.map((genre) => (
          <button
            key={genre}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700/50 transition"
            onClick={() => {
              console.log("Selected:", genre);
              setOpen(false);
            }}
          >
            {genre}
          </button>
        ))}
      </div>
    </>
  );
}
