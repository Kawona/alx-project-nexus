import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "../pages/HomePage";
import MoviesDetails from "../pages/MoviesDetails";
import MoviesGenrePage from "../pages/MoviesGenrePage";
import TVShowsPage from "../pages/TVShowsPage";
import AwardsPage from "../pages/AwardsPage";

import WatchlistPage from "./components/WatchlistPage";
import SearchResults from "./components/SearchResults";

import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

import ProtectedRoute from "./auth/ProtectedRoute";
import './index.css';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviesDetails />} />
          <Route path="/movies-genre" element={<MoviesGenrePage />} />
          <Route path="/tv-shows" element={<TVShowsPage />} />
          <Route path="/awards" element={<AwardsPage />} />

          <Route path="/search" element={<SearchResults />} />

          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <WatchlistPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
