"use client";

import Image from "next/image";
import { useAppRouter } from "@/hooks/useAppRouter";
import { useAppSelector } from "@/store/hooks";

export default function MovieCard({ movie }) {
  const { goTo } = useAppRouter();

  const genreMap = useAppSelector((state) => state.genres.map);

  const poster = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}${movie.poster_path}`
    : "/no-image.png";

  const goToMovie = () => {
    goTo(`/movie/${movie.id}`);
  };

  return (
    <button
      className="bg-surface rounded-xl border border-surface overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-left group w-full h-full"
      onClick={goToMovie}
    >
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <Image
          src={poster ? poster : "/Brazil.webp"}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 50vw, 300px"
          style={{ objectFit: "cover" }}
          className="group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div className="absolute top-2 right-2 bg-success text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          ⭐ {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="px-3 py-3">
        <h3
          className="text-left text-lg font-semibold truncate text-text-primary group-hover:text-accent transition-colors"
          title={movie.title}
        >
          {movie.title}
        </h3>

        <div className="my-2 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">Release Date</p>
            <p className="text-sm font-medium text-text-primary">
              {movie.release_date || "TBA"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">Language</p>
            <p className="text-sm font-medium text-text-primary uppercase">
              {movie.original_language}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">Score</p>
            <p className="text-sm font-medium text-text-primary">
              {movie.vote_average.toFixed(1)}{" "}
              <span className="text-xs text-text-secondary">
                ({movie.vote_count})
              </span>
            </p>
          </div>
        </div>

        {movie.genre_ids.length > 0 && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {movie.genre_ids.slice(0, 3).map((g) => (
              <span
                key={g}
                className="bg-background text-text-secondary px-2 py-1 text-xs rounded-lg font-medium border border-surface"
              >
                {(genreMap && genreMap[g]) || "Unknown"}{" "}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
