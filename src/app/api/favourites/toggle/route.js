import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import Favourite from "@/models/Favourite";

export async function POST(req) {
  const user = await getAuthUser();
  if (!user) return Response.json({ message: "Unauthorized" }, { status: 401 });

  const { movie } = await req.json();
  await connectDB();

  const exists = await Favourite.findOne({
    user: user.id,
    movieId: movie.id,
  });

  if (exists) {
    await Favourite.deleteOne({ _id: exists._id });
    return Response.json({ removed: true });
  }

//   console.log("movie ", movie);

  await Favourite.create({
    user: user.id,
    movieId: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
  });

  return Response.json({ added: true });
}
