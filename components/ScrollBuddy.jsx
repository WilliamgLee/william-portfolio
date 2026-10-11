"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { avatarConfig } from "@/lib/avatar-config";
import { buildModel, getPose, renderScene } from "@/lib/voxel";

const MODEL = buildModel(avatarConfig);
const RES = 32; // the sprite is tiny: 32 pixels tall inside, shown at 48px
const SHOW_AFTER = 140; // px scrolled before he appears (the nav is gone by then)

// A tiny avatar that walks along a progress bar at the top of the screen as you
// scroll a long page. He only moves while you scroll, faces the way you're
// going, and grins when you reach the bottom. Draws nothing while idle.
export default function ScrollBuddy() {
  const pathname = usePathname();
  const wrapRef = useRef(null);
  const barRef = useRef(null);
  const spriteRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = wrapRef.current;
    const ctx = canvasRef.current.getContext("2d");
    const state = { walkPhase: 0, walkAmp: 0, facing: 1.2, walkFace: "smile" };
    let facingTarget = 1.2;
    let lastY = window.scrollY;
    let lastMove = -1;
    let frame = 0;
    let shown = false;

    const draw = () => {
      const t = performance.now() / 1000;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      // Walk while the page moves; stride length follows scroll speed.
      const dy = y - lastY;
      lastY = y;
      if (Math.abs(dy) > 0.5) {
        lastMove = t;
        facingTarget = dy > 0 ? 1.2 : -1.2;
        state.walkPhase += Math.min(0.55, Math.abs(dy) * 0.05);
      }
      const moving = t - lastMove < 0.15;
      state.walkAmp += ((moving ? 1 : 0) - state.walkAmp) * 0.2;
      state.facing += (facingTarget - state.facing) * 0.3;
      state.walkFace = progress > 0.985 ? "happy" : "smile";

      const hat = document.documentElement.dataset.theme === "dark" ? "nightcap" : null;
      renderScene(ctx, MODEL, getPose("walk", t, state), { t, assembleStart: null, blink: 1, hat });

      const room = wrap.clientWidth - spriteRef.current.offsetWidth;
      spriteRef.current.style.transform = `translateX(${progress * room}px)`;
      barRef.current.style.transform = `scaleX(${progress})`;

      // Only on pages long enough to need it, and not while the nav is on screen.
      const visible = max > window.innerHeight * 0.3 && y > SHOW_AFTER;
      if (visible !== shown) {
        shown = visible;
        wrap.style.opacity = visible ? "1" : "0";
      }

      const settling = moving || state.walkAmp > 0.02 || Math.abs(facingTarget - state.facing) > 0.02;
      frame = settling ? requestAnimationFrame(draw) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    wake();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, [pathname]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[50px] opacity-0 transition-opacity duration-300"
    >
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-rule">
        <div ref={barRef} className="h-full origin-left bg-slate" style={{ transform: "scaleX(0)" }} />
      </div>
      <div ref={spriteRef} className="absolute -bottom-[3px] left-0 w-[43px]">
        <canvas ref={canvasRef} width={Math.round(RES * 0.9)} height={RES} className="pixelated block h-auto w-full" />
      </div>
    </div>
  );
}
