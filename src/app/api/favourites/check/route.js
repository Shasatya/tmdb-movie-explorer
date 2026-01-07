import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import Favourite from "@/models/Favourite";

export async function GET(req) {
  const user = await getAuthUser();
  if (!user) return Response.json({ isFavourite: false });

  const { searchParams } = new URL(req.url);
  const movieId = Number(searchParams.get("movieId"));

  await connectDB();

  const exists = await Favourite.exists({
    user: user.id,
    movieId,
  });

  return Response.json({ isFavourite: !!exists });
}
