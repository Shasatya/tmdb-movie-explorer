"use client";

import { useAppRouter } from "@/hooks/useAppRouter";
import Image from "next/image";

const Error = ({ message = "Please select an option." }) => {
  const { goBack } = useAppRouter();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      <div className="relative h-50 w-50">
        <Image
          src="/error.png"
          alt="Error"
          fill
          className="object-contain"
          priority
        />
      </div>

      <p className="font-bold text-xl mt-[-20]">Something went wrong!</p>
      <p className="text-xs mb-4">{message}</p>

      <div className="flex w-full max-w-65 items-center gap-2">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex-1 rounded-md bg-accent px-3 py-1.5 text-sm text-white cursor-pointer"
        >
          Retry
        </button>

        <button
          type="button"
          onClick={goBack}
          className="flex-1 rounded-md bg-surface px-3 py-1.5 text-sm text-surface shadow cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
