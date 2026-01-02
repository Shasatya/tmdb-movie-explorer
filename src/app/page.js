import { ThemeSelector } from "@/components/ThemeSelector";
import { ThemeToggle } from "@/components/ThemeToggle";
import { tmdbFetch } from "@/lib/tmdb";

export default async function Home() {
  let genresList = [];
  try {
    const g = await tmdbFetch("/genre/movie/list");
    genresList = g.genres || [];
  } catch (err) {
    console.error("failed to load genres", err);
  }

  return (
    <div>
      <ThemeSelector />
      <ThemeToggle />
    </div>
  );
}
