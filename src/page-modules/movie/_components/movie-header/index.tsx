import React from "react";

interface MovieHeaderProps {
  filterList: {
    sortBy?: string;
    filterBy?: number[]; // Update to an array to allow multiple selections
  };
  setFilterList: React.Dispatch<
    React.SetStateAction<{
      sortBy?: string;
      filterBy?: number[];
    }>
  >;
}

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const MovieHeader: React.FC<MovieHeaderProps> = ({
  filterList,
  setFilterList,
}) => {
  // Handle checkbox change
  const handleCheckboxChange = (genreId: number) => {
    setFilterList((prev) => {
      const isSelected = prev.filterBy?.includes(genreId);
      const newFilterBy = isSelected
        ? prev.filterBy?.filter((id) => id !== genreId) // Remove if selected
        : [...(prev.filterBy || []), genreId]; // Add if not selected
      return { ...prev, filterBy: newFilterBy };
    });
  };

  // Handle sorting change
  const handleSortChange = (sortBy: string) => {
    setFilterList((prev) => ({ ...prev, sortBy }));
  };

  return (
    <div className="flex justify-end gap-3 py-2">
      {/* Sorting */}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm m-1 bg-transparent border border-neutral-600"
        >
          {filterList.sortBy ? `Sort by ${filterList.sortBy}` : "Sort By"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-neutral-900 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a onClick={() => handleSortChange("asc")}>A - Z</a>
          </li>
          <li>
            <a onClick={() => handleSortChange("desc")}>Z - A</a>
          </li>
        </ul>
      </div>

      {/* Filter by categories */}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-sm m-1 bg-transparent border border-neutral-600"
        >
          Categories
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-neutral-900 rounded-box z-[1] w-52 p-2 shadow"
        >
          {genres.map((genre) => (
            <div key={genre.id} className="flex items-center gap-3 py-1">
              <input
                type="checkbox"
                checked={filterList.filterBy?.includes(genre.id) || false}
                onChange={() => handleCheckboxChange(genre.id)}
                className="checkbox checkbox-sm"
              />
              <p>{genre.name}</p>
            </div>
          ))}
          <li>
            <a
              onClick={() =>
                setFilterList((prev) => ({ ...prev, filterBy: [] }))
              }
              className="text-red-500"
            >
              Reset Filter
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MovieHeader;
