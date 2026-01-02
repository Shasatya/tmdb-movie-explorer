import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   theme:
//     typeof window !== "undefined" && localStorage.getItem("theme")
//       ? localStorage.getItem("theme")
//       : "light",
//   themeVariant:
//     typeof window !== "undefined" && localStorage.getItem("themeVariant")
//       ? localStorage.getItem("themeVariant")
//       : "default",
// };

const initialState = {
  theme: "light",
  themeVariant: "cinema",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
    setThemeVariant: (state, action) => {
      state.themeVariant = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("themeVariant", action.payload);
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);
      }
    },
    initializeTheme: (state, action) => {
      state.theme = action.payload.theme;
      state.themeVariant = action.payload.themeVariant;
    },
  },
});

export const { setTheme, setThemeVariant, toggleTheme, initializeTheme } =
  themeSlice.actions;

export default themeSlice.reducer;
