import { useState, useEffect } from "react";
import useMovies from "@/hooks/useMovies";
import { IMovies } from "@/interface/movie.interface";

export const useMovieData = () => {
  const { getListMovies, list } = useMovies();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovies[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

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

  const filteredList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return movies.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  return {
    movies,
    loading,
    filteredList,
    currentPage,
    totalPages,
    setCurrentPage,
    setMovies,
  };
};
