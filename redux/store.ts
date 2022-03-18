import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import moviesSlice from "./movies-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, movies: moviesSlice.reducer },
});

export default store;
