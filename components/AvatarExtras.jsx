"use client";

import { useEffect } from "react";
import { BEAT, createIntroMusic } from "@/lib/intro-music";

// Little extras that make the avatar react to what the visitor does:
// copying text, and typing secret words anywhere on the page.
// (The avatar itself listens for the "avatar:react" event; see VoxelAvatar.jsx.)

function react(reaction, line, extra = {}) {
  window.dispatchEvent(new CustomEvent("avatar:react", { detail: { reaction, line, ...extra } }));
}

// Typing "dance" plays a short groove and he dances to it (12 seconds).
let danceUntil = 0;
function dance() {
  const now = performance.now() / 1000;
  if (now < danceUntil) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    react("greet", "Dancing on the inside.");
    return;
  }
  const beats = 16;
  danceUntil = now + beats * BEAT + 1;
  createIntroMusic({ handoverBeat: beats, mode: "dance" })?.start();
  react("dance", "Let's go!", { startAt: now + 0.1 });
}

// Secret words. Checked longest first, so "william" isn't cut short by "hi".
const WORDS = [
  { word: "william", run: () => react("hop", "That's me!") },
  { word: "hello", run: () => react("greet", "Hi there!") },
  { word: "dance", run: dance },
  { word: "joget", run: dance },
  { word: "sleep", run: () => react("sleep") },
  { word: "tidur", run: () => react("sleep") },
  { word: "halo", run: () => react("greet", "Halo juga!") },
  { word: "hi", run: () => react("greet", "Hi there!") },
];

export default function AvatarExtras() {
  useEffect(() => {
    let lastCopy = 0;
    let typed = "";
    let lastKey = 0;

    // Copying text from the page: "Copying my homework?"
    const onCopy = () => {
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (!String(window.getSelection() || "").trim()) return;
      const now = performance.now();
      if (now - lastCopy < 6000) return; // not every single time
      lastCopy = now;
      react("copy");
    };

    // Typing letters anywhere (not in a form field) builds up a word.
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
      if (document.querySelector(".intro")) return; // the intro is playing; keys belong to it
      if (e.target.closest?.("input, textarea, select, [contenteditable='true']")) return;
      const now = performance.now();
      if (now - lastKey > 1500) typed = ""; // a pause starts a new word
      lastKey = now;
      typed = (typed + e.key.toLowerCase()).slice(-12);
      const hit = WORDS.find((w) => typed.endsWith(w.word));
      if (hit) {
        typed = "";
        hit.run();
      }
    };

    document.addEventListener("copy", onCopy);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("copy", onCopy);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
