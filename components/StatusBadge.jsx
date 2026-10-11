import { site } from "@/data/site";

// "Open to internships" with a little blinking pixel light.
// Change or clear the text in data/site.js (status: "") to hide it.
export default function StatusBadge({ className = "", style }) {
  if (!site.status) return null;
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full border border-rule px-3.5 py-1.5 text-sm text-ink ${className}`}
      style={style}
    >
      <span className="status-light h-2 w-2 shrink-0" aria-hidden="true" />
      {site.status}
    </p>
  );
}
