"use client";

import { useEffect, useState } from "react";

// A pixel-art speech bubble that types its text out, shown above the avatar.
// Purely decorative chatter, so it's hidden from screen readers.
export default function SpeechBubble({ text }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    setCount(0);
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) clearInterval(id);
        return Math.min(text.length, c + 1);
      });
    }, 32);
    return () => clearInterval(id);
  }, [text]);

  return (
    <div
      className="bubble-pop pointer-events-none absolute bottom-[94%] left-1/2 z-10"
      aria-hidden="true"
    >
      <div className="relative">
        <p className="bubble-box font-pixel text-[11px] leading-[1.35] text-ink md:text-[12px]">
          {text.slice(0, count)}
          {/* the rest is laid out invisibly so the bubble doesn't grow while typing */}
          <span className="invisible">{text.slice(count)}</span>
        </p>
        {/* Pixel tail: opens the bottom border and steps down to a point */}
        <svg
          className="absolute left-1/2 top-[calc(100%-2px)] -ml-[5px]"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          shapeRendering="crispEdges"
        >
          <rect x="2" y="0" width="6" height="2" fill="var(--bubble)" />
          <rect x="0" y="0" width="2" height="2" fill="var(--ink)" />
          <rect x="8" y="0" width="2" height="2" fill="var(--ink)" />
          <rect x="2" y="2" width="2" height="2" fill="var(--ink)" />
          <rect x="4" y="2" width="2" height="2" fill="var(--bubble)" />
          <rect x="6" y="2" width="2" height="2" fill="var(--ink)" />
          <rect x="4" y="4" width="2" height="2" fill="var(--ink)" />
        </svg>
      </div>
    </div>
  );
}
