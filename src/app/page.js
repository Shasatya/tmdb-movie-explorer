import ClientWrapper from "@/components/ClientWrapper";
import DropdownClient from "@/components/DropdownClient";
import Error from "@/components/Error";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import { sortingOptions, yearsOptions } from "@/constants";
import {
  ArrowLeft,
  ArrowRight,
  Genre,
  Refresh,
  Search,
  SortBy,
  Year,
} from "@/icons/index";
import { tmdbFetch } from "@/lib/tmdb";
import Link from "next/link";

function qsFrom(params) {
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      search.set(k, String(v));
    }
  }
  const s = search.toString();
  return s ? `?${s}` : "";
}

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const query = params.query ?? "";
  const genre = params.genre ?? "";
  const year = params.year ?? "";
  const sort_by = params.sort_by ?? "popularity.desc";
  const page = parseInt(params.page || "1", 10) || 1;

  const hasActiveFilters =
    query || genre || year || sort_by !== "popularity.desc";

  let genresList = [];
  try {
    const g = await tmdbFetch("/genre/movie/list");
    genresList = g.genres || [];
  } catch (err) {
    console.error("failed to load genres", err);
    return (
      <div className="container mx-auto min-h-screen bg-background flex items-center justify-center">
        <Error />
      </div>
    );
  }

  const tmdbParams = { page };
  let data;
  try {
    if (query) {
      data = await tmdbFetch("/search/movie", { query, page });
    } else {
      if (genre) tmdbParams.with_genres = genre;
      if (year) tmdbParams.primary_release_year = year;
      if (sort_by) tmdbParams.sort_by = sort_by;
      data = await tmdbFetch("/discover/movie", tmdbParams);
    }
  } catch (err) {
    console.error("tmdb fetch error", err);
    data = { results: [], total_pages: 1 };
    return (
      <div className="container mx-auto min-h-screen bg-background flex items-center justify-center">
        <Error />
      </div>
    );
  }

  const movies = data.results || [];
  const totalPages = Math.min(data.total_pages || 1, 500);

  const makePageLink = (p) => qsFrom({ query, genre, year, sort_by, page: p });

  return (
    <div className="container mx-auto">
      <Navbar />

      <div className="flex items-center justify-between p-4">
        <form
          method="get"
          className="flex items-center bg-surface border border-surface rounded-md focus-within:border-accent transition-colors"
        >
          <input
            name="query"
            type="text"
            placeholder="Search movies..."
            defaultValue={query}
            className="bg-transparent pl-2 border-0 outline-0 w-full text-sm text-text-primary placeholder:text-text-secondary"
          />
          <input type="hidden" name="genre" value={genre} />
          <input type="hidden" name="year" value={year} />
          <input type="hidden" name="sort_by" value={sort_by} />
          <button
            type="submit"
            className="bg-accent p-2 rounded-md cursor-pointer"
          >
            <Search className="text-text-secondary" />
          </button>
        </form>

        <aside className="flex items-center gap-2">
          {hasActiveFilters && (
            <Link
              href="/"
              className={`relative p-2 rounded-lg bg-surface cursor-pointer text-accent outline-0`}
              aria-label="Reset all filters"
            >
              <Refresh className="text-accent" />
            </Link>
          )}{" "}
          <ClientWrapper>
            <DropdownClient
              icon={<SortBy className="text-accent" />}
              key={sort_by ?? "none"}
              name="sort_by"
              initialValue={sort_by ?? null}
              options={sortingOptions}
              ariaLabel="Movie sort by filter"
            />
          </ClientWrapper>{" "}
          <ClientWrapper>
            <DropdownClient
              icon={<Genre className={"text-accent"} />}
              key={genre ?? "none"}
              name="genre"
              initialValue={genre ?? null}
              options={genresList.map((g) => ({
                value: String(g.id),
                label: g.name,
              }))}
              ariaLabel="Movie genre filter"
            />
          </ClientWrapper>
          <ClientWrapper>
            <DropdownClient
              icon={<Year className={"text-accent"} />}
              key={year ?? "none"}
              name="year"
              initialValue={year ?? null}
              options={yearsOptions}
              ariaLabel="Movie year filter"
            />
          </ClientWrapper>
        </aside>
      </div>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </main>

      <nav className="flex items-center gap-2 justify-end p-4">
        <a
          href={makePageLink(Math.max(1, page - 1))}
          className={`flex items-center justify-center w-10 h-10 rounded-lg bg-surface hover:bg-accent hover:text-white! ${
            page <= 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          aria-disabled={page <= 1}
        >
          <ArrowLeft className="text-current" />
        </a>

        {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
          const start = Math.max(1, Math.min(page - 2, totalPages - 4));
          const p = start + idx;
          if (p > totalPages) return null;
          return (
            <a
              key={p}
              href={makePageLink(p)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg bg-surface hover:bg-accent hover:text-white! ${
                p === page ? "bg-accent text-white" : "text-text-primary"
              }`}
            >
              {p}
            </a>
          );
        })}

        <a
          href={makePageLink(Math.min(totalPages, page + 1))}
          className={`flex items-center justify-center w-10 h-10 rounded-lg bg-surface hover:bg-accent hover:text-white! ${
            page >= totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
          aria-disabled={page >= totalPages}
        >
          <ArrowRight className="text-current" />
        </a>
      </nav>
    </div>
  );
}
