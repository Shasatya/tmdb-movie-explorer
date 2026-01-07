import { getAuthUser } from "@/lib/auth";

export const requireAdmin = async () => {
  const user = await getAuthUser();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
};
