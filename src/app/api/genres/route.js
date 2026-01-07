import { tmdbFetch } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await tmdbFetch("/genre/movie/list");

  const map = {};
  data.genres.forEach((g) => {
    map[g.id] = g.name;
  });

  return NextResponse.json(map);
}
