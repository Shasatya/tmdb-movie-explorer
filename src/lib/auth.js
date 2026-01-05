import jwt from "jsonwebtoken";
import User from "@/models/User";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";

export const getAuthUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  await connectDB();

  const user = await User.findById(decoded.id).select("-password");

  return user;
};
