"use client";

import { site } from "@/data/site";
import { lookAtMe, lookAway } from "./SocialLinks";

// The email address as a visible mailto: link. It's in the page's HTML from
// the start, so it shows up even before JavaScript loads and search engines
// and screen readers can read it. (This used to be added only after load, to
// hide it from spam bots; a visible address was judged more useful.)
export default function EmailLink({ className = "" }) {
  const email = site.contact.email;
  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onPointerEnter={(e) => e.pointerType === "mouse" && lookAtMe(e, "Write me something!")}
      onPointerLeave={lookAway}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        window.dispatchEvent(new CustomEvent("mail:send", { detail: { x: r.left + Math.min(r.width / 2, 120), y: r.top + r.height / 2 } }));
        window.dispatchEvent(new CustomEvent("avatar:react", { detail: { reaction: "thumbs", line: "Can't wait to read it!" } }));
      }}
    >
      {email}
    </a>
  );
}
