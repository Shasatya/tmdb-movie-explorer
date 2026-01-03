import Image from "next/image";
import { tmdbFetch } from "../../../lib/tmdb";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import HorizontalSlider from "@/components/HorizontalSlider";
import MovieTrailer from "@/components/MovieTrailer";
import CastCard from "@/components/CastCard";
import Error from "@/components/Error";

export default async function MoviePage({ params }) {
  const { id } = await params;

  let movie;
  try {
    movie = await tmdbFetch(`/movie/${id}`, {
      append_to_response: "videos,credits,recommendations,images",
    });
  } catch (err) {
    console.error("Failed to fetch movie:", err);
    return (
      <div className="container mx-auto min-h-screen bg-background flex items-center justify-center">
        <Error />
      </div>
    );
  }

  const poster = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}${movie.poster_path}`
    : "/no-image.png";

  const backdrop = movie.backdrop_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE.replace(
        "/w500",
        "/original"
      )}${movie.backdrop_path}`
    : null;

  const videos = movie.videos?.results || [];

  const ytTrailer =
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    videos.find((v) => v.site === "YouTube" && v.type === "Teaser") ||
    videos.find((v) => v.site === "YouTube");

  const recommendations = (movie.recommendations?.results || []).slice(0, 8);

  const genres = movie.genres || [];

  return (
    <>
      <div className="container mx-auto min-h-screen bg-background">
        <Navbar />

        <div
          className="relative w-full bg-surface text-text-primary rounded-b overflow-hidden mt-4"
          style={{ minHeight: 260 }}
        >
          {backdrop ? (
            <div className="absolute inset-0 -z-10 opacity-40">
              <Image
                src={backdrop}
                alt={movie.title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgb(var(--color-background)), transparent, transparent)",
                }}
              />
            </div>
          ) : null}

          <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="w-48 md:w-64 shrink-0 rounded-lg overflow-hidden shadow-2xl ring-2 ring-surface">
              <Image
                src={poster}
                alt={movie.title}
                width={400}
                height={600}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>

            <div className="flex-1 text-text-primary">
              <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-sm text-text-secondary mt-2 italic">
                  {movie.tagline}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-surface">
                  {movie.release_date}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-surface">
                  {movie.runtime ? `${movie.runtime} min` : "—"}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-success text-white">
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
                </span>

                <div className="flex gap-2 ml-2">
                  {genres.map((g) => (
                    <span
                      key={g.id}
                      className="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-text-secondary leading-relaxed max-w-prose">
                {movie.overview || "No overview available."}
              </p>

              <div className="mt-6 flex items-center gap-3">
                {ytTrailer ? (
                  <MovieTrailer videoKey={ytTrailer.key} title={movie.title} />
                ) : null}

                <div>
                  Add to Favorites
                  {/* <FavouriteButton movie={movie} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Cast</h2>

          <HorizontalSlider>
            {(movie.credits?.cast?.slice(0, 12) || []).map((c) => {
              return (
                <CastCard
                  key={c.cast_id || c.credit_id}
                  cast={c}
                  img={
                    c.profile_path
                      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE}${c.profile_path}`
                      : "/no-poster.avif"
                  }
                />
              );
            })}
          </HorizontalSlider>
        </section>

        {movie.credits?.crew?.length ? (
          <section className="container mx-auto px-4 py-6">
            <h3 className="text-xl font-bold mb-4 text-text-primary">
              Key Crew
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
              {movie.credits.crew.slice(0, 8).map((c) => (
                <div
                  key={c.credit_id}
                  className="px-4 py-3 border border-surface rounded-lg bg-surface hover:bg-accent/10 transition-colors"
                >
                  <div className="text-sm font-semibold text-text-primary">
                    {c.name}
                  </div>
                  <div className="text-xs text-text-secondary mt-1">
                    {c.job}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {recommendations.length ? (
          <section className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">
              You May Also Like
            </h2>
            <HorizontalSlider>
              {recommendations.map((r) => (
                <div key={r.id} className="w-80 h-full">
                  <MovieCard movie={r} />
                </div>
              ))}
            </HorizontalSlider>
          </section>
        ) : null}
      </div>
    </>
  );
}
