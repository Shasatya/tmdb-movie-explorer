"use client";

import { useRouter } from "next/navigation";

export function useAppRouter() {
  const router = useRouter();

  const goTo = (path) => {
    router.push(path);
  };

  const replaceWith = (path) => {
    router.replace(path);
  };

  const goBack = () => {
    router.back();
  };

  const refreshPage = () => {
    router.refresh();
  };

  return { goTo, replaceWith, goBack, refreshPage };
}
