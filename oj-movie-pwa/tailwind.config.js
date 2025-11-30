import React, { useState } from "react";
import { ChevronDown, Menu, X, Search } from "lucide-react";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* DARK OVERLAY (mobile menu active) */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
        ></div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-black text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">

          {/* LEFT — LOGO */}
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <h1 className="text-3xl font-extrabold text-yellow-400">
              OJ Movie
            </h1>
          </div>

          {/* CENTER — MENU (DESKTOP) */}
          <nav className="hidden md:flex space-x-8 font-semibold">
            <a href="#" className="hover:text-yellow-400 transition-colors">Movies Genre</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">TV Shows</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Awards & Events</a>
          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center space-x-4">

            {/* EXPANDING SEARCH BAR */}
            <div className="relative hidden md:flex items-center">
              <div
                className={`flex items-center bg-white/20 rounded-full px-3 transition-all duration-300 overflow-hidden ${
                  searchOpen ? "w-64" : "w-10"
                }`}
              >
                <Search
                  className="text-white cursor-pointer"
                  onClick={() => setSearchOpen(!searchOpen)}
                />
                {searchOpen && (
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search..."
                    className="ml-2 w-full bg-transparent text-white placeholder:text-white focus:outline-none"
                  />
                )}
              </div>
            </div>

            {/* WATCHLIST */}
            <button className="hidden md:block bg-gray-800 text-white px-3 py-1 rounded hover:bg-yellow-400 hover:text-black transition-all">
              Watchlist
            </button>

            {/* SIGN-IN */}
            <button className="hidden md:block bg-gray-800 text-white px-3 py-1 rounded hover:bg-yellow-400 hover:text-black transition-all">
              Sign In
            </button>

            {/* CUSTOM LANGUAGE DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center space-x-1 bg-white px-3 py-1 rounded text-black border border-black"
              >
                <span>EN</span>
                <ChevronDown size={16} />
              </button>

              {languageOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white text-black shadow-lg rounded z-50">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                    EN
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                    FR
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                    ES
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU CONTENT */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black text-white p-6 space-y-4 z-50">
            <a href="#" className="block font-semibold text-lg hover:text-yellow-400">Movies Genre</a>
            <a href="#" className="block font-semibold text-lg hover:text-yellow-400">TV Shows</a>
            <a href="#" className="block font-semibold text-lg hover:text-yellow-400">Awards & Events</a>

            <button className="block w-full bg-gray-800 text-white px-3 py-2 rounded hover:bg-yellow-400 hover:text-black">
              Watchlist
            </button>
            <button className="block w-full bg-gray-800 text-white px-3 py-2 rounded hover:bg-yellow-400 hover:text-black">
              Sign In
            </button>
          </div>
        )}
      </header>
    </>
  );
}
