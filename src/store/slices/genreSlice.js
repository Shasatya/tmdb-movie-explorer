import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGenres = createAsyncThunk("genres/fetch", async () => {
  const res = await fetch("/api/genres", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  return await res.json();
});

const genreSlice = createSlice({
  name: "genres",
  initialState: {
    map: {},
    loaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.map = action.payload;
      state.loaded = true;
    });
  },
});

export default genreSlice.reducer;
