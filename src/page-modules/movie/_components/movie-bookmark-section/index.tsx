import React from "react";
import { IMovies } from "@/interface/movie.interface";
import MovieCard from "../../_components/movie-card";

interface MovieBookmarkSectionProps {
  bookmarks: IMovies[];
  handleBookmark: (movie: IMovies) => void;
  deletePost: (movieId: number) => void;
  openModalEdit: (movie: IMovies) => void;
}

const MovieBookmarkSection: React.FC<MovieBookmarkSectionProps> = ({
  bookmarks,
  handleBookmark,
  deletePost,
  openModalEdit,
}) => (
  <div
    className={`flex flex-col mb-8 ${
      bookmarks.length === 0 ? "hidden" : "flex"
    }`}
  >
    <h2 className="text-2xl font-semibold text-neutral-400 uppercase mb-4">
      Bookmarked Movies
    </h2>
    <div className="grid grid-cols-5 gap-4">
      {bookmarks.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          handleBookmark={handleBookmark}
          isBookmarked={() => true}
          onDelete={() => deletePost(movie.id)}
          openModalEdit={openModalEdit}
        />
      ))}
    </div>
  </div>
);

export default MovieBookmarkSection;
