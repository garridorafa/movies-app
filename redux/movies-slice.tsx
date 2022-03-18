import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_KEY, BASE_URL, SESSION_ID } from "../constants";

const moviesUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;
const favoritesUrl = `${BASE_URL}/account/1/favorite/movies?sort_by=created_at.desc&api_key=${API_KEY}&session_id=${SESSION_ID}`;

export const fetchAllMovies = createAsyncThunk("movies/getMovies", async () => {
  const movies = await axios.get(moviesUrl);
  const favorites = await axios.get(favoritesUrl);

  return { movies: movies.data, favorites: favorites.data };
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: null,
    favorites: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
      state.movies = action.payload.movies;
      state.favorites = action.payload.favorites;

      state.isLoading = false;
    });
    builder.addCase(fetchAllMovies.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default moviesSlice;
