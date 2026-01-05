import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    const res = await fetch("/api/user/profile");

    if (!res.ok) {
      return rejectWithValue("Not authenticated");
    }

    return res.json();
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    dispatch(clearAuth());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
  },
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
