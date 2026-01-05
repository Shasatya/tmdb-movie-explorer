"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { fetchMe } from "./slices/authSlice";

export default function AuthLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return null;
}
