"use client";

import { useEffect, useState } from "react";
import AdminRoute from "@/components/AdminRoute";
import Navbar from "@/components/Navbar";
import { Remove } from "@/icons/index";
import ModalWrapper from "@/components/ModalWrapper";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useAppSelector } from "@/store/hooks";

export default function AdminUsersPage() {
  const { user } = useAppSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        setUsers(await res.json());
        setOpen(false);
        setUserId(undefined);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const deleteUser = async () => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto">
        <Navbar />

        <div className="p-4">
          <div className="rounded-xl bg-surface p-6 shadow-lg flex-1">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-accent">All Users</h2>
              <span className="text-text-secondary text-sm">
                {users.length} {users.length === 1 ? "user" : "users"}
              </span>
            </div>
            {loading ? (
              <div className="rounded-xl bg-surface p-12 text-center">
                <p className="text-text-secondary">Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="rounded-xl bg-surface p-12 text-center">
                <p className="text-text-secondary text-lg mb-2">No user</p>
                <p className="text-text-secondary/70 text-sm">
                  Added users will be listed here
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {users.map((u) => (
                  <li
                    key={u._id}
                    className="flex items-center justify-between rounded-lg bg-background p-3"
                  >
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-sm text-text-secondary">{u.email}</p>
                    </div>
                    {user?._id !== u?._id && (
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          setOpen(true);
                          setUserId(u._id);
                        }}
                      >
                        <Remove />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <ModalWrapper isOpen={open} onClose={() => setOpen(false)}>
        <ConfirmationModal
          onClose={() => setOpen(false)}
          subHeading={
            "Are you sure you want to delete this user? This action cannot be undone."
          }
          functionCall={deleteUser}
        />
      </ModalWrapper>
    </AdminRoute>
  );
}
