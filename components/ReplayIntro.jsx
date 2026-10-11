"use client";

import { usePathname, useRouter } from "next/navigation";

// Footer button that plays the intro again (it normally plays once per visit).
export default function ReplayIntro({ className = "" }) {
  const pathname = usePathname();
  const router = useRouter();

  const replay = () => {
    try {
      sessionStorage.removeItem("introSeen");
    } catch (e) {}
    delete document.documentElement.dataset.intro; // the intro shows unless this says "skip"
    window.scrollTo(0, 0);
    if (pathname === "/") window.dispatchEvent(new Event("intro:replay"));
    else router.push("/");
  };

  return (
    <button type="button" onClick={replay} className={`transition-colors hover:text-ink ${className}`}>
      Replay intro
    </button>
  );
}
