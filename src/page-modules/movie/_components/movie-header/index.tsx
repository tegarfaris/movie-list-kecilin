import React from "react";
import genres from "@/data/category-data.json";

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
  openModalCreate: () => void;
}

const MovieHeader: React.FC<MovieHeaderProps> = ({
  filterList,
  setFilterList,
  openModalCreate,
}) => {
  // Handle checkbox change
  const handleCheckboxChange = (genreId: number) => {
    setFilterList((prev) => {
      const isSelected = prev.filterBy?.includes(genreId);
      const newFilterBy = isSelected
        ? prev.filterBy?.filter((id) => id !== genreId)
        : [...(prev.filterBy || []), genreId];
      return { ...prev, filterBy: newFilterBy };
    });
  };

  // Handle sorting change
  const handleSortChange = (sortBy: string) => {
    setFilterList((prev) => ({ ...prev, sortBy }));
  };

  return (
    <div className="flex justify-end gap-1 py-2">
      <button
        className="btn btn-outline btn-sm m-1 border border-neutral-600"
        onClick={() => openModalCreate()}
      >
        Create Post
      </button>
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
          Genre
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
