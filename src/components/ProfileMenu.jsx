"use client";

import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import AuthModal from "./AuthModal";
import { useAppRouter } from "@/hooks/useAppRouter";

export default function ProfileMenu() {
  const { goTo } = useAppRouter();
  const user = null;

  const [open, setOpen] = useState(false);
  const userName = user?.name?.slice(0, 1).toUpperCase();

  return (
    <>
      {user ? (
        <button
          onClick={() => goTo("/profile")}
          className="h-10 w-10 rounded-full cursor-pointer text-accent font-semibold text-xl border-accent border-2"
        >
          {userName}
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded-md border-accent border px-3 py-1 text-accent hover:bg-accent hover:text-on-accent transition-all duration-200 hover:shadow-lg"
        >
          LOGIN
        </button>
      )}

      <ModalWrapper isOpen={open} onClose={() => setOpen(false)}>
        <AuthModal onClose={() => setOpen(false)} />
      </ModalWrapper>
    </>
  );
}
