"use client";

import { useEffect, useRef, useState } from "react";
import { playMail, playWhoosh } from "@/lib/sfx";

// A pixel mailbox next to the Contact avatar. When the visitor clicks or copies
// the email, a little envelope flies into it and the flag pops up.
//
// Anything can send mail: window.dispatchEvent(new CustomEvent("mail:send", { detail: { x, y } }))
// where x, y is the screen point the envelope starts from.

const BOX = [
  "................",
  "................",
  "....########....",
  "...#bbbbbbbb#...",
  "..#bbbbbbbbbb#..",
  "..#bbbbbbbbbb#..",
  "..#bkkkkkkkkb#..",
  "..#bbbbbbbbbb#..",
  "..#bbbbbbbbbb#..",
  "..############..",
  ".......pp.......",
  ".......pp.......",
  ".......pp.......",
  ".......pp.......",
  ".......pp.......",
  ".....gggggg.....",
];
const COLORS = { "#": "#1b1d20", b: "#4d6074", k: "#1b1d20", p: "#6b5240", g: "#9aa39b" };
const ENVELOPE = [
  "##########",
  "#ww....ww#",
  "#.ww..ww.#",
  "#...ww...#",
  "#........#",
  "##########",
];

function svgFromGrid(grid, colors) {
  const rects = [];
  grid.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (colors[c]) rects.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${colors[c]}"/>`);
    })
  );
  return rects.join("");
}
const ENVELOPE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" shape-rendering="crispEdges"><rect width="10" height="6" fill="#f1f0ec"/>${svgFromGrid(ENVELOPE, { "#": "#1b1d20", w: "#4d6074" })}</svg>`;

export default function Mailbox({ className = "" }) {
  const slotRef = useRef(null);
  const [flagUp, setFlagUp] = useState(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let flagTimer = 0;
    const receive = () => {
      setFlagUp(true);
      setBump((b) => b + 1);
      playMail();
      clearTimeout(flagTimer);
      flagTimer = setTimeout(() => setFlagUp(false), 3200);
    };
    const onSend = (e) => {
      const slot = slotRef.current;
      if (!slot) return;
      const to = slot.getBoundingClientRect();
      const from = e.detail || { x: to.left, y: to.top };
      if (reduce) return receive();

      playWhoosh();
      const env = document.createElement("div");
      env.setAttribute("aria-hidden", "true");
      env.innerHTML = ENVELOPE_SVG;
      const w = 30;
      Object.assign(env.style, { position: "fixed", left: "0", top: "0", width: `${w}px`, height: `${w * 0.6}px`, zIndex: "60", pointerEvents: "none" });
      env.firstChild.style.cssText = "width:100%;height:100%;display:block";
      document.body.appendChild(env);

      const x0 = from.x - w / 2, y0 = from.y - w * 0.3;
      const x1 = to.left + to.width / 2 - w / 2, y1 = to.top + to.height / 2 - w * 0.3;
      const lift = Math.min(220, 90 + Math.hypot(x1 - x0, y1 - y0) * 0.25);
      const frames = [];
      for (let i = 0; i <= 24; i++) {
        const p = i / 24, e2 = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const x = x0 + (x1 - x0) * e2, y = y0 + (y1 - y0) * e2 - lift * 4 * p * (1 - p);
        const scale = 1 - 0.45 * Math.max(0, p - 0.75) / 0.25;
        frames.push({ transform: `translate(${x}px, ${y}px) rotate(${Math.sin(p * Math.PI * 2) * 14}deg) scale(${scale})` });
      }
      env.animate(frames, { duration: 900, easing: "linear", fill: "forwards" }).finished.then(() => {
        env.remove();
        receive();
      });
    };
    window.addEventListener("mail:send", onSend);
    return () => {
      window.removeEventListener("mail:send", onSend);
      clearTimeout(flagTimer);
    };
  }, []);

  return (
    <div className={className || "relative"} aria-hidden="true">
      <svg
        key={bump}
        viewBox="0 0 18 16"
        shapeRendering="crispEdges"
        className={`block h-auto w-full ${bump ? "mailbox-bump" : ""}`}
        dangerouslySetInnerHTML={{ __html: svgFromGrid(BOX, COLORS) + flagSvg(flagUp) }}
      />
      {/* where the envelope aims: the dark slot */}
      <span ref={slotRef} className="absolute left-[17%] top-[37%] h-[8%] w-[55%]" />
    </div>
  );
}

// The red flag on the right side: down (lying flat) or up.
function flagSvg(up) {
  const c = "#d0574f";
  return up
    ? `<rect x="14" y="1" width="1" height="8" fill="#1b1d20"/><rect x="15" y="1" width="3" height="3" fill="${c}"/>`
    : `<rect x="14" y="5" width="1" height="4" fill="#1b1d20"/><rect x="15" y="5" width="3" height="1" fill="${c}"/>`;
}
