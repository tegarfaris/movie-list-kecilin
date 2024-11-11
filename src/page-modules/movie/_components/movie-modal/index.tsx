import React, { useState } from "react";
import { IMovies } from "@/interface/movie.interface";
import genres from "@/data/category-data.json";

interface MovieModalProps {
  editMovie: IMovies | null;
  handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleCreateSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  modalRef: React.RefObject<HTMLDialogElement>;
}

const MovieModal: React.FC<MovieModalProps> = ({
  editMovie,
  handleCreateSubmit,
  handleEditSubmit,
  modalRef,
}) => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    editMovie ? editMovie.genre_ids : []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCheckboxChange = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleClose = () => {
    modalRef.current?.close();
  };

  return (
    <dialog ref={modalRef} id="my_modal_2" className="modal">
      <div className="modal-box w-full max-w-lg overflow-x-hidden">
        <h3 className="font-bold text-lg">
          {editMovie ? "Edit Post" : "Create Post"}
        </h3>
        <form
          onSubmit={editMovie ? handleEditSubmit : handleCreateSubmit}
          className="modal-backdrop py-5 gap-3 w-full"
        >
          <div className="flex flex-col gap-2">
            <label className="text-white">Poster</label>
            <input
              className="input input-bordered text-white"
              type="url"
              name="poster"
              defaultValue={editMovie?.poster_path || ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white">Title</label>
            <input
              className="input input-bordered text-white"
              type="text"
              name="titleMovie"
              defaultValue={editMovie?.original_title || ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white">Overview</label>
            <input
              className="input input-bordered text-white"
              type="text"
              name="overview"
              defaultValue={editMovie?.overview || ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white">TMDB rate (1-10)</label>
            <input
              className="input input-bordered text-white"
              type="decimal"
              inputMode="numeric"
              name="vote"
              min={1}
              max={10}
              defaultValue={editMovie?.vote_average || ""}
            />
          </div>
          <div className="flex relative flex-col gap-2">
            <label className="text-white">Genre</label>
            <p className="text-white">
              selected genre code: {selectedGenres.join(", ")}
            </p>
            <div
              tabIndex={0}
              role="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn btn-sm m-1 bg-transparent border border-neutral-600"
            >
              Select Genre
            </div>
            <ul
              className={`dropdown-content menu absolute -top-56 max-h-[250px] overflow-y-scroll bg-neutral-900 rounded-box z-[1] w-52 p-2 shadow ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              {genres.map((genre) => (
                <div key={genre.id} className="flex items-center gap-3 py-1">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleCheckboxChange(genre.id)}
                    className="checkbox checkbox-sm"
                  />
                  <p className="text-white">{genre.name}</p>
                </div>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setSelectedGenres([])}
                  className="text-red-500"
                >
                  Reset Filter
                </button>
              </li>
            </ul>
            <input
              type="hidden"
              name="genre"
              value={selectedGenres.join(",")}
            />
          </div>

          <div className="flex gap-3 w-full">
            <button
              type="button"
              onClick={handleClose}
              className="btn text-white"
            >
              Close
            </button>
            <button type="submit" className="btn text-white">
              {editMovie ? "Save" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default MovieModal;
