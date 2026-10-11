"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

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
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
