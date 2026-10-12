"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { lookAtMe, lookAway } from "./SocialLinks";

// The email link is added by the browser after the page loads, so the address
// isn't in the page's HTML, where simple spam bots look for addresses.
// Until then, an empty space of the same height keeps the layout steady.
export default function EmailLink({ className = "" }) {
  const [email, setEmail] = useState(null);
  useEffect(() => setEmail(site.contact.email), []);

  if (!email) {
    return (
      <span className={className} aria-hidden="true">
        &nbsp;
      </span>
    );
  }
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
