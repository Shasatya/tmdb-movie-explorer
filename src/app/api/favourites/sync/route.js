import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Favourite from "@/models/Favourite";

export async function POST(req) {
  try {
    const user = await getAuthUser();

    if (!user?._id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { movies } = body;

    if (!Array.isArray(movies) || movies.length === 0) {
      return Response.json({ synced: false, reason: "No movies" });
    }

    await connectDB();

    const bulkOps = movies.map((movie, index) => {
      return {
        updateOne: {
          filter: {
            user: user._id,
            movieId: movie.id,
          },
          update: {
            $setOnInsert: {
              user: user._id,
              movieId: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
            },
          },
          upsert: true,
        },
      };
    });

    const result = await Favourite.bulkWrite(bulkOps);

    return Response.json({ synced: true });
  } catch (error) {
    console.error("🔥 FAV SYNC ERROR:", error);

    return Response.json(
      {
        synced: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
