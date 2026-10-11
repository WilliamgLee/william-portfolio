"use client";

import { useEffect, useState } from "react";
import VoxelAvatar from "./VoxelAvatar";

// Time in Jakarta (WIB), wherever the visitor is.
function jakarta(options) {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hourCycle: "h23", ...options }).format(new Date());
}
export function jakartaClock() {
  return jakarta({ hour: "2-digit", minute: "2-digit" });
}
export function isNightInJakarta() {
  const hour = Number(jakarta({ hour: "2-digit" }));
  return hour >= 22 || hour < 7;
}

// "It's 00:21 in Jakarta." Live, updated every few seconds.
export function JakartaClock({ className = "", style }) {
  const [time, setTime] = useState(null);
  const [night, setNight] = useState(false);

  useEffect(() => {
    const tick = () => {
      setTime(jakartaClock());
      setNight(isNightInJakarta());
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={`text-muted ${className}`} style={style}>
      It’s <span className="font-pixel text-[13px] text-ink">{time ?? "--:--"}</span> in Jakarta right now.
      {night && " I’m probably asleep, so expect a reply in the morning."}
    </p>
  );
}

// The Contact page avatar: waves during the day, sleeps at night (Jakarta time).
export function ContactAvatar({ className = "" }) {
  // Decided once, in the browser. The markup is the same either way, so no hydration mismatch.
  const [night] = useState(() => typeof window !== "undefined" && isNightInJakarta());
  return (
    <figure className={className}>
      <VoxelAvatar
        interactive
        pose="wave"
        asleep={night}
        res={96}
        greeting={night ? "zZz... I'll reply in the morning." : "Say hi!"}
        label="William's avatar"
        className="w-full"
      />
    </figure>
  );
}
