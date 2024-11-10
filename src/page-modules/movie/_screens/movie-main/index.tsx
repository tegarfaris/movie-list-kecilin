import Header from "@/components/header";
import React from "react";
import MovieList from "../movie-list";

const MovieMain: React.FC = () => {
  return (
    <div className="flex flex-col w-full text-white">
      {/* start header */}
      <Header />
      {/* end header */}

      {/* start list */}
      <MovieList />
      {/* end list */}
    </div>
  );
};

export default MovieMain;
