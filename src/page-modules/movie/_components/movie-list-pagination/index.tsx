import React from "react";

interface MovieListPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const MovieListPagination: React.FC<MovieListPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => (
  <div className="flex justify-center mt-4">
    <div className="flex btn-group gap-2">
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`btn btn-sm ${
            currentPage === idx + 1 ? "btn-active" : ""
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  </div>
);

export default MovieListPagination;
