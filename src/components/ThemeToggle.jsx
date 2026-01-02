"use client";

import { themes } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div className="flex gap-2">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => dispatch(toggleTheme())}
          className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
            theme === t.value
              ? "bg-accent text-white"
              : "bg-surface text-text-primary hover:bg-accent/10"
          }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
