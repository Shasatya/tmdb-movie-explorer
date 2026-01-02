"use client";

import { themeVariants } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setThemeVariant } from "@/store/slices/themeSlice";

export function ThemeSelector() {
  const dispatch = useAppDispatch();
  const themeVariant = useAppSelector((state) => state.theme.themeVariant);

  return (
    <div className="flex gap-2">
      {themeVariants.map((t) => (
        <button
          key={t.value}
          onClick={() => dispatch(setThemeVariant(t.value))}
          className={`px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
            themeVariant === t.value
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
