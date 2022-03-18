import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_KEY, BASE_URL } from "../constants";

export const fetchSessionId = createAsyncThunk(
  "auth/getSessionId",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`
    );
    return response.data.guest_session_id;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    sessionId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSessionId.fulfilled, (state, action) => {
      state.sessionId = action.payload;
    });
  },
});

export default authSlice;
