import React, { useEffect, useState, useRef } from "react";
import SkeletonCard from "@/components/skeleton";
import useMovies from "@/hooks/useMovies";
import MovieHeader from "../../_components/movie-header";
import { IMovies } from "@/interface/movie.interface";
import MovieCard from "../../_components/movie-card";
import MovieBookmarkSection from "../../_components/movie-bookmark-section";
import MovieModal from "../../_components/movie-modal";

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
  const [movies, setMovies] = useState<IMovies[]>([]);
  const [editMovie, setEditMovie] = useState<IMovies | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      getListMovies();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [getListMovies]);

  useEffect(() => {
    setMovies(list);
  }, [list]);

  const createPost = (newMovie: IMovies) => {
    setMovies([newMovie, ...movies]);
  };

  const filteredList = () => {
    let sortedMovies = [...movies];

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

  const totalPages = Math.ceil(movies.length / itemsPerPage);

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

  const openModalCreate = () => {
    modalRef.current?.showModal();
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editMovie) {
      const updatedMovies = movies.map((movie) =>
        movie.id === editMovie.id
          ? {
              ...movie,
              poster_path: e.currentTarget.poster.value,
              original_title: e.currentTarget.titleMovie.value,
              overview: e.currentTarget.overview.value,
              vote_average: parseFloat(e.currentTarget.vote.value),
              genre_ids: e.currentTarget.genre.value.split(",").map(Number),
            }
          : movie
      );
      setMovies(updatedMovies);
      setEditMovie(null);
      modalRef.current?.close();
    }
  };

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMovie: IMovies = {
      id: Date.now(),
      poster_path: e.currentTarget.poster.value,
      original_title: e.currentTarget.titleMovie.value,
      overview: e.currentTarget.overview.value,
      vote_average: parseFloat(e.currentTarget.vote.value),
      genre_ids: e.currentTarget.genre.value.split(",").map(Number),
    };
    createPost(newMovie);
    modalRef.current?.close();
  };

  const openModalEdit = (movie: IMovies) => {
    setEditMovie(movie);
    modalRef.current?.showModal();
  };

  const deletePost = (movieId: number) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
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
        openModalCreate={openModalCreate}
      />
      <MovieModal
        editMovie={editMovie}
        handleEditSubmit={handleEditSubmit}
        handleCreateSubmit={handleCreateSubmit}
        modalRef={modalRef}
      />

      <MovieBookmarkSection
        bookmarks={bookmarks}
        handleBookmark={handleBookmark}
        deletePost={deletePost}
        openModalEdit={openModalEdit}
      />
      <div
        className={`divider ${bookmarks.length === 0 ? "hidden" : "flex"}`}
      ></div>
      <div className="grid grid-cols-5 gap-4">
        {filteredList().length > 0 ? (
          filteredList().map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              handleBookmark={handleBookmark}
              isBookmarked={isBookmarked}
              onDelete={() => deletePost(movie.id)}
              openModalEdit={openModalEdit}
            />
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
