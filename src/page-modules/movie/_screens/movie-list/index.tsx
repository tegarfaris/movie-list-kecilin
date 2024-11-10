import SkeletonCard from "@/components/skeleton";
import useMovies from "@/hooks/useMovies";
import React, { useEffect, useState } from "react";
import MovieHeader from "../../_components/movie-header";
import { IMovies } from "@/interface/movie.interface";
import MovieCard from "../../_components/movie-card";

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
  const [movies, setMovies] = useState<IMovies[]>([]); // State untuk menyimpan daftar film
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
    setMovies(list); // Set daftar film ke state movies ketika list berubah
  }, [list]);

  const createPost = (newMovie: IMovies) => {
    setMovies([newMovie, ...movies]); // Menambahkan film baru di urutan pertama
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
    document.getElementById("my_modal_2")?.showModal();
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
    document.getElementById("my_modal_2")?.close();
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-full max-w-lg overflow-hidden">
          <h3 className="font-bold text-lg">Create Post</h3>
          <form
            onSubmit={handleCreateSubmit}
            className="modal-backdrop py-5 gap-3 w-full"
          >
            <div className="flex flex-col gap-2">
              <label className="text-white">Poster</label>
              <input
                className="input input-bordered text-white"
                type="text"
                name="poster"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white">Title</label>
              <input
                className="input input-bordered text-white"
                type="text"
                name="titleMovie"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white">Overview</label>
              <input
                className="input input-bordered text-white"
                type="text"
                name="overview"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white">TMDB rate</label>
              <input
                className="input input-bordered text-white"
                type="text"
                name="vote"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white">Genre (comma separated ids)</label>
              <input
                className="input input-bordered text-white"
                type="text"
                name="genre"
              />
            </div>
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_2")?.close()}
                className="btn text-white"
              >
                Close
              </button>
              <button type="submit" className="btn text-white">
                Post
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Bookmark Section */}
      {bookmarks.length > 0 && (
        <div className="flex flex-col mb-8">
          <h2 className="text-2xl font-semibold text-neutral-400 uppercase mb-4">
            Bookmarked Movies
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {bookmarks.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                handleBookmark={handleBookmark}
                isBookmarked={isBookmarked}
                onDelete={() => deletePost(movie.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Movie List */}
      <div className="grid grid-cols-5 gap-4">
        {filteredList().length > 0 ? (
          filteredList().map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              handleBookmark={handleBookmark}
              isBookmarked={isBookmarked}
              onDelete={() => deletePost(movie.id)}
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
