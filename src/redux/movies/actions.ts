import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const REQUEST_GET_MOVIE_LIST = createAsyncThunk(
  "movie/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMBDB_API_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
