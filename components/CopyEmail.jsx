"use client";

import { useRef, useState } from "react";
import { site } from "@/data/site";

// Copies the email address, shows a small "Copied!" box, and the avatar gives a thumbs up.
// It reads the address itself (not as a prop from the page), so the address
// never ends up in the page's HTML. See EmailLink.jsx.
export default function CopyEmail({ className = "" }) {
  const email = site.contact.email;
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  const copy = async () => {
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
  };

  return (
    <span className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={copy}
        className="rounded-full border border-ink/25 px-5 py-2.5 text-[15px] font-medium transition-colors hover:border-ink"
      >
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
