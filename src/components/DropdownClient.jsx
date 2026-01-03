"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DropDown from "./DropDown";

export default function DropdownClient({
  icon,
  name,
  options = [],
  initialValue = null,
  replaceHistory = true,
  ariaLabel = "Filter",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialValue);

  // Sync with URL changes
  useEffect(() => {
    const urlValue = searchParams.get(name);
    setValue(urlValue || null);
  }, [searchParams, name]);

  const onChange = (v) => {
    setValue(v);
    const params = new URLSearchParams(searchParams.toString());

    if (v === null || v === undefined || String(v).trim() === "") {
      params.delete(name);
    } else {
      params.set(name, String(v));
    }

    // Reset to page 1 when filters change
    if (name !== "page") {
      params.delete("page");
    }

    const qs = params.toString();
    const url = `${window.location.pathname}${qs ? "?" + qs : ""}`;

    if (replaceHistory) {
      router.replace(url);
    } else {
      router.push(url);
    }
  };

  return (
    <DropDown
      icon={icon}
      options={options}
      value={value}
      onChange={onChange}
      ariaLabel={ariaLabel}
    />
  );
}
