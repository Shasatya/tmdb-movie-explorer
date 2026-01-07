"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { initializeTheme } from "./slices/themeSlice";
import AuthLoader from "./AuthLoader";
import { fetchGenres } from "./slices/genreSlice";

export default function StoreProvider({ children }) {
  // Lazily create the store once on mount
  const [store] = useState(() => makeStore());

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedVariant = localStorage.getItem("themeVariant");

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");
    const themeVariant = savedVariant || "cinema";

    store.dispatch(initializeTheme({ theme, themeVariant }));
  }, [store]);

  useEffect(() => {
    store.dispatch(fetchGenres());
  }, [store]);

  return (
    <Provider store={store}>
      <AuthLoader />
      {children}
    </Provider>
  );
}
