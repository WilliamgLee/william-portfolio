"use client";

import { useRef, useState } from "react";
import { site } from "@/data/site";
import PixelIcon from "./PixelIcon";
import { lookAtMe, lookAway } from "./SocialLinks";

// Copies the email address, shows a small "Copied!" box, and the avatar gives a thumbs up.
// It reads the address from data/site.js. The visible mailto: link next to
// it is EmailLink.jsx.
export default function CopyEmail({ className = "" }) {
  const email = site.contact.email;
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  const copy = async (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch (e) {
      // Older browsers: copy from a hidden text box instead.
      const box = document.createElement("textarea");
      box.value = email;
      box.setAttribute("readonly", "");
      Object.assign(box.style, { position: "fixed", opacity: "0" });
      document.body.appendChild(box);
      box.select();
      try {
        ok = document.execCommand("copy");
      } catch (e2) {}
      box.remove();
    }
    if (!ok) return;

    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
    window.dispatchEvent(new CustomEvent("avatar:react", { detail: { reaction: "thumbs", line: "Got it. Talk soon!" } }));
    window.dispatchEvent(new CustomEvent("mail:send", { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 } }));
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={copy}
        onPointerEnter={(e) => e.pointerType === "mouse" && lookAtMe(e, "Copy it, I won't mind.")}
        onPointerLeave={lookAway}
        className="group inline-flex items-center gap-1.5 rounded-full border border-ink/25 py-2.5 pl-3.5 pr-4 text-[15px] font-medium transition-colors hover:border-ink"
      >
        <PixelIcon name="envelope" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
        {copied ? "Copied" : "Copy email"}
      </button>
      {copied && (
        <span className="bubble-pop pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2" aria-hidden="true">
          <span className="bubble-box block font-pixel text-[11px] text-ink">Copied!</span>
        </span>
      )}
      <span role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}
