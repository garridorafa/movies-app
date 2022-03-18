import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ACCOUNT_ID, API_KEY, BASE_URL, SESSION_ID } from "../constants";
import { IMovie, IRatedMovie } from "../types/movie";

const moviesUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`;
const favoritesUrl = `${BASE_URL}/account/${ACCOUNT_ID}/favorite/movies?sort_by=created_at.desc&api_key=${API_KEY}&session_id=${SESSION_ID}`;
const ratedUrl = `${BASE_URL}/account/${ACCOUNT_ID}/rated/movies?sort_by=created_at.desc&api_key=${API_KEY}&session_id=${SESSION_ID}`;

export const fetchAllMovies = createAsyncThunk("movies/getMovies", async () => {
  const getMovies = axios.get(moviesUrl);
  const getFavorites = axios.get(favoritesUrl);
  const getRatedMovies = axios.get(ratedUrl);

  const [movies, favorites, ratedMovies] = await Promise.all([
    getMovies,
    getFavorites,
    getRatedMovies,
  ]);

  return {
    movies: movies.data,
    favorites: favorites.data,
    ratedMovies: [
      ...ratedMovies.data.results.map((ratedMovie: IRatedMovie) => ({
        id: ratedMovie.id,
        rating: ratedMovie.rating,
      })),
    ],
  };
});

export const addFavorite = createAsyncThunk(
  "movies/addFavorite",
  async (movie: IMovie) => {
    await axios.post(
      `${BASE_URL}/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`,
      {
        media_type: "movie",
        media_id: movie.id,
        favorite: true,
      }
    );

    return { ...movie };
  }
);

export const removeFavorite = createAsyncThunk(
  "movies/removeFavorite",
  async (movieId: number) => {
    const favorites = await axios.post(
      `${BASE_URL}/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`,
      {
        media_type: "movie",
        media_id: movieId,
        favorite: false,
      }
    );

    return { ...favorites.data, id: movieId };
  }
);

export const rateMovie = createAsyncThunk(
  "movies/rateMovie",
  async (movieId: number, userRating: number) => {
    await axios.post(
      `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${SESSION_ID}`,
      { value: userRating }
    );

    return movieId;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: null,
    ratedMovies: [],
    favorites: {
      results: [],
    },
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
      state.ratedMovies = action.payload.ratedMovies;
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
      state.favorites.results.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addFavorite.rejected, (state) => {
      state.isLoading = false;
    });
    // removeFavorite
    builder.addCase(removeFavorite.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFavorite.fulfilled, (state, action) => {
      state.favorites.results = state.favorites.results.filter(
        (f) => f?.id !== action.payload.id
      );
      state.isLoading = false;
    });
    builder.addCase(removeFavorite.rejected, (state) => {
      state.isLoading = false;
    });
    // rateMovie
    builder.addCase(rateMovie.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(rateMovie.fulfilled, (state, action) => {
      state.ratedMovies = state.ratedMovies.filter(
        (rm) => rm.id !== action.payload
      );
      state.isLoading = false;
    });
    builder.addCase(rateMovie.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default moviesSlice;
