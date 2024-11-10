/* eslint-disable @next/next/no-img-element */
import SkeletonCard from "@/components/skeleton";
import useMovies from "@/hooks/useMovies";
import React, { useEffect, useState } from "react";

const MovieList: React.FC = () => {
  const { getListMovies, list, total } = useMovies();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      getListMovies();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, [getListMovies]);

  if (loading) {
    return (
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  } else if (total === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-3xl font-semibold text-neutral-600">
          No movies available
        </p>
        <p className="text-sm text-neutral-500">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {list.map((movie, idx) => (
        <div key={idx} className="flex flex-col gap-4 cursor-pointer">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.original_title || "Movie poster"}
            className="max-w-xs h-[400px] rounded-lg object-cover"
          />
          <p className="line-clamp-2 text-2xl font-bold h-[60px]">
            {movie.original_title}
          </p>
          <p className="line-clamp-4 text-sm text-neutral-500 text-justify">
            {movie.overview}
          </p>
          <p className="text-sm text-neutral-500">tmdb: {movie.vote_average}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
