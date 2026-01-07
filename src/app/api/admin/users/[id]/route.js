import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import User from "@/models/User";
import Favourite from "@/models/Favourite";

export async function DELETE(req, { params }) {
  const admin = await getAuthUser();
  if (!admin || admin.role !== "admin") {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id: userId } = await params;

  if (admin.id === userId) {
    return Response.json(
      { message: "Cannot delete yourself" },
      { status: 400 }
    );
  }

  await connectDB();

  await User.findByIdAndDelete(userId);
  await Favourite.deleteMany({ user: userId });

  return Response.json({ deleted: true });
}
