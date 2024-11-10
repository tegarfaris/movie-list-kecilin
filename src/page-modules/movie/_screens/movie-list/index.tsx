/* eslint-disable @next/next/no-img-element */
import SkeletonCard from "@/components/skeleton";
import useMovies from "@/hooks/useMovies";
import React, { useEffect, useState } from "react";
import MovieHeader from "../../_components/movie-header";
import { renderCategoriesMovie } from "@/helper/render-categories.helper";
import { IMovies } from "@/interface/movie.interface";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const MovieList: React.FC = () => {
  const { getListMovies, list } = useMovies();
  const [loading, setLoading] = useState(false);
  const [filterList, setFilterList] = useState<{
    sortBy: string | undefined;
    filterBy: number[] | undefined;
  }>({
    sortBy: undefined,
    filterBy: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarks, setBookmarks] = useState<IMovies[]>([]);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      getListMovies();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [getListMovies]);

  const filteredList = () => {
    let sortedMovies = [...list];

    if (filterList.sortBy) {
      sortedMovies.sort((a, b) => {
        if (filterList.sortBy === "asc") {
          return a.original_title.localeCompare(b.original_title);
        } else {
          return b.original_title.localeCompare(a.original_title);
        }
      });
    }

    if (filterList.filterBy && filterList.filterBy.length > 0) {
      sortedMovies = sortedMovies.filter((movie) =>
        movie.genre_ids.some((genreId) =>
          filterList.filterBy!.includes(genreId)
        )
      );
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedMovies.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(list.length / itemsPerPage);

  const handleBookmark = (movie: IMovies) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((item) => item.id === movie.id);
      if (isBookmarked) {
        return prev.filter((item) => item.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  const isBookmarked = (movieId: number) =>
    bookmarks.some((bookmark) => bookmark.id === movieId);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <MovieHeader
        filterList={filterList}
        setFilterList={
          setFilterList as React.Dispatch<
            React.SetStateAction<{
              sortBy?: string;
              filterBy?: number[];
            }>
          >
        }
      />

      {/* Bookmark Section */}
      {bookmarks.length > 0 && (
        <div className="flex flex-col mb-8">
          <h2 className="text-2xl font-semibold text-neutral-400 uppercase mb-4">
            Bookmarked Movies
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {bookmarks.map((movie) => (
              <div
                key={movie.id}
                className="relative flex flex-col gap-4 cursor-pointer"
              >
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
                  {movie.genre_ids.slice(0, 2).map((genreId: number) => {
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
            ))}
          </div>
        </div>
      )}

      {/* Main Movie List */}
      <div className="grid grid-cols-5 gap-4">
        {filteredList().length > 0 ? (
          filteredList().map((movie, idx) => (
            <div
              key={idx}
              className="relative flex flex-col gap-4 cursor-pointer"
            >
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
          ))
        ) : (
          <div className="col-span-5 text-center py-20">
            <p className="text-3xl font-semibold text-neutral-600">
              No movies available
            </p>
            <p className="text-sm text-neutral-500">Please try again later.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <div className="flex btn-group gap-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`btn btn-sm ${
                currentPage === idx + 1 ? "btn-active" : ""
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
