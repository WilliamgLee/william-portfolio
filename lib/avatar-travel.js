// Makes the avatar fly from one page to the next.
//
// 1. Each page's avatar registers itself (registerTravelAvatar).
// 2. When an internal link is clicked, we remember where that avatar was.
// 3. When the next page's avatar mounts, it asks for that spot
//    (takePendingTravel) and plays flyAvatar(): a small temporary canvas that
//    arcs across the screen doing a front flip, then lands on the new avatar.
//
// Only one tiny canvas exists for under a second, so it stays light on phones.

import { avatarConfig } from "./avatar-config";
import { buildModel, getPose, renderScene } from "./voxel";

const MODEL = buildModel(avatarConfig);
const FLIGHT_MS = 850;

let current = null; // the avatar canvas on the current page
let pending = null; // { rect, at } saved when a link is clicked

export function registerTravelAvatar(canvas) {
  current = canvas;
  return () => {
    if (current === canvas) current = null;
  };
}

if (typeof document !== "undefined") {
  document.addEventListener(
    "click",
    (e) => {
      const link = e.target.closest?.("a[href]");
      if (!link || !current) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || link.target === "_blank") return;
      const url = new URL(link.href, location.href);
      const same = url.pathname + url.hash === location.pathname + location.hash;
      if (url.origin !== location.origin || same) return;
      pending = { rect: current.getBoundingClientRect(), at: performance.now() };
    },
    true
  );
}

export function takePendingTravel() {
  const p = pending;
  pending = null;
  if (!p || performance.now() - p.at > 2500) return null;
  return p.rect;
}

const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

// Flies a copy of the avatar from `from` (a DOMRect) onto `toCanvas`.
// The landing spot is read again on every frame, because the new page can
// still be moving while we fly (on phones the menu closes and the content
// slides up). Measuring it once made the avatar land in the wrong place and
// then jump to the right one.
export function flyAvatar(from, toCanvas) {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = toCanvas.width;
    canvas.height = toCanvas.height;
    canvas.className = "pixelated";
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      left: "0px",
      top: "0px",
      width: `${from.width}px`,
      height: `${from.height}px`,
      transformOrigin: "0 0",
      pointerEvents: "none",
      zIndex: "60",
      willChange: "transform",
    });
    document.body.appendChild(canvas);

    const first = toCanvas.getBoundingClientRect();
    const lift = Math.min(240, 110 + Math.hypot(first.left - from.left, first.top - from.top) * 0.18);

    const ctx = canvas.getContext("2d");
    const start = performance.now();
    const draw = (now) => {
      const p = Math.min(1, (now - start) / FLIGHT_MS);
      const e = ease(p);
      const to = toCanvas.isConnected ? toCanvas.getBoundingClientRect() : first;
      // Straight from A to B, lifted into an arc in the middle.
      const x = from.left + (to.left - from.left) * e;
      const y = from.top + (to.top - from.top) * e - lift * 4 * p * (1 - p);
      const scale = 1 + (to.width / from.width - 1) * e;
      canvas.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

      const pose = getPose("fly", now / 1000, { progress: p });
      const hat = document.documentElement.dataset.theme === "dark" ? "nightcap" : null;
      renderScene(ctx, MODEL, pose, { t: now / 1000, assembleStart: null, blink: 1, hat });

      if (p < 1) requestAnimationFrame(draw);
      else {
        canvas.remove();
        resolve();
      }
    };
    draw(start);
  });
}
