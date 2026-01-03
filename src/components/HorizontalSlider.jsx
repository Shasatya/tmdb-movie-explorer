"use client";

import { ArrowLeft, ArrowRight } from "@/icons/index";
import React, { useEffect, useRef, useState } from "react";

export default function HorizontalSlider({ children }) {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (!sliderRef.current) return;
      const { scrollWidth, clientWidth } = sliderRef.current;
      setShowArrows(scrollWidth > clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  const scrollAmount = () =>
    sliderRef.current ? sliderRef.current.clientWidth * 0.8 : 200;

  const slideLeft = () => {
    sliderRef.current.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  };

  const slideRight = () => {
    sliderRef.current.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  };

  const startDrag = (clientX) => {
    setIsDragging(true);
    setStartX(clientX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const moveDrag = (clientX) => {
    if (!isDragging) return;
    const x = clientX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full select-none">
      {showArrows && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-1 bg-accent shadow p-2 rounded-full cursor-pointer"
          onClick={slideLeft}
        >
          <ArrowLeft color={"#FFFFFF"} />
        </button>
      )}

      {showArrows && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-1 bg-accent shadow p-2 rounded-full cursor-pointer"
          onClick={slideRight}
        >
          <ArrowRight color={"#FFFFFF"} />
        </button>
      )}

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar hide_vertical_scrollbar"
        onMouseDown={(e) => startDrag(e.pageX)}
        onMouseMove={(e) => moveDrag(e.pageX)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {React.Children.map(children, (child) => (
          <div className="shrink-0">{child}</div>
        ))}
      </div>
    </div>
  );
}
