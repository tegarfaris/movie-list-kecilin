/* eslint-disable @next/next/no-img-element */
import { renderCategoriesMovie } from "@/helper/render-categories.helper";
import { IMovies } from "@/interface/movie.interface";
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface MovieCardProps {
  movie: IMovies;
  handleBookmark: (movie: IMovies) => void;
  isBookmarked: (movieId: number) => boolean;
}
const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  handleBookmark,
  isBookmarked,
}) => {
  return (
    <div className="relative flex flex-col gap-4 cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.original_title || "Movie poster"}
        className="max-w-xs h-[400px] rounded-lg object-cover"
      />
      <button
        onClick={() => handleBookmark(movie)}
        className="absolute top-2 right-2 p-1 bg-neutral-900 p-3 rounded-full shadow-md"
      >
        {isBookmarked(movie.id) ? <FaBookmark /> : <FaRegBookmark />}
      </button>
      <div className="flex gap-2 flex-wrap">
        {movie.genre_ids.slice(0, 2).map((genreId) => {
          const category = renderCategoriesMovie(genreId);
          return (
            category && (
              <div
                key={genreId}
                className={`badge border-red-500 text-red-500 badge-outline`}
              >
                {category.text}
              </div>
            )
          );
        })}
        {movie.genre_ids.length > 2 && (
          <div className="badge border-red-500 text-red-500 badge-outline">
            +{movie.genre_ids.length - 2}
          </div>
        )}
      </div>
      <p className="line-clamp-2 text-3xl font-bold h-[70px]">
        {movie.original_title}
      </p>
      <p className="text-sm text-neutral-500">
        tmdb: {Number(movie.vote_average).toFixed(1)} / 10
      </p>

      <p className="line-clamp-4 text-sm text-neutral-500 text-justify">
        {movie.overview}
      </p>
    </div>
  );
};

export default MovieCard;
