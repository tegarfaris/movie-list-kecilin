import React, { useRef } from "react";
import { IMovies } from "@/interface/movie.interface";

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
  const handleClose = () => {
    modalRef.current?.close();
  };

  return (
    <dialog ref={modalRef} id="my_modal_2" className="modal">
      <div className="modal-box w-full max-w-lg overflow-hidden">
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
              type="text"
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
            <label className="text-white">TMDB rate</label>
            <input
              className="input input-bordered text-white"
              type="text"
              name="vote"
              defaultValue={editMovie?.vote_average || ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white">Genre (comma separated ids)</label>
            <input
              className="input input-bordered text-white"
              type="text"
              name="genre"
              defaultValue={editMovie?.genre_ids.join(",") || ""}
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
