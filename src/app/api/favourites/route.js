import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import Favourite from "@/models/Favourite";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const favs = await Favourite.find({ user: user.id });

  return Response.json(favs);
}
