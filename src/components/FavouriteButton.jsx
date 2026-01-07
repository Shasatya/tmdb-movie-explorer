"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  getGuestFavourites,
  toggleGuestFavourite,
} from "@/utils/guestFavourites";

export default function FavouriteButton({ movie }) {
  // console.log("fasnkjglkdg ", movie)
  const { user } = useAppSelector((state) => state.auth);

  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      const guestFavs = getGuestFavourites();
      setIsFav(guestFavs.includes(movie.id));
    } else {
    }
  }, [user, movie.id]);

  useEffect(() => {
    const init = async () => {
      if (!user) {
        setIsFav(getGuestFavourites().includes(movie.id));
        return;
      }

      const res = await fetch(`/api/favourites/check?movieId=${movie.id}`);
      const data = await res.json();
      setIsFav(data.isFavourite);
    };

    init();
  }, [user, movie.id]);

  const handleToggle = async () => {
    if (loading) return;

    if (!user) {
      toggleGuestFavourite(movie);
      //   toggleGuestFavourite(movie.id);
      setIsFav((prev) => !prev);
      return;
    }

    try {
      setLoading(true);
      setIsFav((prev) => !prev);

      const res = await fetch("/api/favourites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie }),
      });

      if (!res.ok) throw new Error("Failed");
    } catch (err) {
      setIsFav((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="group cursor-pointer rounded-md border border-surface border-accent p-2 transition hover:bg-accent/10 disabled:opacity-50"
      aria-label="Toggle favourite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`h-5 w-5 transition-all duration-200 ${
          isFav
            ? "fill-accent stroke-accent scale-110"
            : "fill-transparent stroke-accent"
        }`}
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s-7-4.35-7-10a4 4 0 018-1.65A4 4 0 0120 11c0 5.65-8 10-8 10z"
        />
      </svg>
    </button>
  );
}
