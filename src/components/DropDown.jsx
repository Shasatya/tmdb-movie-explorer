"use client";

import React, { useEffect, useRef, useState } from "react";

export default function DropDown({
  icon,
  options = [],
  value = null,
  onChange = () => {},
  placement = "bottom-right",
  ariaLabel = "Filter",
}) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const ref = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, []);

  useEffect(() => {
    if (open && highlightedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[highlightedIndex];
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, open, listRef]);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      setHighlightedIndex(-1);
    } else {
      setOpen(true);
    }
  };

  const onKeyDown = (e) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    if (e.key === "Escape") {
      setOpen(false);
      setHighlightedIndex(-1);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (highlightedIndex >= 0) selectOption(options[highlightedIndex]);
    }
  };

  const selectOption = (opt) => {
    onChange(opt.value);
    setOpen(false);
    setHighlightedIndex(-1);
  };

  return (
    <div className="relative inline-block" ref={ref} title={ariaLabel}>
      <button
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleOpen}
        onKeyDown={onKeyDown}
        className={`relative p-2 rounded-lg bg-surface cursor-pointer text-accent outline-0 ${
          open ? "border border-accent" : "border border-surface"
        }`}
      >
        <span className="w-5 h-5">
          {icon || (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5h18M8 12h8M10 19h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        {value !== null && value !== undefined && (
          <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-2 h-2 text-[10px] font-bold rounded-full bg-amber-500 text-white"></span>
        )}
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          tabIndex={0}
          className={`absolute mt-2 min-w-40 max-h-56 overflow-auto rounded-lg bg-surface shadow-lg dropdown-scroll ring-1 ring-black ring-opacity-5 z-50 ${
            placement === "bottom-right" ? "right-0" : "left-0"
          }`}
          onKeyDown={onKeyDown}
        >
          <ul ref={listRef} className="divide-y divide-gray-100">
            {options.map((opt, idx) => {
              const selected = opt.value === value;
              const highlighted = idx === highlightedIndex;

              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => selectOption(opt)}
                  className={`cursor-pointer px-3 py-2 flex items-center justify-between text-xs hide_vertical_scrollbar ${
                    highlighted ? "bg-accent" : "bg-surface"
                  }`}
                >
                  {opt.label}
                  <span className="flex items-center gap-2">
                    {selected && (
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                    )}
                  </span>
                </li>
              );
            })}

            <li className="px-3 py-2">
              <button
                type="button"
                onClick={() =>
                  selectOption({ value: null, label: "Clear filter" })
                }
                className="w-full text-left text-sm text-gray-600 cursor-pointer"
              >
                Clear filter
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
