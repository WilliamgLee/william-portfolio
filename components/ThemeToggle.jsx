"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      // storage blocked: the choice just won't be remembered
    }
    setTheme(next);
    // The avatar reacts: a yawn when the lights go out, hands over his eyes when they come back.
    window.dispatchEvent(new CustomEvent("avatar:react", { detail: { reaction: next === "dark" ? "yawn" : "squint" } }));
  };

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-slate-soft"
    >
      {/* 8×8 pixel icons, to match the avatar */}
      <svg viewBox="0 0 8 8" width="16" height="16" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
        {dark ? (
          <path d="M3 0h2v1H3zM3 7h2v1H3zM0 3h1v2H0zM7 3h1v2H7zM1 1h1v1H1zM6 1h1v1H6zM1 6h1v1H1zM6 6h1v1H6zM3 2h2v1h1v2H5v1H3V5H2V3h1z" />
        ) : (
          <path d="M2 0h4v1H3v1H2v4h1v1h3v1H2V7H1V6H0V2h1V1h1zM6 5h1v1H6z" />
        )}
      </svg>
    </button>
  );
}
