import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ACCOUNT_ID, API_KEY, BASE_URL, SESSION_ID } from "../constants";

const moviesUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;
const favoritesUrl = `${BASE_URL}/account/${ACCOUNT_ID}/favorite/movies?sort_by=created_at.desc&api_key=${API_KEY}&session_id=${SESSION_ID}`;

export const fetchAllMovies = createAsyncThunk("movies/getMovies", async () => {
  const movies = await axios.get(moviesUrl);
  const favorites = await axios.get(favoritesUrl);

  console.log({ favorites: favorites.data });

  return { movies: movies.data, favorites: favorites.data.results };
});

export const addFavorite = createAsyncThunk(
  "movies/addFavorite",
  async (movieId: number) => {
    const favorites = await axios.post(
      `${BASE_URL}/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: true,
      }
    );

    console.log({ favorites: favorites.data });

    return favorites.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: null,
    favorites: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchAllMovies
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
    // addFavorite
    builder.addCase(addFavorite.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addFavorite.fulfilled, (state, action) => {
      state.favorites.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addFavorite.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default moviesSlice;
