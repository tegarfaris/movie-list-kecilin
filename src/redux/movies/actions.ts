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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGEzYjI5NGY4MTM3ZmFmNTY5ODY2NTVlZTZmNzI5YiIsIm5iZiI6MTczMDk2NzUzNC4wNjQxMjgyLCJzdWIiOiI2NzJjNTg5MTVhMjA0NTkyMDc0MTNjMWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.sZZijQ1cwUoF4lZk9TTvd8PUspeOaUZ4tMwKqcRZgVY",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
