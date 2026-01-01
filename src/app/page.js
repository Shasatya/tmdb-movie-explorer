import { tmdbFetch } from "@/lib/tmdb";
// import Link from "next/link";

export default async function Home() {
  let genresList = [];
  try {
    const g = await tmdbFetch("/genre/movie/list");
    genresList = g.genres || [];
  } catch (err) {
    console.error("failed to load genres", err);
  }

  return <div className="bg-green-400">start</div>;
}
