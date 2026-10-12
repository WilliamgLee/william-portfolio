"use client";

import PixelIcon from "./PixelIcon";
import { site } from "@/data/site";

// The social buttons on the Contact page. Hovering (or focusing) one makes the
// avatar look at it and say the line from data/site.js.
export function lookAtMe(e, line) {
  const r = e.currentTarget.getBoundingClientRect();
  window.dispatchEvent(new CustomEvent("avatar:look", { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2, line } }));
}
export function lookAway() {
  window.dispatchEvent(new CustomEvent("avatar:look", { detail: null }));
}

export default function SocialLinks() {
  return site.socials.map((s) => (
    <li key={s.label}>
      <a
        href={s.url}
        target="_blank"
        rel="noreferrer"
        onPointerEnter={(e) => e.pointerType === "mouse" && lookAtMe(e, s.line)}
        onPointerLeave={lookAway}
        onFocus={(e) => lookAtMe(e, s.line)}
        onBlur={lookAway}
        className="group inline-flex items-center gap-1.5 rounded-full border border-ink/25 py-2.5 pl-3.5 pr-4 text-[15px] font-medium transition-colors hover:border-ink"
      >
        <PixelIcon name={s.icon} className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
        {s.label}
      </a>
    </li>
  ));
}
