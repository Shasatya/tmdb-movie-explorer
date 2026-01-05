"use client";

import { useAppSelector } from "@/store/hooks";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p>{user?.name}</p>
    </div>
  );
}
