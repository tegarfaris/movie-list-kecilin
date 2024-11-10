import { createReducer } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { REQUEST_GET_MOVIE_LIST } from "./actions";
import { IMovies } from "@/interface/movie.interface";

export type TMovieState = {
  list: IMovies[] | [];
  total: number;
  error: AxiosError | null;
  pending: boolean;
  success: boolean;
};

const initialState: TMovieState = {
  list: [],
  total: 0,
  error: null,
  pending: false,
  success: false,
};

export const MOVIE_REDUCER = createReducer(initialState, (builder) => {
  builder

    .addCase(REQUEST_GET_MOVIE_LIST.pending, (state) => {
      state.pending = true;
    })
    .addCase(REQUEST_GET_MOVIE_LIST.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.list = payload?.results;
      state.total = payload?.total_results;
      state.success = true;
    })
    .addCase(REQUEST_GET_MOVIE_LIST.rejected, (state, { payload }) => {
      state.error = payload as AxiosError;
      state.pending = false;
    });
});
