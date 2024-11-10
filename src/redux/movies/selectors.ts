import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const MOVIE_SELECTOR = (state: RootState) => state.movie;

export const MOVIE_SELECTOR_COLLECTION = createSelector(
  MOVIE_SELECTOR,
  (state) => state
);
