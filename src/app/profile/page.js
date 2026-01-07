"use client";

import ConfirmationModal from "@/components/ConfirmationModal";
import ModalWrapper from "@/components/ModalWrapper";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ThemeSelector } from "@/components/ThemeSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAppRouter } from "@/hooks/useAppRouter";
import { Remove } from "@/icons/index";
import { useAppDispatch } from "@/store/hooks";
import { useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { goTo } = useAppRouter();

  const [favourites, setFavourites] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movieId, setMovieId] = useState();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await fetch("/api/favourites");
        setLoading(true);
        if (res.ok) {
          setFavourites(await res.json());
          setMovieId(undefined);
        }
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const removeFromFavourites = async () => {
    try {
      await fetch("/api/favourites/toggle", {
        method: "POST",
        body: JSON.stringify({
          movie: { id: movieId },
        }),
      });
      setFavourites((prev) => prev.filter((m) => m.movieId !== movieId));
    } catch (error) {
      console.error(error);
    }
  };

  const getPoster = (movie) => {
    return movie.poster_path
      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}${movie.poster_path}`
      : "/no-image.png";
  };

  const isAdmin = user?.role === "admin";

  return (
    <ProtectedRoute>
      <div className="mx-auto container bg-background">
        <Navbar />

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="rounded-xl bg-surface p-6 shadow-lg flex-1">
              <h2 className="text-xl font-semibold mb-3 text-accent">
                Account Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-text-secondary/20">
                  <span className="text-text-secondary font-medium">Name</span>
                  <span className="text-text-primary">{user?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-text-secondary/20">
                  <span className="text-text-secondary font-medium">Email</span>
                  <span className="text-text-primary">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-secondary font-medium">Role</span>
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium uppercase">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-surface p-6 shadow-lg flex-1">
              <h2 className="text-xl font-semibold mb-3 text-accent">
                Appearance Settings
              </h2>
              <div className="space-y-5">
                <div>
                  <p className="text-text-secondary font-medium mb-3">Theme</p>
                  <ThemeToggle />
                </div>

                <div>
                  <p className="text-text-secondary font-medium mb-3">Color</p>
                  <ThemeSelector />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-6 shadow-lg flex-1">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-accent">
                Favourite Movies
              </h2>
              <span className="text-text-secondary text-sm">
                {favourites.length}{" "}
                {favourites.length === 1 ? "movie" : "movies"}
              </span>
            </div>

            {loading ? (
              <div className="rounded-xl bg-surface p-12 text-center">
                <p className="text-text-secondary">Loading favourites...</p>
              </div>
            ) : favourites.length === 0 ? (
              <div className="rounded-xl bg-surface p-12 text-center">
                <p className="text-text-secondary text-lg mb-2">
                  No favourite movies yet
                </p>
                <p className="text-text-secondary/70 text-sm">
                  Start adding movies to your favourites to see them here
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {favourites.map((f) => (
                  <li
                    key={f.movieId}
                    className="flex items-center justify-between rounded-lg bg-background p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative h-16 w-16 bg-surface-dark shrink-0">
                        <Image
                          src={getPoster(f)}
                          alt={f.title || "Movie Poster"}
                          fill
                          className="object-cover rounded"
                          sizes="56px"
                        />
                      </div>

                      <button
                        onClick={() => goTo("/movie/" + f.movieId)}
                        className="font-medium shrink-0 cursor-pointer"
                      >
                        {f.title}
                      </button>
                    </div>
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setOpen(true);
                        setMovieId(f.movieId);
                      }}
                    >
                      <Remove />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="flex gap-4 justify-end">
            {isAdmin && (
              <button
                onClick={() => goTo("/users")}
                className="cursor-pointer rounded-md border-accent border px-3 py-1 text-accent hover:bg-accent hover:text-on-accent transition-all duration-200 hover:shadow-lg"
              >
                All Users
              </button>
            )}
            <button
              onClick={() => dispatch(logout())}
              className="cursor-pointer rounded-md border font-normal px-3 py-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 hover:shadow-lg"
            >
              Logout
            </button>
          </aside>
        </div>
      </div>

      <ModalWrapper isOpen={open} onClose={() => setOpen(false)}>
        <ConfirmationModal
          onClose={() => setOpen(false)}
          subHeading={
            "Are you sure you want to remove this movie from your favourites? You can add it back anytime."
          }
          functionCall={removeFromFavourites}
        />
      </ModalWrapper>
    </ProtectedRoute>
  );
}
