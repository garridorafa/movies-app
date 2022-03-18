import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_KEY, BASE_URL } from "../constants";

const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;

export const fetchAllMovies = createAsyncThunk("auth/getMovies", async () => {
  const response = await axios.get(url);
  return response.data;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
      state.movies = action.payload;

      state.isLoading = false;
    });
    builder.addCase(fetchAllMovies.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default moviesSlice;
