"use client";

import { useAppSelector } from "@/store/hooks";

export default function AdminRoute({ children }) {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="p-6 text-center text-text-secondary">Loading...</div>
    );
  }

  if (!user || user.role !== "admin") {
    return <div className="p-6 text-center text-red-500">Access Denied</div>;
  }

  return children;
}
