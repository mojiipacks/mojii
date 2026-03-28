"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    let rafId = 0;
    const animate = () => {
      dot.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
      ringX += (mouseX - ringX - 18) * 0.25;
      ringY += (mouseY - ringY - 18) * 0.25;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
