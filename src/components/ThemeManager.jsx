"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export function ThemeManager() {
  const { theme, themeVariant } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark", "theme-purple", "theme-ocean");

    if (theme === "dark") {
      root.classList.add("dark");
    }

    if (themeVariant !== "cinema") {
      root.classList.add(`theme-${themeVariant}`);
    }
  }, [theme, themeVariant]);

  return null;
}
