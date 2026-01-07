import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import User from "@/models/User";

export async function GET() {
  const admin = requireAdmin();
  if (!admin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const users = await User.find({}).select("-password");

  return NextResponse.json(users);
}
