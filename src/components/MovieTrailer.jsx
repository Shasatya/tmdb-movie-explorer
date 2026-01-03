"use client";

import { Cross } from "@/icons/index";
import { useState } from "react";

export default function MovieTrailer({ videoKey, title = "Trailer" }) {
  const [open, setOpen] = useState(false);
  const src = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded bg-[#FF0033] text-white shadow-sm cursor-pointer"
      >
        ▶ Watch Trailer
      </button>

      {open ? (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 cursor-pointer"
          >
            <Cross className="h-10 w-10 text-white" />
          </button>
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={src}
              title={`Trailer — ${title}`}
              allow="autoplay; fullscreen"
              className="w-full h-full"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
