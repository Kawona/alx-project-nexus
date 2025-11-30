import React from "react";
import { Link } from "react-router-dom";

export interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster }) => {
  return (
    <Link to={`/movie/${id}`} className="block w-full hover:scale-105 transition-transform">
      <img src={poster} alt={title} className="w-full h-64 object-cover rounded-lg shadow-lg" />
      <h3 className="text-white text-sm mt-2 font-semibold">{title}</h3>
    </Link>
  );
};

export default MovieCard;
