import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import genreReducer from "./slices/genreSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      auth: authReducer,
      genres: genreReducer,
    },
  });
};
